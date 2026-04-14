import { Link } from 'react-router-dom'
import { AuthCard } from '../components/AuthCard'

export default function SuccessPage() {
  return (
    <AuthCard>
      <div className="text-center">
        <div className="success-icon">✓</div>
        <h1>Password updated!</h1>
        <p className="auth-subtitle">
          Your password has been changed.<br />You can now log in.
        </p>
        <Link to="/">
          <button className="btn-primary">Go to Log in</button>
        </Link>
      </div>
    </AuthCard>
  )
}