import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import FileUploadmanagement from './components/Dashboard/FileUploadmanagement.jsx'
import About from './components/Dashboard/About.jsx'
import Contact from './components/Dashboard/Contact.jsx'
import Notfoundpage from './components/UI/Nopagefound/Notfoundpage.jsx'
import Taskmanagement from './components/Dashboard/Taskmanagement.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './components/Auth/SignUpPage.jsx'
import Login from './components/Auth/LoginPage.jsx'
import Routeprotector from './components/Dashboard/Routeprotector.jsx'

const router = createBrowserRouter([
  { path: '/', element: <Taskmanagement /> },
  { path: '/file-transfer', element: <FileUploadmanagement /> },
  { path: '/about', element: <About /> },
  { path: '/contact', element: <Contact /> },
  { path: '*', element: <Notfoundpage /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
