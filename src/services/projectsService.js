import { supabase } from '../lib/supabase'
import { uploadImage, deleteImage, getImageUrl, STORAGE_BUCKETS } from '../lib/storage'

/**
 * Get all projects
 * @returns {Promise<{data: Array, error: Error|null}>}
 */
export async function getProjects() {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    // Add image URLs to each project
    const projectsWithUrls = data.map((project) => ({
      ...project,
      image_url: project.image_path
        ? getImageUrl(STORAGE_BUCKETS.PROJECTS, project.image_path)
        : null,
    }))

    return { data: projectsWithUrls, error: null }
  } catch (error) {
    console.error('Error fetching projects:', error)
    return { data: null, error }
  }
}

/**
 * Get a single project by ID
 * @param {string} id - Project ID
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function getProjectById(id) {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    const projectWithUrl = {
      ...data,
      image_url: data.image_path
        ? getImageUrl(STORAGE_BUCKETS.PROJECTS, data.image_path)
        : null,
    }

    return { data: projectWithUrl, error: null }
  } catch (error) {
    console.error('Error fetching project:', error)
    return { data: null, error }
  }
}

/**
 * Create a new project
 * @param {Object} projectData - Project data
 * @param {File|null} imageFile - Optional image file to upload
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function createProject(projectData, imageFile = null) {
  try {
    let imagePath = null

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

    // Insert project into database
    const { data, error } = await supabase
      .from('projects')
      .insert([
        {
          title: projectData.title,
          description: projectData.description,
          image_path: imagePath,
          technologies: projectData.technologies || [],
          category: projectData.category,
        },
      ])
      .select()
      .single()

    if (error) {
      // If database insert fails, delete uploaded image
      if (imagePath) {
        await deleteImage(STORAGE_BUCKETS.PROJECTS, imagePath)
      }
      throw error
    }

    const projectWithUrl = {
      ...data,
      image_url: data.image_path
        ? getImageUrl(STORAGE_BUCKETS.PROJECTS, data.image_path)
        : null,
    }

    return { data: projectWithUrl, error: null }
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
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function updateProject(
  id,
  projectData,
  imageFile = null,
  deleteOldImage = false
) {
  try {
    // Get current project to access old image path
    const { data: currentProject } = await getProjectById(id)
    const oldImagePath = currentProject?.image_path

    let imagePath = projectData.image_path || oldImagePath

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

    // Update project in database
    const { data, error } = await supabase
      .from('projects')
      .update({
        title: projectData.title,
        description: projectData.description,
        image_path: imagePath,
        technologies: projectData.technologies || [],
        category: projectData.category,
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      // If database update fails and we uploaded a new image, delete it
      if (imageFile && imagePath !== oldImagePath) {
        await deleteImage(STORAGE_BUCKETS.PROJECTS, imagePath)
      }
      throw error
    }

    const projectWithUrl = {
      ...data,
      image_url: data.image_path
        ? getImageUrl(STORAGE_BUCKETS.PROJECTS, data.image_path)
        : null,
    }

    return { data: projectWithUrl, error: null }
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

