import React from 'react'
import { UserBox } from '../../styled'
import { FaUser } from "react-icons/fa";

export  function UserImg({size, color, icolor}) {
  return (
    <UserBox $size={size*1.5} $color={color}>{<FaUser size={size} color={icolor && icolor} />}</UserBox>
  )
}