import { createSlice } from '@reduxjs/toolkit'
import {getOtherUserThunk, getUserProfileThunk, loginUserThunk, logoutUserThunk, registerUserThunk} from "./user.thunk.js";

const initialState = {
   isAuthenticated: false,
   screenLoading:true,
   userProfile:null,
   buttonLoading:false,
   otherUsers: null,
   selectedUser: JSON.parse(localStorage.getItem("selectedUser")),
   
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
setSelectedUser: (state, action)=> {
  localStorage.setItem("selectedUser",JSON.stringify(action.payload))
  state.selectedUser = action.payload;
}
  },
  extraReducers: (builder) => {

// For Login
    builder
      .addCase(loginUserThunk.pending, (state, action) => {
    state.buttonLoading = true
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
       state.userProfile = action.payload?.responseData?.user;
       state.isAuthenticated = true
       state.buttonLoading = false
        
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.buttonLoading = false
         // This will be the value from rejectWithValue
      });


      // For Register
      builder
      .addCase(registerUserThunk.pending, (state, action) => {
    state.buttonLoading = true
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
       state.userProfile = action.payload?.responseData?.user;
       state.isAuthenticated = true
       state.buttonLoading = false
        
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.buttonLoading = false
         // This will be the value from rejectWithValue
      });


    //  For Logout 
      builder
      .addCase(logoutUserThunk.pending, (state, action) => {
    state.buttonLoading = true
      })
      .addCase(logoutUserThunk.fulfilled, (state, action) => {
       state.userProfile = null;
       state.isAuthenticated = false;
       state.buttonLoading = false;
       state.selectedUser= null;
       state.otherUsers = null;
       localStorage.clear();
        
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.buttonLoading = false
         // This will be the value from rejectWithValue
      });

// For get UserProfile

       builder
      .addCase(getUserProfileThunk.pending, (state, action) => {
    
      })
      .addCase(getUserProfileThunk.fulfilled, (state, action) => {
        state.isAuthenticated = true;
       state.screenLoading =false
       state.userProfile = action.payload?.responseData
        
        
      })
      .addCase(getUserProfileThunk.rejected, (state, action) => {
        state.screenLoading = false
         // This will be the value from rejectWithValue
      });
  
      
      // For GetOther User Who Is cHating 
      builder
      .addCase(getOtherUserThunk.pending, (state, action) => {
       state.screenLoading =true;
      })
      .addCase( getOtherUserThunk.fulfilled, (state, action) => {
         
       state.screenLoading =false
       state.otherUsers = action.payload?.responseData;
       
        
        
      })
      .addCase(getOtherUserThunk.rejected, (state, action) => {
        state.screenLoading = false
         // This will be the value from rejectWithValue
      });
  },

   

})

// Action creators are generated for each case reducer function
// export const { Login } = counterSlice.actions

// export default counterSlice.reducer
export const { setSelectedUser } = userSlice.actions

export default userSlice.reducer