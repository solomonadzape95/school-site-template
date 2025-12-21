import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
// import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <div className="w-screen h-screen bg-white pointer-events-none"></div>
  </StrictMode>,
)
