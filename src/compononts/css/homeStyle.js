import { styled } from "styled-components";

const FigureImg = styled.figure`
  position: absolute;
  bottom: 0;
  right: 5vw;
  width: 10vw;

  img {
    width: 100%;
    transform: rotateY(180deg);
  }
`;

const HomeTitle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80vw;
  margin: 0 auto;
  text-align: center;

  p {
    font-size: 4vw;
    font-family: "YanoljaYacheR";

    @media (min-width: 1000px) {
      font-size: 3.5rem;
    }
  }
`;

const Layout = styled.section`
  position: relative;
`;

const ScrollSection = styled.div`
  position: relative;
  min-height: 300px;
  padding-top: ${({ theme }) => theme.headerHeight};
`;

const StyickyElemCanvas = styled.div`
  position: fixed;
  left: 0;
  width: 100%;
  top: 0;
  height: 100%;
`;
const Canvas = styled.canvas`
  width: 100%;
`;

export { Layout, FigureImg,HomeTitle, ScrollSection, StyickyElemCanvas, Canvas }