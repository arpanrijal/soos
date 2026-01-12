import { GoogleLogin } from '@react-oauth/google'
import Taskmanagement from '../TaskManageComponent/Taskmanagement.jsx'
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Dashboard from '../UI/Dashboard.jsx';


const Login = () => {

  const loginErrorMSG = () => toast('Login Failed')
  const loginSucessMSG = () => toast('Sucessfully Login')

  return (
    <>
      <div className='items-center justify-start mt-32 flex flex-col h-screen w-screen'>
        <div className='flex flex-col w-[65%] items-center justify-center '>
          <div className='font-normal text-4xl pb-8'>Welcome Back</div>
          <form action="" className='flex flex-col w-full items-center'>
            <input type="text" required className='p-3 border-2 rounded-3xl w-[60%] max-w-sm' placeholder='Email Address' />
            <button className='p-[12px] bg-black text-white font-medium my-3 rounded-3xl w-[60%] max-w-sm'>Continue</button>
          </form>
          <h3 className='pt-2 pb-8 font-medium'>Don't have an account? <span className='font-medium text-blue-600 underline cursor-pointer py-2'>Sign Up</span></h3>
          <div className='flex items-center pb-8'>
            <div className='w-16 border-t-2'></div>
            <div className='font-medium px-4'>OR</div>
            <div className='w-16 border-t-2'></div>
          </div>
          <GoogleLogin
            onSuccess={
              (credentialResponse) => {
                const token = credentialResponse.credential
                const sendGoogleCtedential = fetch(`${import.meta.env.VITE_BACKEND_URL}/signup/google`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    userToken: token
                  }),
                }).then(response => {
                  if (response.ok) {
                    loginSucessMSG();
                    <Dashboard />
                    return response.json();
                  }
                }).catch(err => {
                  console.error("Error in Google Login: ", err)
                })
              }
            }
            onError={() => {
              loginErrorMSG();
            }} />
        </div>
      </div>
    </>
  )
}

export default Login

// console.log("credentialResponse: ", credentialResponse)
// console.log("Decoded credentialResponse: ", decode)//this has info
//aud: "507987645900-k5gbh4gnap7gsp2ki8efeqi75hoq7jh9.apps.googleusercontent.com"
// azp: "507987645900-k5gbh4gnap7gsp2ki8efeqi75hoq7jh9.apps.googleusercontent.com"
// email: "justforemerg@gmail.com"
// email_verified: true
// exp: 1758903812
// given_name: "justforemerg"
// iat: 1758900212
// iss: "https://accounts.google.com"
// jti: "e868d11a7b46eba3d6f70995c90ee77e0a94b2b6"
// name: "justforemerg"
// nbf: 1758899912
// picture: "https://lh3.googleusercontent.com/a/ACg8ocJYa1kNx61ClI4uKP-bcUSUK-Rnty0otLbMGfEhU7QMt9br2Q=s96-c"
// sub: "118054237428332846262"