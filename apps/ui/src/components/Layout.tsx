import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useUserStatus } from '@/hooks/useUser'
import { useLogout } from '@/hooks/useAuth'
import { LayoutDashboard, Upload, LogOut } from 'lucide-react'

export default function Layout() {
    const { data: user } = useUserStatus()
    const logout = useLogout()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout.mutate(undefined, {
            onSuccess: () => navigate('/signin'),
        })
    }

    const initial = user?.name?.charAt(0)?.toUpperCase() || 'U'

    return (
        <div className="app-layout">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-logo">
                    <div className="logo-icon">S</div>
                    <h1>Storex</h1>
                </div>

                <nav className="sidebar-nav">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                        id="nav-dashboard"
                    >
                        <LayoutDashboard />
                        Dashboard
                    </NavLink>
                    <NavLink
                        to="/upload"
                        className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                        id="nav-upload"
                    >
                        <Upload />
                        File Upload
                    </NavLink>
                </nav>

                <div className="sidebar-footer">
                    <div className="user-info">
                        <div className="avatar">{initial}</div>
                        <div className="user-info-details">
                            <div className="user-info-name">{user?.name || 'User'}</div>
                            <div className="user-info-email">{user?.email || ''}</div>
                        </div>
                    </div>
                    <button
                        className="sidebar-link"
                        onClick={handleLogout}
                        disabled={logout.isPending}
                        style={{ marginTop: '8px', color: 'var(--color-error)' }}
                        id="logout-btn"
                    >
                        <LogOut />
                        {logout.isPending ? 'Logging out...' : 'Log out'}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="main-content animate-fade-in">
                <Outlet />
            </main>
        </div>
    )
}
