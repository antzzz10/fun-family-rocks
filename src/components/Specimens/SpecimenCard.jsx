export function SpecimenCard({ specimen, onEdit, onDelete }) {
  const handleDelete = () => {
    if (confirm('This decision is set in stone! Are you sure you want to delete this specimen?')) {
      onDelete(specimen.id, specimen.photo_path)
    }
  }

  return (
    <div className="specimen-card">
      <img
        src={specimen.photo_url}
        alt={specimen.name}
        className="specimen-image"
      />

      <div className="specimen-info">
        <div className="specimen-name">{specimen.name}</div>
        <div className="specimen-detail">
          <strong>Type:</strong> {specimen.type}
        </div>
        {specimen.location && (
          <div className="specimen-detail">
            <strong>Location:</strong> {specimen.location}
          </div>
        )}
        {specimen.source && (
          <div className="specimen-detail">
            <strong>Source:</strong> {specimen.source}
          </div>
        )}
        {specimen.summary && (
          <div className="specimen-detail">
            <strong>Summary:</strong> {specimen.summary}
          </div>
        )}
        {specimen.notes && (
          <div className="specimen-detail">
            <strong>Notes:</strong> {specimen.notes}
          </div>
        )}
      </div>
      <div className="specimen-actions">
        <button className="btn btn-small" onClick={() => onEdit(specimen)}>
          Edit
        </button>
        <button className="btn btn-secondary btn-small" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  )
}
