import { useQuery } from '@tanstack/react-query'
import { authApi } from '@/api/auth'

export function useUserStatus() {
    return useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await authApi.getUser()
            return response.data?.user ?? null
        },
        retry: false,
        staleTime: 5 * 60 * 1000,
    })
}
