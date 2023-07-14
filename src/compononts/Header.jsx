import React from 'react'
import { Outlet } from 'react-router-dom'

function Header() {
  return (
    <div>
      Header
      <Outlet/>
    </div>
  )
}

export default Header