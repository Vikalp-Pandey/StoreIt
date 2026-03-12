import { Navigate, Outlet } from 'react-router-dom'
import { useUserStatus } from '@/hooks/useUser'

export default function PublicRoute() {
    const { data: user, isLoading } = useUserStatus()

    if (isLoading) {
        return (
            <div className="loading-screen">
                <div className="spinner spinner-lg spinner-primary" />
                <p>Loading...</p>
            </div>
        )
    }

    if (user) {
        return <Navigate to="/dashboard" replace />
    }

    return <Outlet />
}
