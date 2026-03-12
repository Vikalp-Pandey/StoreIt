import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useForgotPassword } from '@/hooks/useAuth'

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [sent, setSent] = useState(false)
    const forgotPassword = useForgotPassword()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        forgotPassword.mutate(
            { email },
            {
                onSuccess: () => setSent(true),
            }
        )
    }

    return (
        <div className="auth-layout">
            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <div className="auth-logo">S</div>
                        <h1>Forgot Password?</h1>
                        <p>No worries, we'll send you a reset link</p>
                    </div>

                    {sent ? (
                        <div style={{ textAlign: 'center' }}>
                            <div
                                style={{
                                    width: '64px',
                                    height: '64px',
                                    borderRadius: '50%',
                                    background: 'rgba(52, 211, 153, 0.12)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 20px',
                                    fontSize: '28px',
                                }}
                            >
                                ✓
                            </div>
                            <h2 style={{ fontSize: '20px', marginBottom: '12px' }}>Check your email</h2>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
                                We sent a password reset link to{' '}
                                <strong style={{ color: 'var(--color-primary-hover)' }}>{email}</strong>
                            </p>
                            <Link to="/signin" className="btn btn-secondary btn-full">
                                ← Back to Sign In
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} id="forgot-password-form">
                            <div className="form-group">
                                <label htmlFor="forgot-email" className="form-label">Email Address</label>
                                <input
                                    id="forgot-email"
                                    type="email"
                                    className="form-input"
                                    placeholder="john@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary btn-full btn-lg"
                                disabled={forgotPassword.isPending}
                                id="forgot-password-submit"
                            >
                                {forgotPassword.isPending ? (
                                    <>
                                        <span className="spinner" />
                                        Sending...
                                    </>
                                ) : (
                                    'Send Reset Link'
                                )}
                            </button>
                        </form>
                    )}

                    {!sent && (
                        <div className="auth-footer">
                            <Link to="/signin">← Back to Sign In</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
