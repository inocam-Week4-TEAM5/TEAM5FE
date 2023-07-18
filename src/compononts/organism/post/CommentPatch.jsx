import React, { useContext, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { PostBtn, PostInput, PostWrite } from "../../css";
import { FlexBox, cursor } from "../../../styled";
import { TbEdit } from 'react-icons/tb' 
import { RiDeleteBin2Fill } from 'react-icons/ri'
import { theme } from "../../../theme";
import { postIndividual } from "./PostBox";
import { useDeleteCommentsRTKMutation, useLikedCommentRTKMutation, usePatchCommentsRTKMutation, } from "../../../redux";
import { AiFillHeart } from 'react-icons/ai'

function CommentPatch({commentsId, comment, liked, likeCount}) {
  const [postText, setPostText] = useState(comment);
  const { id } = useContext(postIndividual)
  const postRef = useRef(null);
  const [patchPostShow, setPatchPostShow] = useState(false)
  const [deleteCommentsRTK] = useDeleteCommentsRTKMutation()
  const [patchCommentsRTK] = usePatchCommentsRTKMutation()
  const [likedComment] = useLikedCommentRTKMutation()

  const onDeleteHandler = () => {
    deleteCommentsRTK({postid:id, commentsId})
  }
  
  const onPatchHandler = () => {
    setPatchPostShow(!patchPostShow)
  }

  const onChangePost = (e) => {
    setPostText(e.target.value);
    postRef.current.style.height = "auto";
    postRef.current.style.height = `${postRef.current.scrollHeight}px`;
  };

  const onSubmitPostHandler = (e) => {
    e.preventDefault()
    patchCommentsRTK({postid:id, commentsId, data:{content:postText}})
    setPatchPostShow(!patchPostShow)
  }

  const onLikedClike = () => {
    likedComment(commentsId)
  }

  useEffect(()=> {
    postRef.current?.focus()
  },[patchPostShow])

  // if (window.event.keyCode == 13) 
  return (
    <FlexBox $gap="0.5em">
      <EditBtn onClick={onDeleteHandler}>{<RiDeleteBin2Fill size={"1rem"} color={theme.color.darkgreen}/>} 삭제</EditBtn>
      <EditBtn onClick={onPatchHandler}>{<TbEdit size={"1rem"} color={theme.color.lightgreen}/>} 수정</EditBtn>
      <EditBtn onClick={onLikedClike}>{<AiFillHeart color={!liked ? theme.color.gray : theme.color.orange }/>} 좋아요({likeCount})</EditBtn>


      {patchPostShow && (
        <PostPatchInput>
        <PostWrite
          $minH="fit-content"
          style={{margin: "0 auto"}}
          as="form"
          // $fd="column"
          $jc="space-between"
          $mTop={30}
          $borderR={20}
          $border={true}
          $gap=".5em"
          onSubmit={onSubmitPostHandler}
        >
  
          <PostInput as="input" ref={postRef} value={postText} type="text"  onChange={onChangePost} />
          
          <FlexBox $jc="end" $type="mobilePost">
            <PostBtn
              // $height={}
              disabled={!postText}
              onClick={onSubmitPostHandler}
              $postText={postText}
              children="post"
            />
          </FlexBox>
        </PostWrite>
        </PostPatchInput>
      )}
    </FlexBox>
  );
}

export default CommentPatch;

const PostPatchInput = styled.div`
  max-width: 1200px;
  width: 100%;
  padding: 2.5em 0 0.5em;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255,255,255,0.1);
  backdrop-filter: blur(1px);
`

const EditBtn = styled(FlexBox)`
  ${cursor}
  &:hover {
    font-weight: 800;
  }
`