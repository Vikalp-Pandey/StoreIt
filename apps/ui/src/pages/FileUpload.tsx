import { useState, useRef, type DragEvent } from 'react'
import { useFileUpload } from '@/hooks/useFile'
import { Upload, FileText, CheckCircle, XCircle } from 'lucide-react'

interface UploadedFile {
    name: string
    fileUrl: string
    status: 'success' | 'error'
}

export default function FileUpload() {
    const [isDragging, setIsDragging] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)
    const fileUpload = useFileUpload()

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e: DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (e: DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        const file = e.dataTransfer.files[0]
        if (file) setSelectedFile(file)
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) setSelectedFile(file)
    }

    const handleUpload = () => {
        if (!selectedFile) return

        fileUpload.mutate(
            { file: selectedFile },
            {
                onSuccess: (data) => {
                    setUploadedFiles((prev) => [
                        { name: selectedFile.name, fileUrl: data.fileUrl, status: 'success' },
                        ...prev,
                    ])
                    setSelectedFile(null)
                    if (fileInputRef.current) fileInputRef.current.value = ''
                },
                onError: () => {
                    setUploadedFiles((prev) => [
                        { name: selectedFile.name, fileUrl: '', status: 'error' },
                        ...prev,
                    ])
                },
            }
        )
    }

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    }

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <h1>File Upload</h1>
                <p>Upload files securely to cloud storage via S3</p>
            </div>

            {/* Dropzone */}
            <div
                className={`dropzone ${isDragging ? 'active' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                id="file-dropzone"
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                    id="file-input"
                />
                <div className="dropzone-icon">
                    <Upload size={28} />
                </div>
                <h3>
                    {isDragging ? 'Drop your file here' : 'Click or drag file to upload'}
                </h3>
                <p>Supports all file types</p>
            </div>

            {/* Selected File Preview */}
            {selectedFile && (
                <div className="card" style={{ marginTop: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div className="card-icon primary">
                                <FileText size={20} />
                            </div>
                            <div>
                                <div style={{ fontWeight: 600, fontSize: '14px' }}>{selectedFile.name}</div>
                                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                                    {formatFileSize(selectedFile.size)} • {selectedFile.type || 'Unknown type'}
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                                className="btn btn-ghost btn-sm"
                                onClick={() => {
                                    setSelectedFile(null)
                                    if (fileInputRef.current) fileInputRef.current.value = ''
                                }}
                                id="remove-file-btn"
                            >
                                Remove
                            </button>
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={handleUpload}
                                disabled={fileUpload.isPending}
                                id="upload-file-btn"
                            >
                                {fileUpload.isPending ? (
                                    <>
                                        <span className="spinner" />
                                        Uploading...
                                    </>
                                ) : (
                                    'Upload'
                                )}
                            </button>
                        </div>
                    </div>

                    {fileUpload.isPending && (
                        <div className="progress-bar-wrapper">
                            <div className="progress-bar-fill" style={{ width: '60%' }} />
                        </div>
                    )}
                </div>
            )}

            {/* Upload History */}
            {uploadedFiles.length > 0 && (
                <div style={{ marginTop: '32px' }}>
                    <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>Upload History</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {uploadedFiles.map((file, index) => (
                            <div
                                key={index}
                                className="card"
                                style={{ padding: '16px 20px' }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    {file.status === 'success' ? (
                                        <CheckCircle size={20} style={{ color: 'var(--color-success)' }} />
                                    ) : (
                                        <XCircle size={20} style={{ color: 'var(--color-error)' }} />
                                    )}
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 500, fontSize: '14px' }}>{file.name}</div>
                                        {file.fileUrl && (
                                            <a
                                                href={file.fileUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ fontSize: '12px' }}
                                            >
                                                View file →
                                            </a>
                                        )}
                                    </div>
                                    <span className={`badge ${file.status === 'success' ? 'badge-success' : 'badge-error'}`}>
                                        {file.status === 'success' ? 'Uploaded' : 'Failed'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
