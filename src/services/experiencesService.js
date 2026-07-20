import { supabase } from '../lib/supabase'
import { uploadImage, deleteImage, getImageUrl, STORAGE_BUCKETS } from '../lib/storage'

/**
 * Get all experiences
 * @returns {Promise<{data: Array, error: Error|null}>}
 */
export async function getExperiences() {
  try {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('order', { ascending: true })

    if (error) throw error

    // Add image URLs to each experience
    const experiencesWithUrls = data.map((exp) => ({
      ...exp,
      image_url: exp.image_path
        ? getImageUrl(STORAGE_BUCKETS.EXPERIENCES, exp.image_path)
        : null,
    }))

    return { data: experiencesWithUrls, error: null }
  } catch (error) {
    console.error('Error fetching experiences:', error)
    return { data: null, error }
  }
}

/**
 * Get a single experience by ID
 * @param {string} id - Experience ID
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function getExperienceById(id) {
  try {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    const experienceWithUrl = {
      ...data,
      image_url: data.image_path
        ? getImageUrl(STORAGE_BUCKETS.EXPERIENCES, data.image_path)
        : null,
    }

    return { data: experienceWithUrl, error: null }
  } catch (error) {
    console.error('Error fetching experience:', error)
    return { data: null, error }
  }
}

/**
 * Create a new experience
 * @param {Object} experienceData - Experience data
 * @param {File|null} imageFile - Optional company logo to upload
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function createExperience(experienceData, imageFile = null) {
  try {
    let imagePath = null

    // Upload image if provided
    if (imageFile) {
      const uploadResult = await uploadImage(
        imageFile,
        STORAGE_BUCKETS.EXPERIENCES,
        'logos'
      )
      if (uploadResult.error) {
        throw uploadResult.error
      }
      imagePath = uploadResult.path
    }

    // Insert experience into database
    const { data, error } = await supabase
      .from('experiences')
      .insert([
        {
          title: experienceData.title,
          company: experienceData.company,
          type: experienceData.type,
          location: experienceData.location,
          duration: experienceData.duration,
          description: experienceData.description,
          achievements: experienceData.achievements || [],
          skills: experienceData.skills || [],
          order: experienceData.order || 0,
          image_path: imagePath,
        },
      ])
      .select()
      .single()

    if (error) {
      if (imagePath) {
        await deleteImage(STORAGE_BUCKETS.EXPERIENCES, imagePath)
      }
      throw error
    }

    const experienceWithUrl = {
      ...data,
      image_url: data.image_path
        ? getImageUrl(STORAGE_BUCKETS.EXPERIENCES, data.image_path)
        : null,
    }

    return { data: experienceWithUrl, error: null }
  } catch (error) {
    console.error('Error creating experience:', error)
    return { data: null, error }
  }
}

/**
 * Update an existing experience
 * @param {string} id - Experience ID
 * @param {Object} experienceData - Updated experience data
 * @param {File|null} imageFile - Optional new image file to upload
 * @param {boolean} deleteOldImage - Whether to delete old image
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function updateExperience(
  id,
  experienceData,
  imageFile = null,
  deleteOldImage = false
) {
  try {
    const { data: currentExperience } = await getExperienceById(id)
    const oldImagePath = currentExperience?.image_path

    let imagePath = experienceData.image_path || oldImagePath

    if (imageFile) {
      const uploadResult = await uploadImage(
        imageFile,
        STORAGE_BUCKETS.EXPERIENCES,
        'logos'
      )
      if (uploadResult.error) {
        throw uploadResult.error
      }
      imagePath = uploadResult.path

      if (deleteOldImage && oldImagePath) {
        await deleteImage(STORAGE_BUCKETS.EXPERIENCES, oldImagePath)
      }
    }

    const { data, error } = await supabase
      .from('experiences')
      .update({
        title: experienceData.title,
        company: experienceData.company,
        type: experienceData.type,
        location: experienceData.location,
        duration: experienceData.duration,
        description: experienceData.description,
        achievements: experienceData.achievements || [],
        skills: experienceData.skills || [],
        order: experienceData.order || 0,
        image_path: imagePath,
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      if (imageFile && imagePath !== oldImagePath) {
        await deleteImage(STORAGE_BUCKETS.EXPERIENCES, imagePath)
      }
      throw error
    }

    const experienceWithUrl = {
      ...data,
      image_url: data.image_path
        ? getImageUrl(STORAGE_BUCKETS.EXPERIENCES, data.image_path)
        : null,
    }

    return { data: experienceWithUrl, error: null }
  } catch (error) {
    console.error('Error updating experience:', error)
    return { data: null, error }
  }
}

/**
 * Delete an experience
 * @param {string} id - Experience ID
 * @returns {Promise<{success: boolean, error: Error|null}>}
 */
export async function deleteExperience(id) {
  try {
    const { data: experience } = await getExperienceById(id)

    const { error } = await supabase.from('experiences').delete().eq('id', id)

    if (error) throw error

    if (experience?.image_path) {
      await deleteImage(STORAGE_BUCKETS.EXPERIENCES, experience.image_path)
    }

    return { success: true, error: null }
  } catch (error) {
    console.error('Error deleting experience:', error)
    return { success: false, error }
  }
}
