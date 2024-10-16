import ReactDOM from 'react-dom/client'
import './remove.css'
import './globals.css'
import { StrictMode } from 'react'
import Main from './pages/main'
import { AuthProvider } from './providers/AuthProvider'
import { ThemeProvider } from './providers/ThemeProvider'
import { Toaster } from 'sonner'
import { HelmetProvider } from 'react-helmet-async'
import { WeightsProvider } from './providers/WeightsProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <ThemeProvider>
          <WeightsProvider>
            <Toaster position="top-center" richColors />
            <Main />
          </WeightsProvider>
        </ThemeProvider>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>
)
