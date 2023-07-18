import { useNavigate } from "react-router-dom"
import { usePostLoginRTKMutation } from "../redux"

export const useRouter = (changeState) => {
  const navigate = useNavigate()
  const [postLoginRTK] = usePostLoginRTKMutation()

  const ClickNavigate = (path) => () => {
    navigate(path)
  }

  const MoblieClickNavigate = (path) => () => {
    ClickNavigate(path)()
    changeState()
  }

  const MoblieLoginNavigate = (path) => () => {
    postLoginRTK(path)
    changeState()
  }

  const HeaderLinks = [
    {innerText:"Post", path:"/post"},
    {innerText:"회원가입", path:"/"},
    // {innerText:"로그인", path:"/"},
  ]
  const MobileHeaderLinks = [
    {innerText:"Home", path:"/"}, 
    ...HeaderLinks
  ]

  return { ClickNavigate, MoblieClickNavigate, MoblieLoginNavigate, HeaderLinks, MobileHeaderLinks }
}