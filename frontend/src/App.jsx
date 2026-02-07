import LoginPage from './components/Auth/SignUpPage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';

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