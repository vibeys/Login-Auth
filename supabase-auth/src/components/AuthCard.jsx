export function AuthCard({ children }) {
  return (
    <div className="auth-page">
      <div className="auth-logo">A</div>
      <div className="auth-card">{children}</div>
      <p className="auth-footer">© {new Date().getFullYear()} Auth Practice. All rights reserved.</p>
    </div>
  )
}

export function StepTrack({ total = 3, current = 1, done = 0 }) {
  return (
    <div className="step-track">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`step-dot ${i < done ? 'done' : i === current - 1 ? 'active' : ''}`}
        />
      ))}
    </div>
  )
}