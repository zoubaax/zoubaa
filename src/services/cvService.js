import { supabase } from '../lib/supabase'
import { STORAGE_BUCKETS } from '../lib/storage'

/**
 * Upload a new CV PDF file
 * @param {File} file - The PDF file to upload
 * @returns {Promise<{success: boolean, error: Error|null}>}
 */
export async function uploadCV(file) {
  try {
    if (file.type !== 'application/pdf') {
      throw new Error('File must be a PDF')
    }

    const { error } = await supabase.storage
      .from(STORAGE_BUCKETS.CV)
      .upload('resume.pdf', file, {
        cacheControl: '3600',
        upsert: true,
      })

    if (error) throw error

    return { success: true, error: null }
  } catch (error) {
    console.error('Error uploading CV:', error)
    return { success: false, error }
  }
}

/**
 * Get the public URL for the latest CV
 * @returns {Promise<{url: string|null, error: Error|null}>}
 */
export async function getCVUrl() {
  try {
    const { data: listData, error: listError } = await supabase.storage
      .from(STORAGE_BUCKETS.CV)
      .list('', {
        search: 'resume.pdf'
      })

    if (listError) throw listError

    if (!listData || listData.length === 0) {
      return { url: null, error: null }
    }

    const fileMeta = listData.find(f => f.name === 'resume.pdf')
    if (!fileMeta) return { url: null, error: null }

    const { data } = supabase.storage
      .from(STORAGE_BUCKETS.CV)
      .getPublicUrl('resume.pdf')

    // Append updated_at timestamp to bypass browser cache
    const cacheBuster = new Date(fileMeta.updated_at).getTime()
    return { url: `${data.publicUrl}?t=${cacheBuster}`, error: null }
  } catch (error) {
    console.error('Error fetching CV URL:', error)
    return { url: null, error }
  }
}
