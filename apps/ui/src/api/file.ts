import apiClient from './client'
import axios from 'axios'

export interface FileUploadPayload {
    fileName: string
    fileType: string
}

export interface UploadUrlResponse {
    statusCode: number
    message: string
    data: {
        uploadUrl: string
        fileUrl: string
    }
}

export const fileApi = {
    getUploadUrl: async (payload: FileUploadPayload): Promise<UploadUrlResponse> => {
        const { data } = await apiClient.post('/file-upload', payload)
        return data
    },

    uploadToS3: async (uploadUrl: string, file: File): Promise<void> => {
        await axios.put(uploadUrl, file, {
            headers: {
                'Content-Type': file.type,
            },
        })
    },
}
