import React, { useContext } from "react";
/* 스타일 및 아이콘 관련 */

import inocam from "../../../img/inocam.png";
import { Figure, FlexBox } from "../../../styled";
import { VscLayoutSidebarRight } from "react-icons/vsc";
/* 컴포넌트 및 Hooks 관련 */
import { useRouter } from '../../../hooks/useRouter'
import { useUtilities } from '../../../hooks/useUtilities'
import { theme } from "../../../theme";
import { SidebarContext } from "../../organism";
import * as SC from "../../css/headerStyle";
import { usePostLoginRTKMutation } from "../../../redux/api/api";



export function NavInnerContainer() {
  const { sidebar, setSideBar } = useContext(SidebarContext);
  const { changeState } = useUtilities();
  const { ClickNavigate, HeaderLinks } = useRouter();
  const [postLoginRTK] = usePostLoginRTKMutation()

  return (
    <SC.NavLayout>
      <SC.NavInner>
        <FlexBox onClick={ClickNavigate("/")} style={{cursor:"pointer"}}>
          <Figure
            $width="80px"
            children={<img src={inocam} alt="로고" width="100%" height="fit-content" />}
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
          <SC.TitleH
              $fontS="1.2rem"
              $cursor={true}
              onClick={()=>postLoginRTK({  email: "test12345", password: "test12345" })}  // 진웅님
              // onClick={()=>postLoginRTK({ email: "asd2@gmail.com", password: "!asd123456" })}  // 정은님
              children={"로그인"}
            />
        </FlexBox>

        <SC.SideBarBtn onClick={changeState(setSideBar)}>
          <VscLayoutSidebarRight
            size={20}
            color={sidebar ? theme.color.white : theme.color.green}
          />
        </SC.SideBarBtn>
      </SC.NavInner>
    </SC.NavLayout>
  );
}
