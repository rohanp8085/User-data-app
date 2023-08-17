import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/AuthSlice"
import listReducer from "../features/ListSlice"
const store = configureStore({
    reducer : {
    auth : authReducer,
    list : listReducer
    }
})

export default store