import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from 'jwt-decode'

const initialState = {
  token : "",
  decodeToken : {}
}


const tokenSlice = createSlice({
  name :"tokenSlice",
  initialState,
  reducers : {
    setToken : (state, action) => {
      const decodeToken = jwt_decode(action.payload)
      return state = {...state, token:action.payload, decodeToken}
    },
    deleteToken : (state, action) => {
      return {...initialState}
    }
  }
})

export default tokenSlice.reducer
export const selectToken = (state) => state.tokenSlice
export const { setToken, deleteToken } = tokenSlice.actions