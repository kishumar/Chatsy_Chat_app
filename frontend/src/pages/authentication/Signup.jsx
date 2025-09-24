import React, { useEffect, useState } from 'react'
import {FaLock } from "react-icons/fa";

import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUserThunk } from '../../store/user/user.thunk';
import toast from 'react-hot-toast';
function Signup() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {isAuthenticated} = useSelector((state)=> state.userReducer);
  const [signupData, setSignupData] = useState({
fullname: "",
username: "",
password: "",
confirmPassword: "",
gender:"male",
  });

  useEffect(()=> {
    if(isAuthenticated) navigate('/');
  },[isAuthenticated])

  const handleInputChange = (e)=> {
    setSignupData((prev)=> ({
      ...prev,
      [e.target.name]:e.target.value
    }))
  }
  
  const handleSignup =async ()=>{
    if(signupData.password !== signupData.confirmPassword){
     return toast.error("Password and confirm password does not match")
    }
  
   const response = await dispatch(registerUserThunk(signupData));
   if(response?.payload?.success){
    navigate("/")
   }
  }
  return (
    

    <div className="flex items-center min-h-screen justify-center">
      <div className="w-[30rem] flex flex-col gap-5 bg-base-200 p-6 rounded-lg">
        <h1 className='font-semibold text-xl text-center'> Talksy Signup  </h1>
        
        {/* Username Input with Icon */}

        <div className="relative">
          <FaUser className="h-4  w-4 text-white absolute left-3 top-1/2 -translate-y-1/2 z-10" />
          <input
            type="text"
            placeholder="Full Name"
            className="input input-primary pl-10 w-full"
            onChange={handleInputChange}
            name='fullname'
          />
        </div>

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

         <div className="relative">
          <FaLock className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 z-10" />
          <input
            type="password"
            placeholder="Confirm Password"
            className="input input-primary pl-10 w-full"
             onChange={handleInputChange}
             name='confirmPassword'
          />
        </div>

         <div className="input input-bordered input-primary flex items-center gap-5">
          <label htmlFor="male" className="flex gap-3 items-center">
            <input
              id="male"
              type="radio"
              name="gender"
              value="male"
              className="radio radio-primary"
              onChange={handleInputChange}
            />
            male
          </label>

          <label htmlFor="female" className="flex gap-3 items-center">
            <input
              id="female"
              type="radio"
              name="gender"
              value="female"
              className="radio radio-primary"
              onChange={handleInputChange}
            />
            female
          </label>
        </div>

<button className="btn btn-primary font-medium text-lg" onClick={handleSignup}>Signup</button>

<p className='font-light'>
  already have an account? &nbsp;
  <Link to='/login' className='text-blue-400 underline'>Login</Link>

</p>
      </div>
    </div>
  )
}

export default Signup