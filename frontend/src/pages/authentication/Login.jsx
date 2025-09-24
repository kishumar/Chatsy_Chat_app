import React, { useEffect, useState } from 'react'
import {FaLock } from "react-icons/fa";
import {toast} from 'react-hot-toast';
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import Signup from './Signup';
import {useDispatch, useSelector} from 'react-redux'
import { loginUserThunk } from '../../store/user/user.thunk';
function Login() {
  const dispatch= useDispatch();
  const navigate= useNavigate();  
  
  const {isAuthenticated} = useSelector((state)=> state.userReducer);
   const [loginData, setLoginData] = useState({
  
  username: "",
  password: "",
   });


   useEffect(()=>{
    if (isAuthenticated) navigate("/");
   },[isAuthenticated]);

   const handleInputChange = (e)=>{
    setLoginData((prev)=>({...prev, [e.target.name]:e.target.value}))
   }
  //  console.log(loginData)

   const handleLogin =async ()=>{
   const response =  await dispatch(loginUserThunk(loginData))
 if(response?.payload?.success){
    navigate("/")
   }
  }
  return (
     

    <div className="flex items-center min-h-screen justify-center"> 
      <div className="w-[30rem] flex flex-col gap-5 bg-base-200 p-6 rounded-lg">
        <h1 className='font-semibold text-xl text-center'> Talksy Login  </h1>
        
        {/* Username Input with Icon */}
        <div className="relative">
          <FaUser className="h-4  w-4 text-white absolute left-3 top-1/2 -translate-y-1/2 z-10" />
          <input
            type="text"
            placeholder="Username"
            className="input input-primary pl-10 w-full"
            onChange={handleInputChange}
            name='username'
            
          />
        </div>

        {/* Password Input with Icon */}
        <div className="relative">
          <FaLock className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 z-10" />
          <input
            type="password"
            placeholder="Password"
            className="input input-primary pl-10 w-full"
            onChange={handleInputChange}
            name='password' 
          />
        </div> 

<button className="btn btn-primary font-medium text-lg" onClick={handleLogin}>Login</button>

<p className='font-light'>
  Don't have an account? &nbsp;
<Link to='/signup' className='text-blue-400 underline'>Signup</Link>

</p>
      </div>
    </div>
  )
}

   export default Login 