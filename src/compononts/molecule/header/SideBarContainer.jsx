import React, { useContext } from "react";
import * as SC from "../../css/headerStyle";
import { useRouter } from "../../../hooks/useRouter";
import { FlexBox } from "../../../styled";
/* 컴포넌트 및 Hooks 관련 */
import { SidebarContext } from "../../organism/Header";
import { useUtilities } from "../../../hooks/useUtilities";
import { theme } from "../../../theme";
import { UserImg } from "../../atom";


export function SideBarContainer() {
  const { sidebar, setSideBar } = useContext(SidebarContext);
  const { changeState, FalseState } = useUtilities();
  const { MoblieClickNavigate, MoblieLoginNavigate, MobileHeaderLinks } = useRouter(
    changeState(setSideBar)
  );

  return (
    <SC.SideBar $sidebar={sidebar} onMouseLeave={FalseState(setSideBar)}>
      <FlexBox $fd="column" $type="sideBar">
        <UserImg size={100} color={theme.color.white} icolor={theme.color.green}/>
        <div className="nickName" children="NickName" />
        <FlexBox $fd="column" $gap="2em" $type="sideBarNav">
          {MobileHeaderLinks.map(({ innerText, path }) => (
            <SC.SideNavLink
              key={innerText}
              $fontS="1.2rem"
              $cursor={true}
              onClick={MoblieClickNavigate(path)}
              children={innerText}
            />
          ))}
          <SC.SideNavLink
              $fontS="1.2rem"
              $cursor={true}
              // onClick={MoblieLoginNavigate({ email: "zin9@gmail.com", password: "sassdf" })}  // 진웅님
              onClick={MoblieLoginNavigate({ email: "test12345", password: "test12345" })}  // 재익님
              children="로그인"
            />
        </FlexBox>
      </FlexBox>
    </SC.SideBar>
  );
}
