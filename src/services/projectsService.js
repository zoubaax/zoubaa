import { supabase } from '../lib/supabase'
import { uploadImage, deleteImage, getImageUrl, STORAGE_BUCKETS } from '../lib/storage'

/**
 * Get all projects with their technologies
 * @returns {Promise<{data: Array, error: Error|null}>}
 */
export async function getProjects() {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        projects_technologies (
          technology:technologies (*)
        )
      `)
      .order('created_at', { ascending: false })

    if (error) throw error

    // Transform data to include technologies array and image URLs
    const projectsWithUrls = data.map((project) => {
      const technologies = (project.projects_technologies || []).map(
        (pt) => {
          const tech = pt.technology
          return {
            ...tech,
            image_url: tech?.image_path
              ? getImageUrl(STORAGE_BUCKETS.TECHNOLOGIES, tech.image_path)
              : null,
          }
        }
      )

      const galleryUrls = Array.isArray(project.gallery_paths)
        ? project.gallery_paths.map((path) =>
            getImageUrl(STORAGE_BUCKETS.PROJECTS, path)
          )
        : []

      return {
        ...project,
        technologies: technologies,
        technologies_names: technologies.map((t) => t.name),
        image_url: project.image_path
          ? getImageUrl(STORAGE_BUCKETS.PROJECTS, project.image_path)
          : null,
        gallery_urls: galleryUrls,
        // Remove the junction table data from response
        projects_technologies: undefined,
      }
    })

    return { data: projectsWithUrls, error: null }
  } catch (error) {
    console.error('Error fetching projects:', error)
    return { data: null, error }
  }
}

/**
 * Get a single project by ID with technologies
 * @param {string} id - Project ID
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function getProjectById(id) {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        projects_technologies (
          technology:technologies (*)
        )
      `)
      .eq('id', id)
      .single()

    if (error) throw error

    const technologies = (data.projects_technologies || []).map(
      (pt) => {
        const tech = pt.technology
        return {
          ...tech,
          image_url: tech?.image_path
            ? getImageUrl(STORAGE_BUCKETS.TECHNOLOGIES, tech.image_path)
            : null,
        }
      }
    )

    const galleryUrls = Array.isArray(data.gallery_paths)
      ? data.gallery_paths.map((path) =>
          getImageUrl(STORAGE_BUCKETS.PROJECTS, path)
        )
      : []

    const projectWithUrl = {
      ...data,
      technologies: technologies,
      technologies_names: technologies.map((t) => t.name),
      image_url: data.image_path
        ? getImageUrl(STORAGE_BUCKETS.PROJECTS, data.image_path)
        : null,
      gallery_urls: galleryUrls,
      projects_technologies: undefined,
    }

    return { data: projectWithUrl, error: null }
  } catch (error) {
    console.error('Error fetching project:', error)
    return { data: null, error }
  }
}

