import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSignin } from '@/hooks/useAuth'
import OAuthButtons from '@/components/OAuthButtons'

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const signin = useSignin()
    const navigate = useNavigate()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        signin.mutate(
            { email, password },
            {
                onSuccess: (data) => {
                    if (data.data?.twoFactorRequired) {
                        // 2FA enabled — redirect to OTP page
                        navigate('/verify-otp', { state: { email, verificationType: 'Signin' } })
                    } else {
                        navigate('/dashboard')
                    }
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
                        <h1>Welcome back</h1>
                        <p>Sign in to your Storex account</p>
                    </div>

                    <form onSubmit={handleSubmit} id="signin-form">
                        <div className="form-group">
                            <label htmlFor="signin-email" className="form-label">Email Address</label>
                            <input
                                id="signin-email"
                                type="email"
                                className="form-input"
                                placeholder="john@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="signin-password" className="form-label">Password</label>
                            <input
                                id="signin-password"
                                type="password"
                                className="form-input"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div style={{ textAlign: 'right', marginBottom: '20px' }}>
                            <Link to="/forgot-password" style={{ fontSize: '13px' }}>
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-full btn-lg"
                            disabled={signin.isPending}
                            id="signin-submit"
                        >
                            {signin.isPending ? (
                                <>
                                    <span className="spinner" />
                                    Signing in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    <OAuthButtons />

                    <div className="auth-footer">
                        Don't have an account? <Link to="/signup">Create one</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
