import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useRockTypes() {
  const [rockTypes, setRockTypes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRockTypes()
  }, [])

  const fetchRockTypes = async () => {
    const { data, error } = await supabase
      .from('rock_types')
      .select('*')
      .order('type_name')

    if (error) {
      console.error('Error fetching rock types:', error)
    } else {
      setRockTypes(data || [])
    }
    setLoading(false)
  }

  const addRockType = async (typeName, funFact) => {
    const { data, error } = await supabase
      .from('rock_types')
      .insert([{ type_name: typeName, fun_fact: funFact }])
      .select()
      .single()

    if (error) throw error
    setRockTypes([...rockTypes, data])
    return data
  }

  const updateRockType = async (id, updates) => {
    const { data, error } = await supabase
      .from('rock_types')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    setRockTypes(rockTypes.map(rt => rt.id === id ? data : rt))
    return data
  }

  const getFunFact = (typeName) => {
    const rockType = rockTypes.find(rt => rt.type_name.toLowerCase() === typeName.toLowerCase())
    return rockType?.fun_fact || null
  }

  return {
    rockTypes,
    loading,
    addRockType,
    updateRockType,
    getFunFact,
    refetch: fetchRockTypes
  }
}
