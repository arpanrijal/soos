import { useEffect, useState} from 'react';
import { Link, Links, useNavigate } from "react-router";
const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setpassword] = useState("")
  const [first_data_enter, setfirst_data_enter] = useState(false)
  const[errmsg, seterrmsg] = useState(false)
  const nav = useNavigate()
  const formHandler = async (e) => {
    e.preventDefault()
    if (!first_data_enter) {
      setfirst_data_enter(true)
      seterrmsg(false);
      return
    }
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password })
    })
    if (!response.status) {
      seterrmsg(true)
      return
    }
    nav('/')
  }

  return (
    <>
      <div className='items-center justify-start mt-32 flex flex-col h-screen w-screen'>
        <div className='flex flex-col max-w-[550px] w-[80%] items-center justify-center '>
          <div className='font-normal text-3xl pb-8'>Welcome Back 👋</div>
          <form className='flex flex-col w-full items-center' onSubmit={formHandler}>
            {errmsg && <div className='px-2 py-1 bg-red-200 text-red-500 border-l-4 border-red-600 rounded w-full mb-2'>Account login failed</div>}
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
              setfirst_data_enter(false);seterrmsg(false);
;
            }}>Back</button>}
          </form>
          <h3 className='pt-2 pb-8 font-medium'>Don't have an account? <span className='font-medium text-blue-600 underline cursor-pointer py-2'><Link to="/signup">Sign Up</Link></span></h3>
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

export default Login