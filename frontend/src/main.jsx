import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import FileUploadmanagement from './components/TaskManageComponent/FileUploadmanagement.jsx'
import About from './components/TaskManageComponent/About.jsx'
import Contact from './components/TaskManageComponent/Contact.jsx'
import Notfoundpage from './components/UI/Nopagefound/Notfoundpage.jsx'
import Dashboard from './components/UI/Dashboard.jsx'
import Taskmanagement from './components/TaskManageComponent/Taskmanagement.jsx'
import LoadingAnimation from './components/UI/InputBox/LoadingAnimation.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  { path: '/', element: <Taskmanagement /> },
  { path: '/file-transfer', element: <FileUploadmanagement /> },
  { path: '/about', element: <About /> },
  { path: '/contact', element: <Contact /> },
  { path: '/about/:id', element: <Dashboard /> },
  { path: '/about/:admininfo', element: <App /> },
  { path: '*', element: <Notfoundpage /> },
  { path: '/animation', element: <LoadingAnimation /> },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
