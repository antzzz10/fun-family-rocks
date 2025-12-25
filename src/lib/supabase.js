import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper: Upload photo
export async function uploadPhoto(file, specimenId) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${specimenId}.${fileExt}`
  const filePath = `specimens/${fileName}`

  const { data, error } = await supabase.storage
    .from('specimen-photos')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true
    })

  if (error) throw error

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('specimen-photos')
    .getPublicUrl(filePath)

  return { path: filePath, url: publicUrl }
}

// Helper: Delete photo
export async function deletePhoto(photoPath) {
  const { error } = await supabase.storage
    .from('specimen-photos')
    .remove([photoPath])

  if (error) throw error
}
