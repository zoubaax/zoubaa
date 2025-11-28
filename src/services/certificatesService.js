import { supabase } from '../lib/supabase'
import { uploadImage, deleteImage, getImageUrl, STORAGE_BUCKETS } from '../lib/storage'

/**
 * Get all certificates
 * @returns {Promise<{data: Array, error: Error|null}>}
 */
export async function getCertificates() {
  try {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    // Add image URLs to each certificate
    const certificatesWithUrls = data.map((certificate) => ({
      ...certificate,
      image_url: certificate.image_path
        ? getImageUrl(STORAGE_BUCKETS.CERTIFICATES, certificate.image_path)
        : null,
    }))

    return { data: certificatesWithUrls, error: null }
  } catch (error) {
    console.error('Error fetching certificates:', error)
    return { data: null, error }
  }
}

/**
 * Get a single certificate by ID
 * @param {string} id - Certificate ID
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function getCertificateById(id) {
  try {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    const certificateWithUrl = {
      ...data,
      image_url: data.image_path
        ? getImageUrl(STORAGE_BUCKETS.CERTIFICATES, data.image_path)
        : null,
    }

    return { data: certificateWithUrl, error: null }
  } catch (error) {
    console.error('Error fetching certificate:', error)
    return { data: null, error }
  }
}

/**
 * Create a new certificate
 * @param {Object} certificateData - Certificate data
 * @param {File|null} imageFile - Optional image file to upload
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function createCertificate(certificateData, imageFile = null) {
  try {
    let imagePath = null

    // Upload image if provided
    if (imageFile) {
      const uploadResult = await uploadImage(
        imageFile,
        STORAGE_BUCKETS.CERTIFICATES,
        'images'
      )
      if (uploadResult.error) {
        throw uploadResult.error
      }
      imagePath = uploadResult.path
    }

    // Insert certificate into database
    const { data, error } = await supabase
      .from('certificates')
      .insert([
        {
          title: certificateData.title,
          image_path: imagePath,
          show_url: certificateData.show_url || null,
        },
      ])
      .select()
      .single()

    if (error) {
      // If database insert fails, delete uploaded image
      if (imagePath) {
        await deleteImage(STORAGE_BUCKETS.CERTIFICATES, imagePath)
      }
      throw error
    }

    const certificateWithUrl = {
      ...data,
      image_url: data.image_path
        ? getImageUrl(STORAGE_BUCKETS.CERTIFICATES, data.image_path)
        : null,
    }

    return { data: certificateWithUrl, error: null }
  } catch (error) {
    console.error('Error creating certificate:', error)
    return { data: null, error }
  }
}

/**
 * Update an existing certificate
 * @param {string} id - Certificate ID
 * @param {Object} certificateData - Updated certificate data
 * @param {File|null} imageFile - Optional new image file to upload
 * @param {boolean} deleteOldImage - Whether to delete old image
 * @returns {Promise<{data: Object|null, error: Error|null}>}
 */
export async function updateCertificate(
  id,
  certificateData,
  imageFile = null,
  deleteOldImage = false
) {
  try {
    // Get current certificate to access old image path
    const { data: currentCertificate } = await getCertificateById(id)
    const oldImagePath = currentCertificate?.image_path

    let imagePath = certificateData.image_path || oldImagePath

    // Upload new image if provided
    if (imageFile) {
      const uploadResult = await uploadImage(
        imageFile,
        STORAGE_BUCKETS.CERTIFICATES,
        'images'
      )
      if (uploadResult.error) {
        throw uploadResult.error
      }
      imagePath = uploadResult.path

      // Delete old image if it exists and deleteOldImage is true
      if (deleteOldImage && oldImagePath) {
        await deleteImage(STORAGE_BUCKETS.CERTIFICATES, oldImagePath)
      }
    }

    // Update certificate in database
    const { data, error } = await supabase
      .from('certificates')
      .update({
        title: certificateData.title,
        image_path: imagePath,
        show_url: certificateData.show_url || null,
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      // If database update fails and we uploaded a new image, delete it
      if (imageFile && imagePath !== oldImagePath) {
        await deleteImage(STORAGE_BUCKETS.CERTIFICATES, imagePath)
      }
      throw error
    }

    const certificateWithUrl = {
      ...data,
      image_url: data.image_path
        ? getImageUrl(STORAGE_BUCKETS.CERTIFICATES, data.image_path)
        : null,
    }

    return { data: certificateWithUrl, error: null }
  } catch (error) {
    console.error('Error updating certificate:', error)
    return { data: null, error }
  }
}

/**
 * Delete a certificate
 * @param {string} id - Certificate ID
 * @returns {Promise<{success: boolean, error: Error|null}>}
 */
export async function deleteCertificate(id) {
  try {
    // Get certificate to access image path
    const { data: certificate } = await getCertificateById(id)

    // Delete from database
    const { error } = await supabase.from('certificates').delete().eq('id', id)

    if (error) throw error

    // Delete image from storage if it exists
    if (certificate?.image_path) {
      await deleteImage(STORAGE_BUCKETS.CERTIFICATES, certificate.image_path)
    }

    return { success: true, error: null }
  } catch (error) {
    console.error('Error deleting certificate:', error)
    return { success: false, error }
  }
}