/**
 * Create a new project
 * @param {Object} projectData - Project data (includes technologyIds array)
 * @param {File|null} imageFile - Optional image file to upload
 * @param {File[]|null} galleryFiles - Optional additional images for gallery
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function createProject(projectData, imageFile = null, galleryFiles = []) {
  try {
    let imagePath = null
    let galleryPaths = []

    // Upload image if provided
    if (imageFile) {
      const uploadResult = await uploadImage(
        imageFile,
        STORAGE_BUCKETS.PROJECTS,
        'images'
      )
      if (uploadResult.error) {
        throw uploadResult.error
      }
      imagePath = uploadResult.path
    }

    // Upload gallery images if provided
    if (Array.isArray(galleryFiles) && galleryFiles.length > 0) {
      for (const file of galleryFiles) {
        if (!file) continue
        const uploadResult = await uploadImage(
          file,
          STORAGE_BUCKETS.PROJECTS,
          'gallery'
        )
        if (uploadResult.error) {
          // If any gallery upload fails, clean up previous uploads
          if (imagePath) {
            await deleteImage(STORAGE_BUCKETS.PROJECTS, imagePath)
          }
          for (const path of galleryPaths) {
            await deleteImage(STORAGE_BUCKETS.PROJECTS, path)
          }
          throw uploadResult.error
        }
        galleryPaths.push(uploadResult.path)
      }
    }

    // Insert project into database
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .insert([
        {
          title: projectData.title,
          description: projectData.description,
          tagline: projectData.tagline || null,
          features: Array.isArray(projectData.features) && projectData.features.length > 0
            ? projectData.features
            : null,
          duration: projectData.duration || null,
          team_size: projectData.team_size || null,
          role: projectData.role || null,
          challenges: projectData.challenges || null,
          solutions: projectData.solutions || null,
          image_path: imagePath,
          category: projectData.category,
          github_url: projectData.github_url || null,
          live_url: projectData.live_url || null,
          gallery_paths: galleryPaths.length > 0 ? galleryPaths : null,
        },
      ])
      .select()
      .single()

    if (projectError) {
      // If database insert fails, delete uploaded image
      if (imagePath) {
        await deleteImage(STORAGE_BUCKETS.PROJECTS, imagePath)
      }
      if (galleryPaths.length > 0) {
        for (const path of galleryPaths) {
          await deleteImage(STORAGE_BUCKETS.PROJECTS, path)
        }
      }
      throw projectError
    }

    // Link technologies if provided
    if (projectData.technologyIds && projectData.technologyIds.length > 0) {
      const projectTechnologies = projectData.technologyIds.map((techId) => ({
        project_id: project.id,
        technology_id: techId,
      }))

      const { error: linkError } = await supabase
        .from('projects_technologies')
        .insert(projectTechnologies)

      if (linkError) {
        // If linking fails, delete the project
        await supabase.from('projects').delete().eq('id', project.id)
        if (imagePath) {
          await deleteImage(STORAGE_BUCKETS.PROJECTS, imagePath)
        }
        throw linkError
      }
    }

    // Fetch the complete project with technologies
    const { data: completeProject } = await getProjectById(project.id)

    return { data: completeProject, error: null }
  } catch (error) {
    console.error('Error creating project:', error)
    return { data: null, error }
  }
}

/**
 * Update an existing project
 * @param {string} id - Project ID
 * @param {Object} projectData - Updated project data
 * @param {File|null} imageFile - Optional new image file to upload
 * @param {boolean} deleteOldImage - Whether to delete old image
 * @param {File[]|null} galleryFiles - Optional new gallery images (replaces existing)
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function updateProject(
  id,
  projectData,
  imageFile = null,
  deleteOldImage = false,
  galleryFiles = []
) {
  try {
    // Get current project to access old image and gallery paths
    const { data: currentProject } = await getProjectById(id)
    const oldImagePath = currentProject?.image_path
    const oldGalleryPaths = Array.isArray(currentProject?.gallery_paths)
      ? currentProject.gallery_paths
      : []

    let imagePath = projectData.image_path || oldImagePath
    let galleryPaths = oldGalleryPaths

    // Upload new image if provided
    if (imageFile) {
      const uploadResult = await uploadImage(
        imageFile,
        STORAGE_BUCKETS.PROJECTS,
        'images'
      )
      if (uploadResult.error) {
        throw uploadResult.error
      }
      imagePath = uploadResult.path

      // Delete old image if it exists and deleteOldImage is true
      if (deleteOldImage && oldImagePath) {
        await deleteImage(STORAGE_BUCKETS.PROJECTS, oldImagePath)
      }
    }

    // If new gallery files are provided, replace existing gallery
    if (Array.isArray(galleryFiles) && galleryFiles.length > 0) {
      const newGalleryPaths = []
      for (const file of galleryFiles) {
        if (!file) continue
        const uploadResult = await uploadImage(
          file,
          STORAGE_BUCKETS.PROJECTS,
          'gallery'
        )
        if (uploadResult.error) {
          // Clean up any newly uploaded gallery images
          for (const path of newGalleryPaths) {
            await deleteImage(STORAGE_BUCKETS.PROJECTS, path)
          }
          throw uploadResult.error
        }
        newGalleryPaths.push(uploadResult.path)
      }

      // Delete old gallery images
      if (oldGalleryPaths.length > 0) {
        for (const path of oldGalleryPaths) {
          await deleteImage(STORAGE_BUCKETS.PROJECTS, path)
        }
      }

      galleryPaths = newGalleryPaths
    }

    // Update project in database
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .update({
        title: projectData.title,
        description: projectData.description,
        tagline: projectData.tagline || null,
        features: Array.isArray(projectData.features) && projectData.features.length > 0
          ? projectData.features
          : null,
        duration: projectData.duration || null,
        team_size: projectData.team_size || null,
        role: projectData.role || null,
        challenges: projectData.challenges || null,
        solutions: projectData.solutions || null,
        image_path: imagePath,
        category: projectData.category,
        github_url: projectData.github_url || null,
        live_url: projectData.live_url || null,
        gallery_paths: galleryPaths.length > 0 ? galleryPaths : null,
      })
      .eq('id', id)
      .select()
      .single()

    if (projectError) {
      // If database update fails and we uploaded a new image, delete it
      if (imageFile && imagePath !== oldImagePath) {
        await deleteImage(STORAGE_BUCKETS.PROJECTS, imagePath)
      }
      throw projectError
    }

    // Update technology links if provided
    if (projectData.technologyIds !== undefined) {
      // Delete existing links
      await supabase
        .from('projects_technologies')
        .delete()
        .eq('project_id', id)

      // Insert new links if any
      if (projectData.technologyIds && projectData.technologyIds.length > 0) {
        const projectTechnologies = projectData.technologyIds.map((techId) => ({
          project_id: id,
          technology_id: techId,
        }))

        const { error: linkError } = await supabase
          .from('projects_technologies')
          .insert(projectTechnologies)

        if (linkError) {
          throw linkError
        }
      }
    }

    // Fetch the complete project with technologies
    const { data: completeProject } = await getProjectById(id)

    return { data: completeProject, error: null }
  } catch (error) {
    console.error('Error updating project:', error)
    return { data: null, error }
  }
}

/**
 * Delete a project
 * @param {string} id - Project ID
 * @returns {Promise<{success: boolean, error: Error|null}>}
 */
export async function deleteProject(id) {
  try {
    // Get project to access image path
    const { data: project } = await getProjectById(id)

    // Delete from database
    const { error } = await supabase.from('projects').delete().eq('id', id)

    if (error) throw error

    // Delete image from storage if it exists
    if (project?.image_path) {
      await deleteImage(STORAGE_BUCKETS.PROJECTS, project.image_path)
    }

    return { success: true, error: null }
  } catch (error) {
    console.error('Error deleting project:', error)
    return { success: false, error }
  }
}

