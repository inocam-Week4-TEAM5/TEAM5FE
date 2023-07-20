import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import loginSlice from "../modules/loginSlice"
import tokenSlice from '../modules/tokenSlice'
import {inobaoQuery} from '../api/api'

export const store = configureStore({
  reducer:{loginSlice, tokenSlice,
    [inobaoQuery.reducerPath] : inobaoQuery.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(inobaoQuery.middleware)
})

setupListeners(store.dispatch)