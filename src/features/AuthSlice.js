import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "./authService";


const userExist = localStorage.getItem("user")
const initialState = {
    user: userExist ? JSON.parse(userExist) : null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""
}

const AuthSLice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
               state.isLoading = false,
                state.isSuccess = false,
                state.isError = false,
                state.message = ""
        }
    },
    extraReducers: (builder) => {
        builder.addCase(LoginUser.pending, (state) => {
            state.isLoading = true
        }).addCase(LoginUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.user = action.payload
            console.log(action.payload)
        }).addCase(LoginUser.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        }).addCase(logoutUSer.fulfilled, (state, action) => {
            state.user = null
        })
    }
})
export const { reset } = AuthSLice.actions
export default AuthSLice.reducer

export const LoginUser = createAsyncThunk("login/user", async (formdata, thunkAPI) => {
    try {
        return await AuthService.LoginUSer(formdata)
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const logoutUSer = createAsyncThunk("logout/user", async () => {
    await AuthService.logout()
})

