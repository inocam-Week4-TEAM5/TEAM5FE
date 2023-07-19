import { createSlice } from "@reduxjs/toolkit";

const decodeTokenSlice = createSlice({
  name :"decodeToken",
  initialState: "",
  reducers : {
    decode_token : (_, action) => {
      console.log(action.payload)
      return action.payload
    }
  }
})

export default decodeTokenSlice.reducer
export const selectdecode = (state) => state.decodeToken
export const {decode_token} = decodeTokenSlice.actions;