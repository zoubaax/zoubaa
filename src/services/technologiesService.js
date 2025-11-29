import { supabase } from '../lib/supabase'
import { uploadImage, deleteImage, getImageUrl, STORAGE_BUCKETS } from '../lib/storage'

/**
 * Get all technologies
 * @returns {Promise<{data: Array, error: Error|null}>}
 */
export async function getTechnologies() {
  try {
    const { data, error } = await supabase
      .from('technologies')
      .select('*')
      .order('name', { ascending: true })

    if (error) throw error

    // Add image URLs to each technology
    const technologiesWithUrls = data.map((tech) => ({
      ...tech,
      image_url: tech.image_path
        ? getImageUrl(STORAGE_BUCKETS.TECHNOLOGIES, tech.image_path)
        : null,
    }))

    return { data: technologiesWithUrls, error: null }
  } catch (error) {
    console.error('Error fetching technologies:', error)
    return { data: null, error }
  }
}

/**
 * Get a single technology by ID
 * @param {string} id - Technology ID
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function getTechnologyById(id) {
  try {
    const { data, error } = await supabase
      .from('technologies')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    const technologyWithUrl = {
      ...data,
      image_url: data.image_path
        ? getImageUrl(STORAGE_BUCKETS.TECHNOLOGIES, data.image_path)
        : null,
    }

    return { data: technologyWithUrl, error: null }
  } catch (error) {
    console.error('Error fetching technology:', error)
    return { data: null, error }
  }
}

/**
 * Create a new technology
 * @param {Object} technologyData - Technology data
 * @param {File|null} imageFile - Optional image file to upload
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function createTechnology(technologyData, imageFile = null) {
  try {
    let imagePath = null

    // Upload image if provided
    if (imageFile) {
      const uploadResult = await uploadImage(
        imageFile,
        STORAGE_BUCKETS.TECHNOLOGIES,
        'images'
      )
      if (uploadResult.error) {
        throw uploadResult.error
      }
      imagePath = uploadResult.path
    }

    // Insert technology into database
    const { data, error } = await supabase
      .from('technologies')
      .insert([
        {
          name: technologyData.name,
          image_path: imagePath,
        },
      ])
      .select()
      .single()

    if (error) {
      // If database insert fails, delete uploaded image
      if (imagePath) {
        await deleteImage(STORAGE_BUCKETS.TECHNOLOGIES, imagePath)
      }
      throw error
    }

    const technologyWithUrl = {
      ...data,
      image_url: data.image_path
        ? getImageUrl(STORAGE_BUCKETS.TECHNOLOGIES, data.image_path)
        : null,
    }

    return { data: technologyWithUrl, error: null }
  } catch (error) {
    console.error('Error creating technology:', error)
    return { data: null, error }
  }
}

/**
 * Update an existing technology
 * @param {string} id - Technology ID
 * @param {Object} technologyData - Updated technology data
 * @param {File|null} imageFile - Optional new image file to upload
 * @param {boolean} deleteOldImage - Whether to delete old image
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function updateTechnology(
  id,
  technologyData,
  imageFile = null,
  deleteOldImage = false
) {
  try {
    // Get current technology to access old image path
    const { data: currentTechnology } = await getTechnologyById(id)
    const oldImagePath = currentTechnology?.image_path

    let imagePath = technologyData.image_path || oldImagePath

    // Upload new image if provided
    if (imageFile) {
      const uploadResult = await uploadImage(
        imageFile,
        STORAGE_BUCKETS.TECHNOLOGIES,
        'images'
      )
      if (uploadResult.error) {
        throw uploadResult.error
      }
      imagePath = uploadResult.path

      // Delete old image if it exists and deleteOldImage is true
      if (deleteOldImage && oldImagePath) {
        await deleteImage(STORAGE_BUCKETS.TECHNOLOGIES, oldImagePath)
      }
    }

    // Update technology in database
    const { data, error } = await supabase
      .from('technologies')
      .update({
        name: technologyData.name,
        image_path: imagePath,
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      // If database update fails and we uploaded a new image, delete it
      if (imageFile && imagePath !== oldImagePath) {
        await deleteImage(STORAGE_BUCKETS.TECHNOLOGIES, imagePath)
      }
      throw error
    }

    const technologyWithUrl = {
      ...data,
      image_url: data.image_path
        ? getImageUrl(STORAGE_BUCKETS.TECHNOLOGIES, data.image_path)
        : null,
    }

    return { data: technologyWithUrl, error: null }
  } catch (error) {
    console.error('Error updating technology:', error)
    return { data: null, error }
  }
}

/**
 * Delete a technology
 * @param {string} id - Technology ID
 * @returns {Promise<{success: boolean, error: Error|null}>}
 */
export async function deleteTechnology(id) {
  try {
    // Get technology to access image path
    const { data: technology } = await getTechnologyById(id)

    // Delete from database (cascade will handle projects_technologies)
    const { error } = await supabase.from('technologies').delete().eq('id', id)

    if (error) throw error

    // Delete image from storage if it exists
    if (technology?.image_path) {
      await deleteImage(STORAGE_BUCKETS.TECHNOLOGIES, technology.image_path)
    }

    return { success: true, error: null }
  } catch (error) {
    console.error('Error deleting technology:', error)
    return { success: false, error }
  }
}


