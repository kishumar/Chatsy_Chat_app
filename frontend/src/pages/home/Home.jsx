import React, { useEffect } from 'react'
import UserSidebar from './UserSidebar'
import MessageContainer from './MessageContainer'
// import io from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import { initializeSocket, setOnlineUsers } from '../../store/slice/socket/socket.slice'
import { setNewMessage } from '../../store/slice/message/message.slice'

function Home() {

  const dispatch = useDispatch();
  const {isAuthenticated, userProfile} = useSelector((state)=> state.userReducer);
  
  const {socket,onlineUsers} = useSelector(state=>state.socketReducer)
// console.log(onlineUsers)
  useEffect(()=>{
    if(!isAuthenticated) return;
    dispatch(initializeSocket(userProfile?._id));
  },[isAuthenticated]);

  useEffect(()=> {
    if (!socket) return;
    socket.on("onlineUsers", (onlineUsers)=> {
      dispatch(setOnlineUsers(onlineUsers))
       
    });
    socket.on("newMessage", (newMessage)=> {
      console.log(newMessage)
      dispatch(setNewMessage(newMessage))
    })

    return ()=>{
      socket.close();
    }
  },[socket]);
  return (
    <div className='flex'>
      <UserSidebar/>
      <MessageContainer/>
    </div>
  )
}

export default Home