export function PasswordStrength({ password }) {
  if (!password) return null

  const score = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length

  const colors = ['#e74c3c', '#e67e22', '#007c6e', '#27ae60']
  const labels = ['Weak', 'Fair', 'Good', 'Strong']
  const color  = colors[score - 1] || '#e0e0e0'

  return (
    <div>
      <div className="strength-bars">
        {[0,1,2,3].map(i => (
          <div
            key={i}
            className="strength-bar"
            style={{ background: i < score ? color : '#e0e0e0' }}
          />
        ))}
      </div>
      <div className="strength-label">{labels[score - 1] || ''}</div>
    </div>
  )
}