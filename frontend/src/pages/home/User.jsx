import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { setSelectedUser } from '../../store/user/user.slice';
const User = ({userDetails}) =>{
  // console.log(userDetails)
const dispatch = useDispatch();
const {selectedUser} = useSelector((state) => state.userReducer);
const {onlineUsers} = useSelector(state => state.socketReducer);
 const isUserOnline = onlineUsers?.includes(userDetails?._id)
// console.log(isUserOnline)

const handleUserClick = ()=>{
  dispatch(setSelectedUser(userDetails));
};
   
  return (
    <div onClick={handleUserClick} 
    className={`flex gap-5 items-center hover:bg-gray-700 py-1 px-2
     rounded-m   cursor-pointer ${userDetails?._id === selectedUser?._id && "bg-gray-700"}`}>
     <div className={`avatar ${isUserOnline && 'avatar-online'}`}>
    
  <div className="w-12 rounded-full ">
    <img src={userDetails?.avatar}/>
  </div>
</div>

<div className=''>
    <h2 className='line-clamp-1'>{userDetails?.fullname}</h2>
    <p className='text-xs'>{userDetails?.username}</p>
</div>
    </div>
  )
}

export default User