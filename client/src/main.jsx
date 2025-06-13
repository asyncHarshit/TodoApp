
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import TaskManagerProvider from './context/contextApi'
createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <TaskManagerProvider>
    <Toaster richColors position="top-right" />
    <App/>
    </TaskManagerProvider>
  </BrowserRouter>

  
 
)
