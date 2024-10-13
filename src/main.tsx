import ReactDOM from 'react-dom/client'
import './remove.css'
import './globals.css'
import { StrictMode } from 'react'
import Main from './pages/main'
import { AuthProvider } from './providers/AuthProvider'
import { ThemeProvider } from './providers/ThemeProvider'
import { Toaster } from 'sonner'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <Toaster position="top-center" richColors />
        <Main />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
)
