import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { PdfFilesProvider } from './context/PdfFilesContext.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <PdfFilesProvider>
        <App />
      </PdfFilesProvider>
    </BrowserRouter>
  </StrictMode>,
)
