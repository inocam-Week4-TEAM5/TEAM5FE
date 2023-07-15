import React, { useContext } from "react";
import * as SC from "../../css/headerStyle";
import { useRouter } from "../../../hooks/useRouter";
import { FlexBox } from "../../../styled";
/* 컴포넌트 및 Hooks 관련 */
import UserImg from "../../atom/UserImg";
import { SidebarContext } from "../../organism/Header";
import { useUtilities } from "../../../hooks/useUtilities";


function SideBar() {
  const { sidebar, setSideBar } = useContext(SidebarContext);
  const { changeState } = useUtilities();
  const { MoblieClickNavigate, MobileHeaderLinks } = useRouter(
    changeState(setSideBar)
  );
  return (
    <SC.SideBar $sidebar={sidebar} onMouseLeave={changeState(setSideBar)}>
      <FlexBox $fd="column" $type="sideBar">
        <UserImg size={100} color="#fff"/>
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
        </FlexBox>
      </FlexBox>
    </SC.SideBar>
  );
}

export default SideBar;
