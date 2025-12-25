export function Header({ onSignOut }) {
  return (
    <header className="app-header">
      <div className="header-content">
        <h1>🪨 Fun Family Rocks</h1>
        <div className="header-right">
          <span className="welcome-message">Gneiss to see you, Aaron!</span>
          <button onClick={onSignOut} className="btn btn-secondary btn-small">
            Sign Out
          </button>
        </div>
      </div>
    </header>
  )
}
