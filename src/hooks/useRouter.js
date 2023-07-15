import { useNavigate } from "react-router-dom"

export const useRouter = (changeState) => {
  const navigate = useNavigate()

  const ClickNavigate = (path) => () => {
    navigate(path)
  }

  const MoblieClickNavigate = (path) => () => {
    ClickNavigate(path)()
    changeState()
  }

  const HeaderLinks = [
    {innerText:"Post", path:"/post"},
    {innerText:"회원가입", path:"/"},
    {innerText:"로그인", path:"/"},
  ]
  const MobileHeaderLinks = [
    {innerText:"Home", path:"/"}, 
    ...HeaderLinks
  ]

  return { ClickNavigate, MoblieClickNavigate,HeaderLinks, MobileHeaderLinks }
}