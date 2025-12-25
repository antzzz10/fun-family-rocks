import { SpecimenCard } from './SpecimenCard'

export function SpecimenGallery({ specimens, onEdit, onDelete }) {
  if (specimens.length === 0) {
    return (
      <div className="empty-state">
        <h2>Your collection is a little boulder-ing!</h2>
        <p>Don't take this for granite - add your first rock and let's get this party started! 🎉</p>
      </div>
    )
  }

  return (
    <div className="gallery">
      {specimens.map(specimen => (
        <SpecimenCard
          key={specimen.id}
          specimen={specimen}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
