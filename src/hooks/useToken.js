import jwtDecode from "jwt-decode";

export const useToken = () => {
  const accessToken =
    document.cookie &&
    document.cookie
      .split(";")
      .filter((cookies) => cookies.includes("accessToken"))[0]
      ?.split("=")[1];
  // const decode = jwtDecode(accessToken);

  return accessToken
};
