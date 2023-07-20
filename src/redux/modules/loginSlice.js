import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  isLoading:false,
  isError:false
}

const loginSlice = createSlice({
  name : "loginSlice",
  initialState,
  reducers:{},
  extraReducers : builder => {}
})

export default loginSlice.reducer