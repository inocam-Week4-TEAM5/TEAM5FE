import React, { useContext } from "react";
/* 스타일 및 아이콘 관련 */
import * as SC from "../../css/headerStyle";
import inocam from "../../../img/inocam.png";
import { Figure, FlexBox } from "../../../styled";
import { VscLayoutSidebarRight } from "react-icons/vsc";
/* 컴포넌트 및 Hooks 관련 */
import { SidebarContext } from "../../organism/Header";
import { useRouter } from '../../../hooks/useRouter'
import { useUtilities } from '../../../hooks/useUtilities'


function NavInner() {
  const { sidebar, setSideBar } = useContext(SidebarContext);
  const { changeState } = useUtilities();
  const { ClickNavigate, HeaderLinks } = useRouter();
  return (
    <SC.NavLayout>
      <SC.NavInner>
        <FlexBox onClick={ClickNavigate("/")}>
          <Figure
            $width="80px"
            children={<img src={inocam} alt="로고" width="100%" />}
          />
          <SC.TitleH $fontS="2rem" $font="PartialSans" children="InoBao" />
        </FlexBox>

        <FlexBox className="desktop" $gap="20px">
          {HeaderLinks.map(({ innerText, path }) => (
            <SC.TitleH
              key={innerText}
              $fontS="1.2rem"
              $cursor={true}
              onClick={ClickNavigate(path)}
              children={innerText}
            />
          ))}
        </FlexBox>

        <SC.SideBarBtn onClick={changeState(setSideBar)}>
          <VscLayoutSidebarRight
            size={20}
            color={sidebar ? "#ffffff" : "#539B39"}
          />
        </SC.SideBarBtn>
      </SC.NavInner>
    </SC.NavLayout>
  );
}

export default NavInner;
