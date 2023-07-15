export const useUtilities = () => {
  const changeState = (setstate) => () => {
    setstate(pre => !pre)
  }
  return { changeState }
}