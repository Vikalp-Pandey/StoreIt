import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSignup } from '@/hooks/useAuth'
import OAuthButtons from '@/components/OAuthButtons'

export default function SignUp() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const signup = useSignup()
    const navigate = useNavigate()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        signup.mutate(
            { name, email, password },
            {
                onSuccess: () => {
                    // Navigate to OTP page with email context
                    navigate('/verify-otp', { state: { email, verificationType: 'Signup' } })
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
                        <h1>Create your account</h1>
                        <p>Start your journey with Storex</p>
                    </div>

                    <form onSubmit={handleSubmit} id="signup-form">
                        <div className="form-group">
                            <label htmlFor="signup-name" className="form-label">Full Name</label>
                            <input
                                id="signup-name"
                                type="text"
                                className="form-input"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="signup-email" className="form-label">Email Address</label>
                            <input
                                id="signup-email"
                                type="email"
                                className="form-input"
                                placeholder="john@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="signup-password" className="form-label">Password</label>
                            <input
                                id="signup-password"
                                type="password"
                                className="form-input"
                                placeholder="Create a strong password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                            />
                            <p className="form-hint">Must be at least 6 characters long</p>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-full btn-lg"
                            disabled={signup.isPending}
                            id="signup-submit"
                        >
                            {signup.isPending ? (
                                <>
                                    <span className="spinner" />
                                    Creating account...
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    <OAuthButtons />

                    <div className="auth-footer">
                        Already have an account? <Link to="/signin">Sign in</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
