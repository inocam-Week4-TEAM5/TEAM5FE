import React, { useEffect, useRef } from 'react'
import { styled } from 'styled-components';

export function Home() {
  const CanvasSection = useRef(null)

  const screnInfo = {
    imgs: {
      videImgCount: 418,
      imgSequence: [0,417],
      videoImages: []
    },
    objs : {
      CanvasSection
    }
  }

  const setCanvasImages = () => {
    let imgElem;
    for (let i = 0; i  < screnInfo.imgs.videImgCount; i++) {
      imgElem = new Image()
      imgElem.src = require(`../img/inobao/frame-000${i >= 100 ? i : i >=10 ? "0"+i : "00" + i}.jpg`)
      screnInfo.imgs.videoImages.push(imgElem)
    }
  }

  setCanvasImages()
  console.log(screnInfo.imgs.videoImages)

  const setLayout = () => {
    const heightRatio = window.innerHeight / 1080
  }


  const playAnimation = () => {}

  useEffect(()=> {

    setLayout()
  })

  return (
    <Layout>
      <StyickyElemCanvas>
        <Canvas ref={CanvasSection}  width="1980" height="1080"/>
      </StyickyElemCanvas>
    </Layout>
  )
}


const Layout = styled.div`
  position: relative;
  width : 100%;
  height: 1000vh;
`
const StyickyElemCanvas = styled.div`
	/* display: none; */
	position: fixed;
	left: 0;
	width: 100%;
  top: 0;
	height: 100%;
`

const Canvas = styled.canvas`
	position: absolute;
  width: 100%;
  height: 100%;
	top: 50%;
	left: 50%;
  background-color: #888;
  transform: translate(-50%, -50%) scale(1);
`

