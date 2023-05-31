import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import mailStoreSlice from "./mailStore-slice";


const store = configureStore({
    reducer: {auth: authSlice, mail:mailStoreSlice}
})

export default store