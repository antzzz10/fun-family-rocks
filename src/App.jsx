import { useState } from 'react'
import { useAuth } from './hooks/useAuth'
import { useSpecimens } from './hooks/useSpecimens'
import { useRockTypes } from './hooks/useRockTypes'
import { LoginForm } from './components/Auth/LoginForm'
import { Header } from './components/Layout/Header'
import { Hero } from './components/Layout/Hero'
import { FunFactsBanner } from './components/Layout/FunFactsBanner'
import { SpecimenGallery } from './components/Specimens/SpecimenGallery'
import { SpecimenForm } from './components/Specimens/SpecimenForm'
import './styles/index.css'

function App() {
  const { user, loading: authLoading, signIn, signOut } = useAuth()
  const { specimens, loading: specimensLoading, addSpecimen, updateSpecimen, deleteSpecimen } = useSpecimens()
  const { rockTypes, getFunFact } = useRockTypes()

  const [showForm, setShowForm] = useState(false)
  const [editingSpecimen, setEditingSpecimen] = useState(null)

  if (authLoading) {
    return (
      <div className="loading-container">
        <div className="loading">Sedimentary, my dear Watson...</div>
      </div>
    )
  }

  if (!user) {
    return <LoginForm onSignIn={signIn} />
  }

  const handleAddClick = () => {
    setEditingSpecimen(null)
    setShowForm(true)
  }

  const handleEditClick = (specimen) => {
    setEditingSpecimen(specimen)
    setShowForm(true)
  }

  const handleSave = async (formData, photoFile) => {
    if (editingSpecimen) {
      await updateSpecimen(editingSpecimen.id, formData, photoFile)
    } else {
      await addSpecimen(formData, photoFile)
    }
    setShowForm(false)
    setEditingSpecimen(null)
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingSpecimen(null)
  }

  return (
    <div className="app">
      <Header onSignOut={signOut} />
      <Hero />
      <FunFactsBanner rockTypes={rockTypes} />

      <div className="container">
        <div className="controls">
          <div className="stats">
            <div className="stat-box">
              <div className="stat-number">{specimens.length}</div>
              <div className="stat-label">Rocks in Stock</div>
            </div>
          </div>

          <button className="btn" onClick={handleAddClick}>
            + Add Another Rock Star
          </button>
        </div>

        {specimensLoading ? (
          <div className="loading-container">
            <div className="loading">Digging through the collection...</div>
          </div>
        ) : (
          <SpecimenGallery
            specimens={specimens}
            onEdit={handleEditClick}
            onDelete={deleteSpecimen}
          />
        )}
      </div>

      {showForm && (
        <SpecimenForm
          specimen={editingSpecimen}
          rockTypes={rockTypes}
          onSave={handleSave}
          onCancel={handleCancel}
          getFunFact={getFunFact}
        />
      )}
    </div>
  )
}

export default App
