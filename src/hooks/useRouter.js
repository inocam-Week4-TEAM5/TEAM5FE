import { useNavigate } from "react-router-dom"
import { usePostLoginRTKMutation } from "../redux"
import { useDispatch } from "react-redux"
import { deleteToken } from "../redux/modules/tokenSlice"

export const useRouter = (changeState) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
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
  const logoutHandler = () => {
    document.cookie = `accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    dispatch(deleteToken())
    navigate('/')
  }   

  const HeaderLinks = [
    {innerText:"Home", path:"/"}, 
    {innerText:"Post", path:"/post"}
  ]  

  return { ClickNavigate, MoblieClickNavigate, MoblieLoginNavigate, logoutHandler, HeaderLinks }
}