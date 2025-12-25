import { useState, useEffect } from 'react'

export function SpecimenForm({ specimen, rockTypes, onSave, onCancel, getFunFact }) {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    location: '',
    source: '',
    summary: '',
    notes: ''
  })
  const [photoFile, setPhotoFile] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentFunFact, setCurrentFunFact] = useState(null)

  useEffect(() => {
    if (specimen) {
      setFormData({
        name: specimen.name || '',
        type: specimen.type || '',
        location: specimen.location || '',
        source: specimen.source || '',
        summary: specimen.summary || '',
        notes: specimen.notes || ''
      })
      setPhotoPreview(specimen.photo_url)

      // Load fun fact for existing type
      const funFact = getFunFact(specimen.type)
      setCurrentFunFact(funFact)
    }
  }, [specimen, getFunFact])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    // Update fun fact when type changes
    if (name === 'type') {
      const funFact = getFunFact(value)
      setCurrentFunFact(funFact)
    }
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPhotoFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      // For new specimens, photo is required
      if (!specimen && !photoFile) {
        throw new Error('Please select a photo')
      }

      await onSave(formData, photoFile)

      // Reset form
      setFormData({
        name: '',
        type: '',
        location: '',
        source: '',
        summary: '',
        notes: ''
      })
      setPhotoFile(null)
      setPhotoPreview(null)
      setCurrentFunFact(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onCancel}>&times;</span>
        <h2>{specimen ? 'Polish This Rock' : 'Add a Rock Star to the Collection'}</h2>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="required">Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              required={!specimen}
            />
            {photoPreview && (
              <img src={photoPreview} alt="Preview" className="photo-preview" />
            )}
          </div>

          <div className="form-group">
            <label className="required">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Quartz Crystal"
              required
            />
          </div>

          <div className="form-group">
            <label className="required">Type</label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="e.g., Quartz, Igneous"
              list="rock-types"
              required
            />
            <datalist id="rock-types">
              {rockTypes.map(rt => (
                <option key={rt.id} value={rt.type_name} />
              ))}
            </datalist>
            {currentFunFact && (
              <div className="fun-fact-preview">
                💡 <em>{currentFunFact}</em>
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Location Found</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Pike's Peak, Colorado"
            />
          </div>

          <div className="form-group">
            <label>Source</label>
            <input
              type="text"
              name="source"
              value={formData.source}
              onChange={handleChange}
              placeholder="e.g., Colorado trip 2019, Gift from Uncle Jim"
            />
          </div>

          <div className="form-group">
            <label>Summary</label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              placeholder="Brief description of this specimen..."
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Additional details, memories, or information..."
              rows="3"
            />
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Rock-ing and rolling...' : 'This Rocks! Save It'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Never Mind
          </button>
        </form>
      </div>
    </div>
  )
}
