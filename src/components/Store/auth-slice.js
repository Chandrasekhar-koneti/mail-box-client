import { createSlice } from "@reduxjs/toolkit"

const initialAuthState={
    token:'',
    isLogin:false,
    userMail:''
}

const authSlice=createSlice({
    name:'auth',
    initialState:initialAuthState,
    reducers:{
        login(state,action){
            const token=action.payload;
            state.token = token;
            state.isLogin = !state.isLogin;
            console.log(state.token)
            localStorage.setItem('tokenId', action.payload)
        },
        logout(state){
            state.isLogin = false;
            localStorage.removeItem('tokenId')
            localStorage.removeItem('email')
        },
        setUserMail(state,action){
            localStorage.setItem('userMail', action.payload)

        },
        isLoginAuthenticated(state){
            if(localStorage.getItem('tokenId')){
              state.isLogin = true;
              state.token = localStorage.getItem('tokenId');
              state.userMail = localStorage.getItem('email')
            }
          }
    }
})

export const authActions=authSlice.actions

export default authSlice.reducer