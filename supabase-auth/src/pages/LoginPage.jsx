import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { AuthCard } from '../components/AuthCard'
import { Alert } from '../components/Alert'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [keepMe,   setKeepMe]   = useState(false)
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) return setError(error.message)
    navigate('/welcome')
  }

  return (
    <AuthCard>
      <h1>Log in</h1>
      <p className="auth-subtitle">
        Need a account? <Link to="/signup">Create an account</Link>
      </p>

      <Alert type="error" message={error} />

      <form onSubmit={handleLogin}>
        <div className="field">
          <label>Username or Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoFocus
          />
        </div>

        <div className="field">
          <div className="field-header">
            <label style={{ margin: 0 }}>Password</label>
            <button type="button" className="show-btn" onClick={() => setShowPass(v => !v)}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {showPass
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                }
              </svg>
              {showPass ? 'Hide' : 'Show'}
            </button>
          </div>
          <input
            type={showPass ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        

{/* log in to welcome page */}
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Logging in…' : 'Log In' }
        </button> 

      </form>

      <div className="links-row">
        <Link to="/forgot">Forgot password?</Link>
        <Link to="/signup">Can't log in?</Link>
      </div>
    </AuthCard>
  )
}