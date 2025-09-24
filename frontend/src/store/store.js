import { configureStore } from '@reduxjs/toolkit'
import messageReducer  from "./slice/message/message.slice"
import userReducer from './user/user.slice';
import  socketReducer  from './slice/socket/socket.slice';
export const store = configureStore({
  reducer: {
    userReducer,
    messageReducer,
    socketReducer,
  },
  middleware : (getDefaultMiddleware)=> 
getDefaultMiddleware({
  serializableCheck: {
    ignoredPaths: ["socketReducer.socket"],
  }
})
  
});