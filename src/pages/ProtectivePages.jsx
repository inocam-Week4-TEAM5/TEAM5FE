import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectToken } from '../redux/modules/tokenSlice'

function  ProtectivePages() {
  const {token} = useSelector(selectToken) 
  if (!!token) {
    return <Outlet/>
  } else {
    return <Navigate to={"/login"}/>
  }
}

export default  ProtectivePages