import { GoogleLogin } from '@react-oauth/google'
import Taskmanagement from '../Dashboard/Taskmanagement.jsx'
import { useEffect, useState} from 'react';
import { Link, Links, useNavigate } from "react-router";


const SignUp = () => {
  const [email, setEmail] = useState("")
  const [password, setpassword] = useState("")
  const [first_data_enter, setfirst_data_enter] = useState(false)
  const[errmsg, seterrmsg] = useState(false)
  const[responsemsg, setresponsemsg] = useState('')
  const nav = useNavigate()
  const formHandler = async (e) => {
    e.preventDefault()
    if (!first_data_enter) {
      setfirst_data_enter(true)
      seterrmsg(false);
      return
    }
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password })
    })
    const responses = await response.json()    
    if(!responses.status){
      setresponsemsg(responses?.errors?.[0]?.msg || responses?.message || 'something went wrong. Error code: x001H')
      seterrmsg(true)
      return
    }
    nav('/')
  }

  return (
    <>
      <div className='items-center justify-start mt-32 flex flex-col h-screen w-screen'>
        <div className='flex flex-col max-w-[550px] w-[80%] items-center justify-center '>
          <div className='font-normal text-3xl pb-8'>Let’s get you started</div>
          <form className='flex flex-col w-full items-center' onSubmit={formHandler}>
            {errmsg && <div className='px-2 py-1 bg-red-200 text-red-500 border-l-4 border-red-600 rounded w-full mb-2'>{responsemsg}</div>}
            {first_data_enter ? //true=password; false=email
              <input
                type="password"
                required
                className='p-3 border-2 rounded-3xl w-full'
                placeholder='Password'
                value={password}
                name='password'
                onChange={(e) => { setpassword(e.target.value) }}
              />
              :
              <input
                type="text"
                required
                className='p-3 border-2 rounded-3xl w-full'
                placeholder='Email Address'
                value={email}
                name='gmail'
                onChange={(e) => { setEmail(e.target.value) }}
              />
            }
            <button className='p-[12px] bg-black text-white font-medium my-3 rounded-3xl w-full' type="submit">{first_data_enter ? "Submit" : "Continue"}</button>
            {first_data_enter && <button className='p-[9px] bg-transparent border-2 text-black font-medium mb-3 rounded-3xl w-full' type="button" onClick={() => {
              setfirst_data_enter(false); seterrmsg(false);
            }}>Back</button>}
          </form>
          <h3 className='pt-2 pb-8 font-medium'>Already have an account? <span className='font-medium text-blue-600 underline cursor-pointer py-2'><Link to="/login">Login</Link></span></h3>
          <div className='flex items-center pb-8'>
            <div className='w-16 border-t-2'></div>
            <div className='font-medium px-4'>OR</div>
            <div className='w-16 border-t-2'></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp

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