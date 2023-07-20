import React, { useEffect, useRef, useState } from "react";
import panda from "../img/panda.png";
import * as Comp from "../compononts/css/homeStyle";

export function Home() {
  /* (1) DOM-Element -------- -------- -------- -------- -------- -------- -------- */
  const scrollSection0 = useRef(null);
  const scrollSection1 = useRef(null);
  const StyickyElemCanvasRef = useRef(null);
  const CanvasSectionRef = useRef(null);
  const [count, setCount] = useState(0);

  /* (2) Home 내부에서 사용할 변수 모음 -------- -------- -------- -------- -------- --------  */
  let yoffset = 0; // 현재 스크롤의 위치에 대한 정보
  let preScrollHeigth = 0; // 현재 섹션 이전 섹션들의 높이의 합
  let currentScene = 0; // 진입된 현재 스크롤의 Section 위치
  let enterNewScene = false; // preScrollHeigth과 currentScene를 제어하기 위한 진위 값

  /* (3) 인터렉션 상태 관련부분 -------- -------- -------- -------- -------- -------- -------- */
  const screnInfo = [
    /*
      scrollSection0 - 간단한 프로젝트에 대한 소개를 기록하고자 한다. 
    */
    {
      type: "normal",
      heightNum: 5,
      scrollHeight: 0,
      objs: { contaniner: scrollSection0 },
    },

    /*
        scrollSection1 - Canvas는 섹션 2에서 다룰 예정이다. 
        섹션2에 진입하면 화면 전체에 화면이 그려지는 방식이다. 
     */
    {
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        contaniner: scrollSection1,
        StyickyElemCanvasRef,
        CanvasSectionRef,
        videoImages: [],
      },
      values: { videImgCount: 418, imagesSequence: [0, 299] },
    },
  ];

  /* (4) 이미지 로드에 대한 부분 -------- -------- -------- -------- -------- -------- -------- */
  const setCanvasImages = () => {
    let imgElem;
    for (let i = 0; i < screnInfo[1].values.videImgCount; i++) {
      imgElem = new Image();
      imgElem.src = require(`../img/inobao/frame-000${
        i >= 100 ? i : i >= 10 ? "0" + i : "00" + i
      }.jpg`);
      screnInfo[1].objs.videoImages.push(imgElem);
    }
  };
  setCanvasImages();

  /* (5) 페이지 세팅에 대한 부분 -------- -------- -------- -------- -------- -------- -------- */
  const setLayout = () => {
    /* 
      각 세션의 스크롤에 대한 높이 설정 
        a) screnInfo[i].type에 따라서 높이를 가변적으로 적용해주려고 한다. 
        b) type은 sticky(scrollSection1, scrollSection3) 또는 normal(scrollSection2) 로 구분되어 있다. 
    */
    for (let i = 0; i < screnInfo.length; i++) {
      screnInfo[i].type === "sticky"
        ? (screnInfo[i].scrollHeight =
            screnInfo[i].heightNum * window.innerHeight)
        : (screnInfo[i].scrollHeight = window.innerHeight / 2);
      screnInfo[
        i
      ].objs.contaniner.current.style.height = `${screnInfo[i].scrollHeight}px`;
    }

    /*
      캔버스 사이즈에 대한 조정은 이곳에서 제어된다. 
        a) 아래서 선언할 캔버스의 height는 1080이다. 
        b) 그러나 브라우저마다 그려지는 화면비는 다르기에, 동적으로 이를 제어해야 한다. 
    */
    screnInfo[1].objs.StyickyElemCanvasRef.current.style.display = "block";
    const heightRatio = window.innerHeight / 1080; // 높이가 1080이면 1이 나오겠지만 그 아래는 비율로 산출될 것이다.
    screnInfo[1].objs.CanvasSectionRef.current.style.transform = `scale(${heightRatio})`; // 사이드 이펙트의 결과로, 동적비율을 가지게 된다.

    // 새로고침시 대응하도록
    let totalScrollHeight = 0;
    for (let i = 0; i < screnInfo.length; i++) {
      totalScrollHeight += screnInfo[i].scrollHeight;
      if (totalScrollHeight >= window.scrollY) {
        currentScene = i;
        break;
      }
    }
    setCount(currentScene);
  };

  /* (6) 섹션 내에서의 애니메이션 컨트롤러 -------- -------- -------- -------- -------- -------- */

  const calcValues = (value, currenYoffset) => {
    const scrollHeight = screnInfo[currentScene].scrollHeight;
    let scrollRatio = currenYoffset / scrollHeight;
    return parseInt(scrollRatio * (value[1] - value[0]) + value[0]); // // 현재 섹션 대비, 스크롤된 곳
  };

  /* (7) 섹션 내에서의 애니메이션 컨트롤러 -------- -------- -------- -------- -------- -------- */
  const playAnimation = () => {
    const values = screnInfo[currentScene].values;
    const objs = screnInfo[currentScene].objs;
    const currentYoffset = yoffset - preScrollHeigth; // 각 섹션의 현재 위치 값 구하기
    switch (currentScene) {
      case 0:
        let scrollRatio = currentYoffset / screnInfo[currentScene].scrollHeight;
        screnInfo[1].objs.CanvasSectionRef && screnInfo[1].objs.CanvasSectionRef.current
          ?.getContext("2d")
          .drawImage(screnInfo[1].objs.videoImages[1], 0, 0); // 100 , 100 너비높이도 추가할 수 있습니다.
        StyickyElemCanvasRef.current && 
        (StyickyElemCanvasRef.current.style.transform = `translateY(${parseInt((1 - scrollRatio) * 70)}vh)`)

        if (scrollRatio < 0.9) {
          screnInfo[1].objs.StyickyElemCanvasRef && (screnInfo[1].objs.StyickyElemCanvasRef.current.style.opacity =
            scrollRatio)
        } else {
          screnInfo[1].objs.StyickyElemCanvasRef && (screnInfo[1].objs.StyickyElemCanvasRef.current.style.opacity = 1)
        }
        return;
      case 1:
        let sequence = calcValues(values.imagesSequence, currentYoffset);
        objs.CanvasSectionRef && objs.CanvasSectionRef.current
          .getContext("2d")
          .drawImage(objs.videoImages[sequence], 0, 0); // 100 , 100 너비높이도 추가할 수 있습니다.
        return;
      case 2:
        return;
      default:
        return;
    }
  };

  /* (8) currentScene 컨트롤러 -------- -------- -------- -------- -------- -------- */
  const scrollLoop = () => {
    // console.log("scrollLoop -> yoffset", yoffset, "preScrollHeigth", preScrollHeigth);
    /*
      a) enterNewScene - 새로운 Section에 진입했음을 말해주고
      b) preScrollHeigth - 새로운 Section에 진입했음에 대한 preScrollHeigth 초기화 
      c) preScrollHeigth 에 대해서 currentScene(현재 Section) 이전의 모든 scrollHeight 더해주기 
    */
    enterNewScene = false;
    preScrollHeigth = 0;
    for (let i = 0; i < currentScene; i++) {
      preScrollHeigth += screnInfo[i].scrollHeight;
    }
    if (
      currentScene < 4 &&
      yoffset > preScrollHeigth + screnInfo[currentScene].scrollHeight
    ) {
      enterNewScene = true;
      currentScene++;
    }
    if (currentScene > 0 && yoffset < preScrollHeigth) {
      enterNewScene = true;
      currentScene--;
    }
    if (enterNewScene) return;
    playAnimation();
  };

  /* (9) 사이드 이팩트 -------- -------- -------- -------- -------- -------- -------- */

  useEffect(() => {
    setLayout();
    window.addEventListener("load", setLayout); // 새로고침 시에도 대응할 수 있도록
    window.addEventListener("resize", setLayout); // 리사이징 시에도 대응할 수 있도록

    const handleScroll = () => {
      yoffset = window.scrollY;
      scrollLoop();
      setCount(currentScene);
    }

    window.addEventListener("scroll", handleScroll); // 스크롤 이밴트 발생 

    return () => {
      window.removeEventListener("load", setLayout);
      window.removeEventListener("resize", setLayout);
      window.removeEventListener("scroll", handleScroll); // 라우터가 변경되어도 전역 window 등록한 scroll 가 동작하여 에러발생
    }
  }, [currentScene]);



  return (
    <Comp.Layout>
      {/* ScrollSection0 */}
      <Comp.ScrollSection ref={scrollSection0}>
        <Comp.FigureImg>
          <img src={panda} alt="panda" />
        </Comp.FigureImg>
        <Comp.HomeTitle>
          <p>
            {" "}
            이노캠의{" "}
            <span
              style={{ fontFamily: "PartialSansKR-Regular", fontSize: "3vw" }}
            >
              마스코트 이노바오
            </span>
            가 사는
          </p>
          <p>향긋한 대나무숲에 오신 여러분을 환영합니다!</p>
          <p>이노바오와 함께 이노캠에서의 추억을 남겨보세요</p>
          <p style={{ fontSize: "1.5vw", marginTop: "2rem" }}>
            ⇩⇩⇩⇩ 화면을 아래로 내려보세요 ⇩⇩⇩⇩
          </p>
        </Comp.HomeTitle>
      </Comp.ScrollSection>
      {/* ScrollSection1 */}
      <Comp.ScrollSection
        ref={scrollSection1}
        children={
          <Comp.StyickyElemCanvas ref={StyickyElemCanvasRef}>
            <Comp.Canvas ref={CanvasSectionRef} width={1980} height={1080} />
          </Comp.StyickyElemCanvas>
        }
      />
    </Comp.Layout>
  );
}
