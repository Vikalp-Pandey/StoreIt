import { useState, useRef, type FormEvent, type KeyboardEvent } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useVerifyOTP } from '@/hooks/useAuth'

export default function VerifyOTP() {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(''))
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])
    const verifyOTP = useVerifyOTP()
    const navigate = useNavigate()
    const location = useLocation()

    const email = location.state?.email || ''
    const verificationType = location.state?.verificationType || 'Signup'

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return // Only digits

        const newOtp = [...otp]
        newOtp[index] = value.slice(-1) // Take last digit
        setOtp(newOtp)

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
        const newOtp = [...otp]
        for (let i = 0; i < pastedData.length; i++) {
            newOtp[i] = pastedData[i]
        }
        setOtp(newOtp)
        // Focus last filled or next empty
        const focusIndex = Math.min(pastedData.length, 5)
        inputRefs.current[focusIndex]?.focus()
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        const otpString = otp.join('')
        if (otpString.length !== 6) return

        verifyOTP.mutate(
            { otp: otpString },
            {
                onSuccess: () => {
                    navigate('/dashboard')
                },
            }
        )
    }

    return (
        <div className="auth-layout">
            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <div className="auth-logo">S</div>
                        <h1>Verify Your Email</h1>
                        <p>
                            We sent a 6-digit code to{' '}
                            <strong style={{ color: 'var(--color-primary-hover)' }}>
                                {email || 'your email'}
                            </strong>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} id="verify-otp-form">
                        <div className="otp-input-group" onPaste={handlePaste}>
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => { inputRefs.current[index] = el }}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    className="otp-input"
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    id={`otp-input-${index}`}
                                    autoFocus={index === 0}
                                />
                            ))}
                        </div>

                        <p className="form-hint" style={{ textAlign: 'center', marginBottom: '24px' }}>
                            {verificationType === 'Signin'
                                ? 'Enter the OTP sent for two-factor authentication'
                                : 'Enter the OTP to verify your signup'}
                        </p>

                        <button
                            type="submit"
                            className="btn btn-primary btn-full btn-lg"
                            disabled={verifyOTP.isPending || otp.join('').length !== 6}
                            id="verify-otp-submit"
                        >
                            {verifyOTP.isPending ? (
                                <>
                                    <span className="spinner" />
                                    Verifying...
                                </>
                            ) : (
                                'Verify OTP'
                            )}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <Link to="/signin">← Back to Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
