import { useMutation } from '@tanstack/react-query'
import { fileApi, type FileUploadPayload } from '@/api/file'
import toast from 'react-hot-toast'

interface UploadFileParams {
    file: File
}

export function useFileUpload() {
    return useMutation({
        mutationFn: async ({ file }: UploadFileParams) => {
            // Step 1: Get presigned URL from backend
            const payload: FileUploadPayload = {
                fileName: file.name,
                fileType: file.type,
            }
            const response = await fileApi.getUploadUrl(payload)

            // Step 2: Upload file directly to S3 using presigned URL
            await fileApi.uploadToS3(response.data.uploadUrl, file)

            return response.data
        },
        onSuccess: () => {
            toast.success('File uploaded successfully!')
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'File upload failed')
        },
    })
}
