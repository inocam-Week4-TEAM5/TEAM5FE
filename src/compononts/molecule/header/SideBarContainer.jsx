import React, { useContext } from "react";
import * as SC from "../../css/headerStyle";
import { useRouter } from "../../../hooks/useRouter";
import { FlexBox } from "../../../styled";
/* 컴포넌트 및 Hooks 관련 */
import { SidebarContext } from "../../organism/Header";
import { useUtilities } from "../../../hooks/useUtilities";
import panda2 from '../../../img/panda 2.png'
import { keyframes, styled } from "styled-components";
import { useSelector } from "react-redux";
import { selectToken } from "../../../redux/modules/tokenSlice";


export function SideBarContainer() {
  const { sidebar, setSideBar } = useContext(SidebarContext);
  const {token} = useSelector(selectToken);
  const { changeState, FalseState } = useUtilities();
  const { MoblieClickNavigate, logoutHandler, HeaderLinks } = useRouter(
    changeState(setSideBar)
  );


  return (
    <SC.SideBar $sidebar={sidebar}onMouseLeave={FalseState(setSideBar)} > 
      <FlexBox $fd="column" $type="sideBar">
        <FlexBox $fd="column" $gap="2em" $type="sideBarNav">
          {HeaderLinks.map(({ innerText, path }) => (
            <SC.SideNavLink
              key={innerText}
              $fontS="1.2rem"
              $cursor={true}
              onClick={MoblieClickNavigate(path)}
              children={innerText}
            />
          ))}
          {!token 
            ? (<>
            <SC.SideNavLink
            $fontS="1.2rem"
            $cursor={true}
            onClick={MoblieClickNavigate("/register")}
            children={"회원가입"}
          />
          <SC.SideNavLink
            $fontS="1.2rem"
            $cursor={true}
            onClick={MoblieClickNavigate("/login")}
            children={"로그인"}
          />
            
            </>)
          : <SC.SideNavLink
          $fontS="1.2rem"
          $cursor={true}
          onClick={logoutHandler}
          children={"로그아웃"}
        />
          }
        </FlexBox>
        <PandaImg src={panda2} alt="panda2"/>
      </FlexBox>
    </SC.SideBar>
  );
}

const Pandakeyframes = keyframes`
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(10deg);
  }
`

const PandaImg = styled.img`
  position: absolute;
  display: block;
  width: 450px;
  bottom: -50px;
  right: -100px;
  animation: ${Pandakeyframes} 1s linear infinite alternate;

  @media (max-width: 700px) {
    width: 300px;
    bottom: -25px;
    right: -60px;
  }
`
