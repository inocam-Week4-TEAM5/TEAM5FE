import React, { useState, createContext, useEffect } from "react";
/* 컴포넌트 및 Hooks 관련 */
import { Outlet } from "react-router-dom";
import { NavInnerContainer } from "../molecule";
import { SideBarContainer } from "../molecule/header/SideBarContainer";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/modules/tokenSlice";
export const SidebarContext = createContext(null);

export function Header() {
  const [sidebar, setSideBar] = useState(false);
  const dispatch = useDispatch()
  useEffect(()=>{
    const accessToken =
    document.cookie &&
    document.cookie
      .split(";")
      .filter((cookies) => cookies.includes("accessToken"))[0]
      ?.split("=")[1];
    accessToken && dispatch(setToken(accessToken));
  })

  return (
    <>
      <div style={{ position:"fixed", top:0, width:"100%", backgroundColor:"white", zIndex:40 }}>
        <SidebarContext.Provider
          value={{ sidebar, setSideBar }}
          children={
            <div style={{ position: "relative"}}>
              <NavInnerContainer />
              <SideBarContainer />
            </div>
          }
        />
      </div>
      <Outlet />
    </>
  );
}
