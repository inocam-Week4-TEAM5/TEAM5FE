import { css, styled } from "styled-components";
import { Flex, Layout, cursor } from "../../styled";


const NavLayout = styled.nav`
  position: relative;
`;

const NavInner = styled.div`
  ${Flex}
  ${Layout}
  height: 80px;
  padding: 0 1rem;
  justify-content: space-between;

  @media (max-width: 700px) {
    justify-content: center;
    .desktop {
      display: none;
    }
  }
`;

const TitleH = styled.div`
  font-size: ${({ $fontS }) => ($fontS ? $fontS : "1rem")};

  ${({ $cursor }) =>
    $cursor &&
    css`
      ${cursor}
    `}

  ${({ $font }) =>
    $font === "PartialSans" &&
    css`
      font-family: "PartialSansKR-Regular";
    `}
`;

const SideBarBtn = styled.div`
  display: none;
  @media (max-width: 700px) {
    display: block;
    ${cursor}
    width : 1rem;
    height: 1rem;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 1.5rem;
    z-index: 10;
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
  z-index: 5;

  ${({ $sidebar }) =>
    $sidebar &&
    css`
      right: -20px;
    `}
    
  .nickName {
    margin-top: 47px;
    font-size: 2rem;
    font-weight: bold;
    transform: rotate(20deg);
  }
`;

const SideNavLink = styled.div`
  ${Flex}
  ${cursor}
  border-radius:20px;
  width: 40vw;
  height: 2em;
  font-size: 1.5rem;
  border: 1px solid black;
  background-color: #fff;
  transform: rotate(20deg);
  transition: all 0.2s;

  &:hover {
    transform: rotate(10deg);
    font-size: 2rem;
    width: 45vw;
    font-weight: bold;
    border: 3px solid black;
    height: 2em;
  }
`

export {NavLayout, NavInner, TitleH, SideBarBtn, SideBar, SideNavLink }