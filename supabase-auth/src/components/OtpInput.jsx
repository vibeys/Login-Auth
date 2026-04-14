import { useRef } from 'react'

export function OtpInput({ value = '', onChange, status = '' }) {
  const inputs = useRef([])
  const digits = value.split('').concat(Array(8).fill('')).slice(0, 8)

  const update = (index, char) => {
    const next = [...digits]
    next[index] = char.replace(/\D/g, '').slice(-1)
    onChange(next.join(''))
    if (char && index < 7) inputs.current[index + 1]?.focus()
  }

  const handleKey = (e, index) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0)
      inputs.current[index - 1]?.focus()
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 8)
    onChange(pasted.padEnd(8, '').slice(0, 8))
    inputs.current[Math.min(pasted.length, 7)]?.focus()
  }

  return (
    <div className={`otp-grid ${status}`}>
      {digits.map((d, i) => (
        <input
          key={i}
          ref={el => (inputs.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={d}
          onChange={e => update(i, e.target.value)}
          onKeyDown={e => handleKey(e, i)}
          onPaste={handlePaste}
          disabled={status === 'success'}
        />
      ))}
    </div>
  )
}