import { css, styled } from "styled-components";
// Global 에서 설정한 폰트사이즈는 14px = 1rem

/* About css styled ---------------------------------------------- */
export const Flex = css`
  display: flex;
  flex-direction: ${({ $fd }) => ($fd ? $fd : "row")};
  justify-content: ${({ $jc }) => ($jc ? $jc : "center")};
  align-items: ${({ $ai }) => ($ai ? $ai : "center")};
  gap: ${({ $gap }) => ($gap ? $gap : "none")};
`;

export const cursor = css`
  cursor: pointer;
`;

export const Layout = css`
  max-width: 1200px;
  margin: 0 auto;
`;

/* About Div styled ---------------------------------------------- */
const FlexBox = styled.div`
  ${Flex}

  ${({ $type }) =>
    $type === "sideBar"
      ? css`
          margin-top: 10vh;
        `
      : $type === "sideBarNav"
      ? css`
          position: absolute;
          top: 10vh;
        `
      : $type === "mobilePost"
      ? css`
          width: 100%;
        `
      : $type === "imageUrls" &&
        css`
          width: 100%;
          flex-wrap: wrap;

          img {
            width: 22.5%;
          }

          @media (max-width: 700px) {
            img {
              width: 45%;
            }
          }
        `}
`;

const Figure = styled.figure`
  width: ${({ $width }) => $width};

  @media (max-width: 700px) {
    width: 100px;
  }
`;

const UserBox = styled.div`
  ${Flex}
  border-radius: 50%;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  background-color: ${({ $color }) => $color};
`;

export { FlexBox, Figure, UserBox };
