import { useState } from 'react'

export function LoginForm({ onSignIn }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await onSignIn(email, password)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>🪨 Fun Family Rocks!</h2>
        <p>Aaron's rockin' collection awaits...</p>
        <p style={{ fontSize: '0.9em', fontStyle: 'italic', color: '#8B4513' }}>
          Ready to get your rocks off? (the shelf... what did you think?)
        </p>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Digging in...' : 'Let\'s Rock!'}
          </button>
        </form>
      </div>
    </div>
  )
}
