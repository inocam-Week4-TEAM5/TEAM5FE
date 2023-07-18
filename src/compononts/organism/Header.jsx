import React, { useState, createContext } from "react";
/* 컴포넌트 및 Hooks 관련 */
import { Outlet } from "react-router-dom";
import { NavInnerContainer } from "../molecule";
import { SideBarContainer } from "../molecule/header/SideBarContainer";
export const SidebarContext = createContext(null);

export function Header() {
  const [sidebar, setSideBar] = useState(false);

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
