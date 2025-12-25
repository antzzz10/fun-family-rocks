import { useState, useEffect } from 'react'
import { supabase, uploadPhoto, deletePhoto } from '../lib/supabase'

export function useSpecimens() {
  const [specimens, setSpecimens] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSpecimens()
  }, [])

  const fetchSpecimens = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('specimens')
      .select('*')
      .order('date_added', { ascending: false })

    if (error) {
      console.error('Error fetching specimens:', error)
    } else {
      setSpecimens(data || [])
    }
    setLoading(false)
  }

  const addSpecimen = async (specimenData, photoFile) => {
    // Generate ID first
    const specimenId = crypto.randomUUID()

    // Upload photo
    const { path, url } = await uploadPhoto(photoFile, specimenId)

    // Insert specimen
    const { data, error } = await supabase
      .from('specimens')
      .insert([{
        id: specimenId,
        ...specimenData,
        photo_url: url,
        photo_path: path
      }])
      .select()
      .single()

    if (error) throw error

    setSpecimens([data, ...specimens])
    return data
  }

  const updateSpecimen = async (id, updates, photoFile) => {
    let photoData = {}

    if (photoFile) {
      const { path, url } = await uploadPhoto(photoFile, id)
      photoData = { photo_url: url, photo_path: path }
    }

    const { data, error } = await supabase
      .from('specimens')
      .update({ ...updates, ...photoData })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    setSpecimens(specimens.map(s => s.id === id ? data : s))
    return data
  }

  const deleteSpecimen = async (id, photoPath) => {
    await deletePhoto(photoPath)

    const { error } = await supabase
      .from('specimens')
      .delete()
      .eq('id', id)

    if (error) throw error

    setSpecimens(specimens.filter(s => s.id !== id))
  }

  return {
    specimens,
    loading,
    addSpecimen,
    updateSpecimen,
    deleteSpecimen,
    refetch: fetchSpecimens
  }
}
