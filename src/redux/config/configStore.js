import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../modules/loginSlice"
import decodeTokenSlice from '../modules/decodeTokenSlice'

export const store = configureStore({
  reducer:{loginSlice, decodeTokenSlice}
})