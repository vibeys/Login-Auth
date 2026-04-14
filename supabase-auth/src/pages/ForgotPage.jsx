import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { AuthCard, StepTrack } from '../components/AuthCard'
import { Alert } from '../components/Alert'

export default function ForgotPage() {
  const navigate  = useNavigate()
  const [email,   setEmail]   = useState('')
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    setLoading(false)
    if (error) return setError(error.message)
    navigate('/verify-otp', { state: { email } })
  }

  return (
    <AuthCard>
      <StepTrack total={3} current={1} />
      <h1>Reset password</h1>
      <p className="auth-subtitle">Enter your email and we'll send you a 6-digit code.</p>

      <Alert type="error" message={error} />

      <form onSubmit={handleSend}>
        <div className="field">
          <label>Email address</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required autoFocus />
        </div>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Sending…' : 'Send Code'}
        </button>
      </form>

      <div className="links-row">
        <Link to="/">← Back to log in</Link>
      </div>
    </AuthCard>
  )
}