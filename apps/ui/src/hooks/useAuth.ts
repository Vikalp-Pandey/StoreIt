import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authApi, type SignupPayload, type SigninPayload, type VerifyOTPPayload, type ForgotPasswordPayload, type ResetPasswordPayload } from '@/api/auth'
import toast from 'react-hot-toast'

export function useSignup() {
    return useMutation({
        mutationFn: (payload: SignupPayload) => authApi.signup(payload),
        onSuccess: (data) => {
            toast.success(data.message || 'OTP sent to your email!')
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'Signup failed')
        },
    })
}

export function useSignin() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (payload: SigninPayload) => authApi.signin(payload),
        onSuccess: (data) => {
            if (data.data?.twoFactorRequired) {
                toast.success('OTP sent to your email for 2FA verification')
            } else {
                toast.success('Signed in successfully!')
                queryClient.invalidateQueries({ queryKey: ['user'] })
            }
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'Sign in failed')
        },
    })
}

export function useLogout() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: () => authApi.logout(),
        onSuccess: () => {
            queryClient.clear()
            toast.success('Logged out successfully')
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'Logout failed')
        },
    })
}

export function useVerifyOTP() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (payload: VerifyOTPPayload) => authApi.verifyOTP(payload),
        onSuccess: (data) => {
            toast.success(data.message || 'OTP verified!')
            queryClient.invalidateQueries({ queryKey: ['user'] })
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'Invalid OTP')
        },
    })
}

export function useForgotPassword() {
    return useMutation({
        mutationFn: (payload: ForgotPasswordPayload) => authApi.forgotPassword(payload),
        onSuccess: (data) => {
            toast.success(data.message || 'Reset link sent to your email')
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'Failed to send reset link')
        },
    })
}

export function useResetPassword() {
    return useMutation({
        mutationFn: (payload: ResetPasswordPayload) => authApi.resetPassword(payload),
        onSuccess: (data) => {
            toast.success(data.message || 'Password reset successfully!')
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'Password reset failed')
        },
    })
}
