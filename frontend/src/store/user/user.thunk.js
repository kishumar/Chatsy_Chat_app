import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosInstance } from "../../../components/utilities/axiosInstance.js"
import toast from "react-hot-toast";

// Login User
 export const loginUserThunk = createAsyncThunk(
  'user/login',
  
  async ({ username,password}, {rejectWithValue}) => {
//  console.log(username , password)
    try {
      const response = await axiosInstance.post("/user/login", {username, password});
      toast.success("Login successfully")
      return response.data
    } catch (error) {
      console.error(error)
      const errorOutput = error?.response?.data?.errMessage;
      
      toast.error(errorOutput);
      return rejectWithValue(errorOutput)
    }
    
  },
);


// Register User
export const registerUserThunk = createAsyncThunk(
  'user/signup',
  
  async ({ fullname, username,password,gender}, {rejectWithValue}) => {
//  console.log(username , password)
    try {
      const response = await axiosInstance.post("/user/register", {fullname,username, password,gender});
      toast.success("Signup successfully")
      return response.data
    } catch (error) {
      console.error(error)
      const errorOutput = error?.response?.data?.errMessage;
      
      toast.error(errorOutput);
      return rejectWithValue(errorOutput)
    }
    
  },
);

// Logout User
 export const logoutUserThunk = createAsyncThunk(
  'user/logout',
  
  async (_, {rejectWithValue}) => {
//  console.log(username , password)
    try {
      const response = await axiosInstance.post("/user/logout");
      toast.success("Logout successfully")
       
      return response.data
    } catch (error) {
      console.error(error)
      const errorOutput = error?.response?.data?.errMessage;
      
      toast.error(errorOutput);
      return rejectWithValue(errorOutput)
    }
    
  },
);


// For GetUserProfile
 export const getUserProfileThunk = createAsyncThunk(
  'user/getProfile',
  
  async (_, {rejectWithValue}) => {
//  console.log(username , password)
    try {
      const response = await axiosInstance.get("/user/get-profile");
      
      return response.data
    } catch (error) {
      console.error(error)
      const errorOutput = error?.response?.data?.errMessage;
      
      // toast.error(errorOutput);
      return rejectWithValue(errorOutput)
    }
    
  },
);

// Get Other User
 export const getOtherUserThunk = createAsyncThunk(
  'user/getOtherUsers',
  
  async (_, {rejectWithValue}) => {
//  console.log(username , password)
    try {
      const response = await axiosInstance.get("/user/get-other-users");
      
      return response.data
    } catch (error) {
      console.error(error)
      const errorOutput = error?.response?.data?.errMessage;
      
      // toast.error(errorOutput);
      return rejectWithValue(errorOutput)
    }
    
  },
);