import { Navigate, Outlet } from 'react-router-dom'
import { useUserStatus } from '@/hooks/useUser'

export default function ProtectedRoute() {
    const { data: user, isLoading, isError } = useUserStatus()

    if (isLoading) {
        return (
            <div className="loading-screen">
                <div className="spinner spinner-lg spinner-primary" />
                <p>Loading your workspace...</p>
            </div>
        )
    }

    if (isError || !user) {
        return <Navigate to="/signin" replace />
    }

    return <Outlet />
}
