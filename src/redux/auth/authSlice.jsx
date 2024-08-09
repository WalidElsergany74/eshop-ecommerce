import { createSlice } from '@reduxjs/toolkit'



const initialState = {
    isLogin : false,
    isAuth : false,
email: null,
userID : null,
phoneNumber : null,
userName : null,
photoUrl : null,

}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_ACTIVE_USER(state , action )  {
        // console.log(action.payload)
     state.isLogin = true
     state.email = action.payload.email
     state.userName = action.payload.userName
     state.userID = action.payload.userID
     state.photoUrl = action.payload.photoUrl
     state.phoneNumber = action.payload.phoneNumber
    
    
    },
    IS_ACTIVE(state , action) {
     state.isLogin = true
    },
   
    SET_REMOVE_USER(state , action) {
        state.isLogin = false
        state.email = null
        state.userName = null
        state.userID = null
        state.photoUrl = null
        state.phoneNumber = null
        console.log(state.isLogin)
    } 
  }
});

export const {SET_ACTIVE_USER , SET_REMOVE_USER , IS_ACTIVE} = authSlice.actions
export const selectIsLogin =  (state) => state.auth.isLogin
console.log(selectIsLogin)
export const selectEmail =  (state) => state.auth.email
console.log(selectEmail)
export const selectUserName =  (state) => state.auth.userName
export const selectPhotoUrl =  (state) => state.auth.photoUrl
export const selectPhoneNumber =  (state) => state.auth.phoneNumber
export const selectUserID =  (state) => state.auth.userID


export default authSlice.reducer
