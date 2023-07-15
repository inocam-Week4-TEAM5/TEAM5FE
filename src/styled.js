import { css, styled } from "styled-components";
// Global 에서 설정한 폰트사이즈는 14px = 1rem

/* About css styled ---------------------------------------------- */
export const Flex = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const cursor = css`
  cursor: pointer;
`;

export const Layout = css`
  max-width: 1200px;
  margin: 0 auto;
`

/* About Div styled ---------------------------------------------- */
const FlexBox = styled.div`
  background-color: transparent;
  display: flex;
  flex-direction: ${({ $fd }) => ($fd ? $fd : "row")};
  justify-content: ${({ $jc }) => ($jc ? $jc : "center")};
  align-items: ${({ $ai }) => ($ai ? $ai : "center")};
  gap: ${({ $gap }) => ($gap ? $gap : "none")};

  ${({$type}) => $type === "sideBar"
    ? css`margin-top: 10vh;`
    : $type === "sideBarNav"
    ? css`
      position: absolute;
      top: 50vh;`
    : $type === "mobilePost" && css`
      margin-top: 1rem;
      width:100%`
  }    
`;

const Figure = styled.figure`
  width: ${({ $width }) => $width};

  @media (max-width: 700px) {
    width: 100px;
  }
`;

const UserBox =styled.div`
  ${Flex}
  border-radius: 50%;
  width: ${({$size})=> $size}px;
  height: ${({$size})=> $size}px;
  background-color: ${({$color})=> $color}
`

export { FlexBox, Figure, UserBox };
