import { useState, type FormEvent } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import { useResetPassword } from '@/hooks/useAuth'

export default function ResetPassword() {
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token') || ''
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const resetPassword = useResetPassword()
    const navigate = useNavigate()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        setError('')

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters')
            return
        }

        resetPassword.mutate(
            { token, password },
            {
                onSuccess: () => {
                    navigate('/signin')
                },
            }
        )
    }

    if (!token) {
        return (
            <div className="auth-layout">
                <div className="auth-container">
                    <div className="auth-card" style={{ textAlign: 'center' }}>
                        <div className="auth-header">
                            <div className="auth-logo">S</div>
                            <h1>Invalid Link</h1>
                            <p>This password reset link is invalid or has expired.</p>
                        </div>
                        <Link to="/forgot-password" className="btn btn-primary btn-full">
                            Request New Link
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="auth-layout">
            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <div className="auth-logo">S</div>
                        <h1>Set New Password</h1>
                        <p>Create a new password for your account</p>
                    </div>

                    <form onSubmit={handleSubmit} id="reset-password-form">
                        <div className="form-group">
                            <label htmlFor="reset-password" className="form-label">New Password</label>
                            <input
                                id="reset-password"
                                type="password"
                                className="form-input"
                                placeholder="Enter new password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="reset-confirm-password" className="form-label">Confirm Password</label>
                            <input
                                id="reset-confirm-password"
                                type="password"
                                className={`form-input ${error ? 'error' : ''}`}
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            {error && <p className="form-error">{error}</p>}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-full btn-lg"
                            disabled={resetPassword.isPending}
                            id="reset-password-submit"
                        >
                            {resetPassword.isPending ? (
                                <>
                                    <span className="spinner" />
                                    Resetting...
                                </>
                            ) : (
                                'Reset Password'
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
