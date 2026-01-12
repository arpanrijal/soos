import LoginPage from '../src/components/Auth/LoginPage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import Dashboard from './components/UI/Dashboard';

const App = () => {
  return (
    <>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
    <LoginPage />
    <ToastContainer /> 
    </GoogleOAuthProvider>
    </>
  )
}

export default App