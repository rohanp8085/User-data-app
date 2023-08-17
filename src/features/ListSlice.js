import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ListService from "./ListService";


const countryExist = localStorage.getItem("country")
const statesExist = localStorage.getItem("state")
const tabledataExist = localStorage.getItem("tabledata")


const initialState = {
  lists: countryExist ? JSON.parse(countryExist) : [],
  states: statesExist ? JSON.parse(statesExist) : [],
  formdata: tabledataExist ? JSON.parse(tabledataExist) : [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ""
}

const ListSLice = createSlice({
  name: "list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getcountry.pending, (state) => {
      state.isLoading = true
    }).addCase(getcountry.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.lists = action.payload
    }).addCase(getcountry.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
      .addCase(getstate.pending, (state) => {
        state.isLoading = true
      }).addCase(getstate.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.states = action.payload
      }).addCase(getstate.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      }).addCase(getData.pending, (state, action) => {
        state.isLoading = true
      }).addCase(getData.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.formdata = [
          ...state.formdata,
          action.payload
        ]
      }).addCase(getData.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export default ListSLice.reducer


export const getcountry = createAsyncThunk("create/list", async (userdata, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await ListService.createlist(userdata, token)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const getstate = createAsyncThunk("get/states", async (userdata, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await ListService.getstate(userdata, token)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const getData = createAsyncThunk("get/data", async (data) => {
  try {
    return ListService.getdata(data)
  } catch (error) {
    console.log(error)
  }
})

