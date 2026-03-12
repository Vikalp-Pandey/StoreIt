import apiClient from './client'

export interface SignupPayload {
    name: string
    email: string
    password: string
}

export interface SigninPayload {
    email: string
    password: string
}

export interface VerifyOTPPayload {
    otp: string
}

export interface ForgotPasswordPayload {
    email: string
}

export interface ResetPasswordPayload {
    token: string
    password: string
}

export interface AuthResponse {
    statusCode: number
    message: string
    data?: any
}

export const authApi = {
    signup: async (payload: SignupPayload): Promise<AuthResponse> => {
        const { data } = await apiClient.post('/auth/signup', payload)
        return data
    },

    signin: async (payload: SigninPayload): Promise<AuthResponse> => {
        const { data } = await apiClient.post('/auth/signin', payload)
        return data
    },

    logout: async (): Promise<AuthResponse> => {
        const { data } = await apiClient.post('/auth/logout')
        return data
    },

    verifyOTP: async (payload: VerifyOTPPayload): Promise<AuthResponse> => {
        const { data } = await apiClient.post('/auth/verify-OTP', payload)
        return data
    },

    forgotPassword: async (payload: ForgotPasswordPayload): Promise<AuthResponse> => {
        const { data } = await apiClient.post('/auth/forgot-password', payload)
        return data
    },

    resetPassword: async (payload: ResetPasswordPayload): Promise<AuthResponse> => {
        const { data } = await apiClient.post('/auth/reset-password', payload)
        return data
    },

    getUser: async (): Promise<AuthResponse> => {
        const { data } = await apiClient.get('/auth/me')
        return data
    },
}
