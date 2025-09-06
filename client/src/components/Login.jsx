import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';
import {motion} from 'framer-motion'
import axios from 'axios';
import { toast } from 'react-toastify';
const Login = () => {
  const [state,setState]=useState('Register');
  const {setShowLogin, backendUrl,setToken,setUser}=useContext(AppContext)
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

//   { DATA
//   "success": true,
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YjgxYjlhZjQzZTU1ODk3ODgyM2UwZCIsImlhdCI6MTc1NzA3NTIwOX0.hvH26bOOAzjfvz05l65SalzRLvgxn9WbqMlxZkonAQI",
//   "user": {
//     "name": "Tina"
//   }
// }

  const onSubmitHandler=async(e)=>{
    e.preventDefault();
    try{
      if(state==='Login'){
        const {data}=await axios.post(backendUrl+"/api/users/login",{
          email,password 
        })
        // console.log(data);
        if(data.success){
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token",data.token);
          setShowLogin(false);
        }
        else{
          toast.error(data.message)
        }
      }
      else{
        const {data}=await axios.post(backendUrl+"/api/users/register",{
          name,email,password 
        })
        console.log(data);
        if(data.success){
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token",data.token);
          setShowLogin(false);
        }
        else{
          toast.error(data.message)
        }
      }
    }catch(err){
      toast.error(err.message)
    }
  }
  useEffect(()=>{
     document.body.style.overflow='hidden';
     return () => {
      document.body.style.overflow='unset';
     }
  },[])
  return (
    <div className='fixed absolute top-0 left-0 right-0 bottom-0 z-10
    backdrop-blur-sm bg-black/30 flex justify-center items-center'>
        
        <motion.form onSubmit={onSubmitHandler}
        initial={{ opacity: 0.2, y: 50 }}
    transition={{ duration: 0.3 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
        className='relative bg-white p-10 rounded-xl
text-slate-500'>

  <h1 className='text-center text-2xl text-neutral-700
  font-medium'>{state}</h1>
  
  <p className='text-sm'>Welcome back! Please sign in to
  continue</p>
  
  {state!=='Login' && <div className='border px-6 py-2 flex items-center gap-2
  rounded-full mt-5'>
    <img className='w-5' src={assets.profile_icon} alt="" />
    <input onChange={e=>setName(e.target.value)} value={name} type="text" className='outline-none text-sm'
    placeholder='Full Name' required/>
  </div>}
  <div className='border px-6 py-2 flex items-center gap-2
  rounded-full mt-4'>
    <img src={assets.email_icon} alt="" />
    <input onChange={e=>setEmail(e.target.value)} value={email} type="email" className='outline-none text-sm'
    placeholder='Email' required/>
  </div>
  <div className='border px-6 py-2 flex items-center gap-2
  rounded-full mt-4'>
    <img src={assets.lock_icon} alt="" />
    <input onChange={e=>setPassword(e.target.value)} value={password} type="password" className='outline-none text-sm'
    placeholder='Password' required/>
  </div>
  <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot password?</p>

  <button className='bg-blue-600 w-full text-white py-2 rounded-full'>{state==='Login'? 'Login': 'Create Account'}</button>

  {state==='Login' ? <p className='mt-5 text-center'>Don't have an account?
    <span className='text-blue-600 cursor-pointer' onClick={() => setState('Sign Up')}>Sign up</span>
  </p>
  :
  <p className='mt-5 text-center'>Already have an account?
    <span className='text-blue-600 cursor-pointer' onClick={() => setState('Login')}>Login</span>
  </p>}

  <img onClick={() => setShowLogin(false)} src={assets.cross_icon} className="absolute top-5 right-5 cursor-pointer"alt="" />
  
</motion.form>

    </div>
  )
}

export default Login
