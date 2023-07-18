import React from 'react'
import panda from '../img/panda.png'
import panda4 from '../img/panda 4.png'
import { keyframes, styled } from 'styled-components'

export function NotFound() {
  return (
    <div>
      <NotFoundTitle $top={14}>페이지를 찾을 수 없습니다.</NotFoundTitle>
      <NotFoundTitle $top={15} $size={4.5}>NotFound</NotFoundTitle>
      <NotFoundTitle $top={25} >홈으로 (상단의 판다를 클릭해주세요) </NotFoundTitle>
      <PandaImg $left={2} $width={27} $bottom={-2} src={panda} alt='panda4'/>
      <PandaImg $right={5} $width={20} $bottom={5} src={panda4} alt='panda'/>


      panda
    </div>
  )
}


const PandaKeyFrames = keyframes`
    // from
    0% {
    transform: rotateY(-30deg);
  }
  // to
  100% {
    transform: rotateY(20deg);
  }
`

const PandaImg = styled.img`
  display: block;
  position: absolute;
  bottom: ${({$bottom})=>$bottom}vh;
  left: ${({$left})=>$left}vw;
  right: ${({$right})=>$right}vw;
  width: ${({$width})=>$width}em;
  animation : ${PandaKeyFrames} 2.5s infinite linear alternate;
  transform-style: preserve-3d;

  @media (max-width: 700px) {
    bottom: ${({$bottom})=>$bottom*0.5}vh;
    left: ${({$left})=>$left*0.5}vw;
    right: ${({$right})=>$right*0.5}vw;
    width: ${({$width})=>$width*0.5}em;
  }
`

const NotFoundTitle = styled.div`
  font-family: PartialSansKR-Regular;
  text-align: center;
  width: 100%;
  position: absolute;
  top: ${({$top})=> $top}vh;
  left: 50%;
  font-size: ${({$size})=>$size}rem;
  transform: translateX(-50%);
  z-index: 1;
`