import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/shared/config/index.css'
import { App } from '@/app'
import { QueryProvider } from './shared/api/query'
import { AuthProvider } from './app/providers/auth-provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <QueryProvider>
        <App />
      </QueryProvider>
    </AuthProvider>
  </StrictMode>,
)
