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
      <SidebarContext.Provider
        value={{ sidebar, setSideBar }}
        children={
          <>
            <NavInner />
            <SideBar />
          </>
        }
      />
      <Outlet />
    </>
  );
}

export default Header;
