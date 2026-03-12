import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from '@/components/Layout'
import ProtectedRoute from '@/components/ProtectedRoute'
import PublicRoute from '@/components/PublicRoute'
import SignIn from '@/pages/SignIn'
import SignUp from '@/pages/SignUp'
import VerifyOTP from '@/pages/VerifyOTP'
import ForgotPassword from '@/pages/ForgotPassword'
import ResetPassword from '@/pages/ResetPassword'
import Dashboard from '@/pages/Dashboard'
import FileUpload from '@/pages/FileUpload'

function App() {
    return (
        <Routes>
            {/* Public routes — redirect to dashboard if already logged in */}
            <Route element={<PublicRoute />}>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/verify-otp" element={<VerifyOTP />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
            </Route>

            {/* Protected routes — redirect to signin if not authenticated */}
            <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/upload" element={<FileUpload />} />
                </Route>
            </Route>

            {/* Default redirect */}
            <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
    )
}

export default App
