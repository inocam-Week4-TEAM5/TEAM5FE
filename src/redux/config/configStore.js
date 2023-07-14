import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../modules/loginSlice"

const store = configureStore({
  reducer:{loginSlice}
})

export default store