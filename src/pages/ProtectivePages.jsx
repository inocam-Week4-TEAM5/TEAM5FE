import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectToken } from '../redux/modules/tokenSlice'

export function  ProtectivePages() {
  const {token} = useSelector(selectToken) 
  const accessToken =
    document.cookie &&
    document.cookie
      .split(";")
      .filter((cookies) => cookies.includes("accessToken"))[0]
      ?.split("=")[1];

  if (!!token || accessToken) {
    return <Outlet/>
  } else {
    return <Navigate to={"/login"}/>
  }
}