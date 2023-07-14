import { css, styled } from "styled-components";

/* About css styled ---------------------------------------------- */
const Flex = css`
  display: flex;
  justify-content:center;
  align-items: center;
`


/* About Div styled ---------------------------------------------- */
const FlexBox = styled.div`
  background-color: transparent;
  display: flex;
  flex-direction: ${({ $fd }) => ($fd ? $fd : "row")};
  justify-content: ${({ $jc }) => ($jc ? $jc : "center")};
  align-items: ${({ $ai }) => ($ai ? $ai : "center")};
  gap: ${({ $gap }) => ($gap ? $gap : "none")};

  ${({ $sideBar }) =>
    $sideBar &&
    css`
      margin-top: 10vh;
    `}
`;

const cursor = css`
  cursor: pointer;
`;


const Figure = styled.figure`
  width: ${({ $width }) => $width};
`;

/* About Nav styled ---------------------------------------------- */
const NavLayout = styled.nav`
  height: 80px;
  padding: 0 0.5rem;
  @media (max-width: 700px) {
    display: none;
  }
`;

const NavInner = styled(FlexBox)`
  height: 100%;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;

  h2 {
    font-family: 'PartialSansKR-Regular';
    font-size: 2rem;
  }
`;

const NavH2 = styled.div`
  ${cursor}
  font-size: 1.2rem;
`

/* About Mobile styled -------------------------------------------- */
const MobileNav = styled(FlexBox)`
  overflow: hidden;
  position: relative;
  margin-top: 1rem;
  padding: 0 2rem;
  right: 20px;

  h2 {
    font-family: 'PartialSansKR-Regular';
    font-size: 2.5rem;
  }

  .sideBarBtn {
    ${cursor}
    width : 1rem;
    height: 1rem;
    position: absolute;
    top: 45%;
    right: 1.5%;
    z-index: 10;
  }

  @media (min-width: 700px) {
    display: none;
  }
`;

const SideBar = styled.div`
  @media (min-width: 700px) {
    display: none;
  }

  position: fixed;
  top: 0;
  right: -80vw;
  width: 60vw;
  height: 100vh;
  background-color: #9abe70;
  transition: all 0.5s;

  ${({ $sidebar }) =>
    $sidebar &&
    css`
      right: -20px;   
    `}

    .userBox {
    ${Flex}
    border-radius: 50%;
    width: 150px;
    height: 150px;
    background-color:#fff;
  }

  .sideNavLink {
    ${Flex}
    ${cursor}
    border-radius:20px;
    width:40vw;
    height: 2em;
    font-size:1.5rem;
    border:1px solid black;
    background-color:#fff;
    transform: rotate(20deg);
    transition: all 0.2s;
    
  }

  .sideNavLink:hover {
    transform: rotate(10deg);
    font-size:2rem;
    width:45vw;
    font-weight:bold;
    border:3px solid black;
    height: 2em;
  }

`;

export { NavLayout, NavInner, MobileNav, SideBar, Figure, FlexBox, NavH2 };
