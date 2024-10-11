import ReactDOM from 'react-dom/client'
import './remove.css'
import './index.css'
import { StrictMode } from 'react'
import Main from './pages/main'
import { AuthProvider } from './providers/AuthProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <Main />
    </AuthProvider>
  </StrictMode>
)
