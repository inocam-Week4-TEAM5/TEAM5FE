export const useUtilities = () => {
  const changeState = (setstate) => () => {
    setstate(pre => !pre)
  }
  const FalseState = (setstate) => () => {
    setstate(false)
  }
  return { changeState,FalseState }
}