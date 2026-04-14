import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { AuthCard, StepTrack } from '../components/AuthCard'
import { Alert } from '../components/Alert'
import { PasswordStrength } from '../components/PasswordStrength'

export default function NewPasswordPage() {
  const navigate   = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm,  setConfirm]  = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  const strength = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length

  const handleUpdate = async (e) => {
    e.preventDefault()
    setError('')
    if (password !== confirm) return setError('Passwords do not match.')
    if (password.length < 8)  return setError('Password must be at least 8 characters.')
    if (strength < 2)         return setError('Please choose a stronger password.')
    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password })
    setLoading(false)
    if (error) return setError(error.message)
    navigate('/success')
  }

  return (
    <AuthCard>
      <StepTrack total={3} current={3} done={2} />
      <h1>New password</h1>
      <p className="auth-subtitle">Choose a strong password for your account.</p>

      <Alert type="error" message={error} />

      <form onSubmit={handleUpdate}>
        <div className="field">
          <label>New Password</label>
          <input type="password" placeholder="Min. 8 characters" value={password} onChange={e => setPassword(e.target.value)} required autoFocus />
          <PasswordStrength password={password} />
        </div>
        <div className="field">
          <label>Confirm Password</label>
          <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required />
          {confirm && password !== confirm && <p className="hint-error">Passwords don't match</p>}
        </div>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Saving…' : 'Save New Password'}
        </button>
      </form>
    </AuthCard>
  )
}