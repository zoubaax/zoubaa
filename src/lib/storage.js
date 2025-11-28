import { supabase } from './supabase'

// Storage bucket names
export const STORAGE_BUCKETS = {
  PROJECTS: 'projects',
  CERTIFICATES: 'certificates',
}

/**
 * Upload an image file to Supabase Storage
 * @param {File} file - The image file to upload
 * @param {string} bucket - The storage bucket name
 * @param {string} folder - Optional folder path within the bucket
 * @returns {Promise<{path: string, error: Error|null}>}
 */
export async function uploadImage(file, bucket, folder = '') {
  try {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      throw new Error('File must be an image')
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`
    const filePath = folder ? `${folder}/${fileName}` : fileName

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (error) {
      // Provide more helpful error message for bucket not found
      if (error.message && error.message.includes('Bucket not found')) {
        throw new Error(`Storage bucket "${bucket}" not found. Please create it in Supabase Storage dashboard. See QUICK_STORAGE_FIX.md for instructions.`)
      }
      throw error
    }

    return { path: filePath, error: null }
  } catch (error) {
    console.error('Error uploading image:', error)
    return { path: null, error }
  }
}

/**
 * Delete an image from Supabase Storage
 * @param {string} bucket - The storage bucket name
 * @param {string} filePath - The path to the file in storage
 * @returns {Promise<{success: boolean, error: Error|null}>}
 */
export async function deleteImage(bucket, filePath) {
  try {
    if (!filePath) {
      return { success: true, error: null }
    }

    const { error } = await supabase.storage.from(bucket).remove([filePath])

    if (error) {
      throw error
    }

    return { success: true, error: null }
  } catch (error) {
    console.error('Error deleting image:', error)
    return { success: false, error }
  }
}

/**
 * Get public URL for an image in Supabase Storage
 * @param {string} bucket - The storage bucket name
 * @param {string} filePath - The path to the file in storage
 * @returns {string} Public URL
 */
export function getImageUrl(bucket, filePath) {
  if (!filePath) return null

  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath)
  return data.publicUrl
}

