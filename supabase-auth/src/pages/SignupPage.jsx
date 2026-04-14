import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { AuthCard } from '../components/AuthCard'
import { Alert } from '../components/Alert'
import { PasswordStrength } from '../components/PasswordStrength'

export default function SignupPage() {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [confirm,  setConfirm]  = useState('')
  const [error,    setError]    = useState('')
  const [success,  setSuccess]  = useState(false)
  const [loading,  setLoading]  = useState(false)

  const handleSignup = async (e) => {
    e.preventDefault()
    setError('')
    if (password !== confirm) return setError('Passwords do not match.')
    if (password.length < 8)  return setError('Password must be at least 8 characters.')
    setLoading(true)
    const { error } = await supabase.auth.signUp({ email, password })
    setLoading(false)
    if (error) return setError(error.message)
    setSuccess(true)
  }

  if (success) {
    return (
      <AuthCard>
        <div className="text-center">
          <div className="success-icon">✓</div>
          <h1>Check your email</h1>
          <p className="auth-subtitle">
            We sent a confirmation link to <strong>{email}</strong>.
          </p>
          <Link to="/">Back to log in</Link>
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard>
      <h1>Create account</h1>
      <p className="auth-subtitle">
        Already have one? <Link to="/">Log in</Link>
      </p>

      <Alert type="error" message={error} />

      <form onSubmit={handleSignup}>
        <div className="field">
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required autoFocus />
        </div>
        <div className="field">
          <label>Password</label>
          <input type="password" placeholder="Min. 8 characters" value={password} onChange={e => setPassword(e.target.value)} required />
          <PasswordStrength password={password} />
        </div>
        <div className="field">
          <label>Confirm Password</label>
          <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required />
          {confirm && password !== confirm && <p className="hint-error">Passwords don't match</p>}
        </div>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Creating…' : 'Create Account'}
        </button>
      </form>
    </AuthCard>
  )
}