import React, { useEffect } from 'react'
import {Route, Routes} from 'react-router-dom' 
import Home from './pages/home/Home' 
import {Toaster} from 'react-hot-toast'
import Login from './pages/authentication/Login'
import Signup from './pages/authentication/Signup'
import { useDispatch } from 'react-redux'
import { getOtherUserThunk, getUserProfileThunk } from './store/user/user.thunk'
import ProtectedRoute from '../components/ProtectedRoute'
 
function App() {

  const dispatch =useDispatch();

  useEffect(()=>{
    (async()=> {
      await dispatch(getUserProfileThunk());
      // await dispatch(getOtherUserThunk());
    })()
  },[])
   
  return (
    <>
    {/* <h1 className='bg-red-500 text-white'> Hello how are you</h1> */}
  <Toaster
  position="top-center"
  reverseOrder={false}
/>
  <Routes>
    <Route path='/' element={(<ProtectedRoute>   <Home/> ,  </ProtectedRoute>)}></Route>
     <Route path='/login' element={<Login/>}></Route>
     <Route path='/signup' element={<Signup/>}></Route>
  </Routes>
    </>
  )
}

export default App

