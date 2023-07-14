import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { NavLayout, NavInner, Figure, FlexBox, MobileNav, SideBar, NavH2 } from "../styled";
import inocam from "../img/inocam.png";
import {VscLayoutSidebarRight} from 'react-icons/vsc'
import { FaUser } from 'react-icons/fa'

function Header() {
  const [sidebar, setSideBar] = useState(false)
  const navigate = useNavigate()

  return (
    <>
      {/* 데스크탑 -------------------------------- */}
      <NavLayout>
        <NavInner>
          <FlexBox onClick={()=>navigate("/")}>
          <Figure $width="80px"> 
            <img src={inocam} alt="로고" width="100%" />
          </Figure>
            <h2>InoBao</h2>
          </FlexBox>
          <FlexBox $gap="20px" >
            <NavH2 onClick={()=>navigate("/post")}>Posts</NavH2>
            <NavH2>회원가입</NavH2>
            <NavH2>로그인</NavH2>
          </FlexBox>
        </NavInner>
      </NavLayout>
      {/* 모바일 -------------------------------- */}
      <MobileNav $sidebar={sidebar} >
        <Figure $width="100px" onClick={()=>navigate("/")}> 
              <img src={inocam} alt="로고" width="100%" />
        </Figure>
        <h2 onClick={()=>navigate("/")}>InoBao</h2>
      <div className="sideBarBtn" onClick={()=>setSideBar(!sidebar)}><VscLayoutSidebarRight size={20} color='#539B39'/></div>
      <SideBar $sidebar={sidebar}>
        <FlexBox $fd="column" $sideBar={true}>
        <div className="userBox">
            {<FaUser size={100}/>}
          </div>
          <div style={{marginTop:"47px", fontSize:"2rem", fontWeight:"bold",transform: "rotate(20deg)"}}>NickName</div>
          <FlexBox $fd="column" $gap="2em" style={{position:"absolute", top:"50vh"}}>
            <div className="sideNavLink" onClick={()=>{navigate("/"); setSideBar(!sidebar)}}>Home</div>
            <div className="sideNavLink" onClick={()=>{navigate("/post"); setSideBar(!sidebar)}}>post</div>
            <div className="sideNavLink">회원가입</div>
            <div className="sideNavLink">로그인</div>
          </FlexBox>
  
        </FlexBox>
      </SideBar> 
      </MobileNav>
      <Outlet />
    </>
  );
}

export default Header;
