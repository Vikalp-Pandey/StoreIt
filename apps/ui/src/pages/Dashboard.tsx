import { useUserStatus } from '@/hooks/useUser'
import { User, Mail, Shield, Calendar, HardDrive } from 'lucide-react'

export default function Dashboard() {
    const { data: user } = useUserStatus()

    const initial = user?.name?.charAt(0)?.toUpperCase() || 'U'
    const memberSince = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        : '—'

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <h1>Dashboard</h1>
                <p>Welcome back, {user?.name || 'User'}! Here's your account overview.</p>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                <div className="stat-card" style={{ animationDelay: '0.1s' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <div className="stat-label">Account Type</div>
                            <div className="stat-value primary">{user?.accountType || 'Local'}</div>
                        </div>
                        <div className="card-icon primary">
                            <HardDrive size={20} />
                        </div>
                    </div>
                </div>

                <div className="stat-card" style={{ animationDelay: '0.2s' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <div className="stat-label">Two-Factor Auth</div>
                            <div className={`stat-value ${user?.twoFactorEnabled ? 'success' : 'accent'}`}>
                                {user?.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                            </div>
                        </div>
                        <div className={`card-icon ${user?.twoFactorEnabled ? 'success' : 'accent'}`}>
                            <Shield size={20} />
                        </div>
                    </div>
                </div>

                <div className="stat-card" style={{ animationDelay: '0.3s' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <div className="stat-label">Member Since</div>
                            <div className="stat-value accent" style={{ fontSize: '18px' }}>{memberSince}</div>
                        </div>
                        <div className="card-icon accent">
                            <Calendar size={20} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Card */}
            <div className="card" style={{ maxWidth: '600px' }}>
                <div className="card-header">
                    <h2 className="card-title">Profile Information</h2>
                    <span className={`badge ${user?.twoFactorEnabled ? 'badge-success' : 'badge-warning'}`}>
                        {user?.twoFactorEnabled ? '2FA Active' : '2FA Inactive'}
                    </span>
                </div>

                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '24px' }}>
                    <div className="avatar avatar-lg">{initial}</div>
                    <div>
                        <h3 style={{ fontSize: '18px', marginBottom: '4px' }}>{user?.name || 'User'}</h3>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>{user?.email || ''}</p>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(99, 102, 241, 0.05)', borderRadius: 'var(--radius-sm)' }}>
                        <User size={18} style={{ color: 'var(--color-text-muted)' }} />
                        <div>
                            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '2px' }}>Name</div>
                            <div style={{ fontSize: '14px', fontWeight: 500 }}>{user?.name || '—'}</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(99, 102, 241, 0.05)', borderRadius: 'var(--radius-sm)' }}>
                        <Mail size={18} style={{ color: 'var(--color-text-muted)' }} />
                        <div>
                            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '2px' }}>Email</div>
                            <div style={{ fontSize: '14px', fontWeight: 500 }}>{user?.email || '—'}</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(99, 102, 241, 0.05)', borderRadius: 'var(--radius-sm)' }}>
                        <Shield size={18} style={{ color: 'var(--color-text-muted)' }} />
                        <div>
                            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '2px' }}>Security</div>
                            <div style={{ fontSize: '14px', fontWeight: 500 }}>
                                {user?.twoFactorEnabled ? '2FA Enabled ✓' : '2FA Not Enabled'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
