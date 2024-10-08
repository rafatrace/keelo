import ReactDOM from 'react-dom/client'
import './index.css'
import { StrictMode } from 'react'
import Main from './pages/main'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Main />
  </StrictMode>
)
