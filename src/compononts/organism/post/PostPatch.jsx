import React, { useContext, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { PostBtn, PostInput, PostWrite } from "../../css";
import { FlexBox, cursor } from "../../../styled";
import { TbEdit } from 'react-icons/tb' 
import { RiDeleteBin2Fill } from 'react-icons/ri'
import { FaComments } from 'react-icons/fa'
import { theme } from "../../../theme";
import { postIndividual } from "./PostBox";
import { useDeletePostsRTKMutation, useLikedPostRTKMutation, usePatchPostsRTKMutation, usePostCommentsRTKMutation } from "../../../redux";
import {AiFillHeart} from 'react-icons/ai'
import { useSelector } from "react-redux";
import { selectToken } from "../../../redux/modules/tokenSlice";

function PostPatch() {
  const {id, contents, liked, likeCount, nickname} = useContext(postIndividual)
  const [postText, setPostText] = useState(contents);
  const [comments, setComments] = useState("");
  const postRef = useRef(null);
  const commentRef = useRef(null);
  const [patchPostShow, setPatchPostShow] = useState(false)
  const [commentShow, setCommentShow] = useState(false)

  const [deletePostsRTK] = useDeletePostsRTKMutation()
  const [patchPostsRTK] = usePatchPostsRTKMutation()
  const [postCommentsRTK] = usePostCommentsRTKMutation()
  const [likedPostRTK] = useLikedPostRTKMutation()
  const {decodeToken} = useSelector(selectToken);

  
  const onDeleteHandler = () => {
    deletePostsRTK(id)
  }
  
  const onPatchHandler = () => {
    setPatchPostShow(!patchPostShow)
  }

  const onCommentInput = () => {
    console.log("업데이트", id);
    setCommentShow(!commentShow)
  }

  const onLikedClike = () => {
    likedPostRTK(id)
  }


  const onChangePost = (e) => {
    setPostText(e.target.value);
    postRef.current.style.height = "auto";
    postRef.current.style.height = `${postRef.current.scrollHeight}px`;
  };

  const onChangeComment = (e) => {
    setComments(e.target.value);
    commentRef.current.style.height = "auto";
    commentRef.current.style.height = `${commentRef.current.scrollHeight}px`;
  };


  const onSubmitPostHandler = (e) => {
    e.preventDefault()
    patchPostsRTK({id, data:{content:postText}})
    setPatchPostShow(!patchPostShow)
  }

  const onSubmitCommentsHandler = (e) => {
    e.preventDefault()
    comments && postCommentsRTK({postid:id, data:{content:comments}})
    setComments("")
    setCommentShow(!commentShow)
  }

  useEffect(()=> {
    postRef.current?.focus()
  },[patchPostShow])


  useEffect(()=> {
    commentRef.current?.focus()
  },[commentShow])

  return (
    <FlexBox $gap="0.5em">
      { decodeToken.nickname === nickname&& (<>
      <EditBtn onClick={onDeleteHandler}>{<RiDeleteBin2Fill size={"1rem"} color={theme.color.darkgreen}/>} 삭제</EditBtn>
      <EditBtn onClick={onPatchHandler}>{<TbEdit size={"1rem"} color={theme.color.lightgreen}/>} 수정</EditBtn>
      </>)}
      <EditBtn onClick={onLikedClike}>{<AiFillHeart color={!liked ? theme.color.gray : theme.color.orange }/>} 좋아요({likeCount})</EditBtn>
      <EditBtn onClick={onCommentInput}>{<FaComments size={"1rem"} color={theme.color.lightgreen}/>} 댓글달기</EditBtn>


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
  
          <PostInput ref={postRef} value={postText} type="text"  onChange={onChangePost} />
          
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
      {commentShow && (
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
          onSubmit={onSubmitCommentsHandler}
        >
  
          <PostInput ref={commentRef} type="text" value={comments}  onChange={onChangeComment} />
          
          <FlexBox $jc="end" $type="mobilePost">
            <PostBtn
              // $height={}
              disabled={!postText}
              onClick={onSubmitCommentsHandler}
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

export default PostPatch;

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