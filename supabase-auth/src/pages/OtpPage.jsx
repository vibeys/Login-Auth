import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { AuthCard, StepTrack } from '../components/AuthCard'
import { Alert } from '../components/Alert'
import { OtpInput } from '../components/OtpInput'

export default function OtpPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const email    = location.state?.email

  const [otp,       setOtp]       = useState('')
  const [status,    setStatus]    = useState('')  // '' | 'success' | 'error'
  const [error,     setError]     = useState('')
  const [loading,   setLoading]   = useState(false)
  const [resending, setResending] = useState(false)
  const [timer,     setTimer]     = useState(60)

  useEffect(() => { if (!email) navigate('/forgot') }, [email, navigate])

  useEffect(() => {
    if (timer <= 0) return
    const id = setInterval(() => setTimer(t => t - 1), 1000)
    return () => clearInterval(id)
  }, [timer])

  // auto-verify when all 8 digits are entered
  useEffect(() => {
    if (otp.length === 8 && status === '') {
      handleVerify(otp)
    }
  }, [otp])

  const handleVerify = async (code) => {
    setError('')
    setLoading(true)
    const { error } = await supabase.auth.verifyOtp({ email, token: code, type: 'recovery' })
    setLoading(false)

    if (error) {
      setStatus('error')
      setError(error.message)
      // reset after shake animation so user can retry
      setTimeout(() => {
        setStatus('')
        setOtp('')
      }, 600)
      return
    }

    setStatus('success')
    setTimeout(() => navigate('/new-password'), 800)
  }

  const handleResend = async () => {
    setResending(true)
    await supabase.auth.resetPasswordForEmail(email)
    setResending(false)
    setTimer(60)
    setOtp('')
    setStatus('')
    setError('')
  }

  return (
    <AuthCard>
      <StepTrack total={3} current={2} done={1} />
      <h1>Enter code</h1>
      <p className="auth-subtitle">
        We sent an 8-digit code to <strong>{email}</strong>
      </p>

      <Alert type="error" message={error} />

      <OtpInput value={otp} onChange={setOtp} status={status} />

      {loading && (
        <p style={{ textAlign: 'center', fontSize: '13px', color: '#007c6e', marginBottom: '12px' }}>
          Verifying…
        </p>
      )}

      <div className="resend-row">
        {timer > 0
          ? <span>Resend code in <strong>{timer}s</strong></span>
          : <button onClick={handleResend} disabled={resending}>
              {resending ? 'Sending…' : 'Resend code'}
            </button>
        }
      </div>

      <div className="links-row">
        <Link to="/forgot">← Change email</Link>
      </div>
    </AuthCard>
  )
}