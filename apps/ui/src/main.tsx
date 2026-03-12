import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './index.css'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: 5 * 60 * 1000,
        },
    },
})

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <App />
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 4000,
                        style: {
                            background: 'rgba(15, 23, 42, 0.95)',
                            color: '#e2e8f0',
                            border: '1px solid rgba(99, 102, 241, 0.3)',
                            backdropFilter: 'blur(12px)',
                            borderRadius: '12px',
                            fontSize: '14px',
                        },
                        success: {
                            iconTheme: { primary: '#34d399', secondary: '#0f172a' },
                        },
                        error: {
                            iconTheme: { primary: '#f87171', secondary: '#0f172a' },
                        },
                    }}
                />
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>,
)
