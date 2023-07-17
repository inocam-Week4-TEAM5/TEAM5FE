import React, { useState, createContext } from "react";
/* 컴포넌트 및 Hooks 관련 */
import { Outlet } from "react-router-dom";
import SideBar from "../molecule/header/SideBar";
import NavInner from "../molecule/header/NavInner";
export const SidebarContext = createContext(null);

function Header() {
  const [sidebar, setSideBar] = useState(false);

  return (
    <>
      <div style={{ position:"fixed", top:0, width:"100%", backgroundColor:"white" }}>
        <SidebarContext.Provider
          value={{ sidebar, setSideBar }}
          children={
            <div style={{ position: "relative"}}>
              <NavInner />
              <SideBar />
            </div>
          }
        />
      </div>
      <Outlet />
    </>
  );
}

export default Header;
