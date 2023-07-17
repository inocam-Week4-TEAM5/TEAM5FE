import React, { useEffect, useRef, useState } from "react";
import { PhotoBtn, PostBtn, PostInput, PostLayout, PostWrite, PostsBox, PostsComment, PostsLayout, PostsText } from "../compononts/css/postStyle";
import { FlexBox } from "../styled";
import { usePostImgRTKMutation } from "../redux/api/api";
import imageCompression from 'browser-image-compression'
import { HiPhotograph } from 'react-icons/hi'
import UserImg from "../compononts/atom/UserImg";
import { theme } from "../theme";

function Post() {
  const postRef = useRef(null);
  const [postText, setPostText] = useState("");
  const [comment, setcomment] = useState(false);
  const [postImgRTK] = usePostImgRTKMutation();

  const onChangeHeight = (e) => {
    setPostText(e.target.value);
    postRef.current.style.height = "auto";
    postRef.current.style.height = `${postRef.current.scrollHeight}px`;
  };


  // 이미지 리사이징 
  const actionImgResize = async (files) => {
    const options = {
      maxSizeMB: 2, // 1000000b === 1000kb === 1mb
      maxWidthOrHeight: 500,
      useWebWorker:true
    }
    try {
      const compressBlob = await imageCompression(files, options)
      const compressFile = new File([compressBlob], files.name, {type:files.type})
      // https://velog.io/@runprogrmm/React-browser-image-compression%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EB%A6%AC%EC%82%AC%EC%9D%B4%EC%A7%95
      // https://goddino.tistory.com/379
      return compressFile
    } catch (e) {
      console.log(e.message);
    }
    }

  // 화면에 보여주기
  const [postImge, setpostImg] = useState("");
  const [showImg, setShowImg] = useState([])
  const onChangeFiles = async (e) => {
    // 이미지 미리보기에 대한 url생성
    for(let i=0; i < e.target.files.length; i++) {
      
      let file = e.target.files[i]
      let reader = new FileReader();
      reader.onload = () => {
        setShowImg((showImg) => [...showImg, reader.result])
      };
      reader.readAsDataURL(file);
    }

    // 이미지 리사이징에 대한 처리 
    const compressingImg = []
    for (let i = 0; i < e.target.files.length; i++) {
      const compressed = await actionImgResize(e.target.files[i])
      compressingImg.push(compressed)
    }
    setpostImg(compressingImg);

  };



  const onSubmitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    for (let i = 0; i < postImge.length; i++) {
      formData.append('images', postImge[i])
    }
    postImgRTK(formData)
  }


  useEffect(() => {
    postRef.current && postRef.current.focus();
  }, []);

  return (
    <PostLayout $fd="column" $gap="2rem">
      <PostWrite
        as="form"
        $fd="column"
        $jc="space-between"
        $mTop={30}
        $borderR={20}
        $border={true}
        onSubmit={onSubmitHandler}
      >
        <PostInput
          ref={postRef}
          type="text"
          value={postText}
          placeholder="오늘의 대나무숲 이야기는?"
          onChange={onChangeHeight}
        />
        <FlexBox $jc="flex-start" style={{width:"100%", flexWrap:"wrap"}} >
          {showImg && showImg.map((img, inx) => <img key={inx} src={img} width="100px" alt="previewImg"/>)}
        </FlexBox>
          <PhotoBtn >
          <label htmlFor="postFile">{<><HiPhotograph size={"1.5em"}/><p>이미지 첨부하기</p></>}</label>
          
          <input
            id="postFile"
            type="file"
            multiple
            accept="image/*"
            style={{display:"none"}}
            onChange={onChangeFiles} />
          </PhotoBtn>
        <FlexBox $jc="space-between" $type="mobilePost">
          
          <p>모든 사람이 답글을 달 수 있습니다. </p>
          <PostBtn
            disabled={!postText}
            onClick={onSubmitHandler}
            $postText={postText}
            children="post" />
        </FlexBox>
      </PostWrite>

      <PostsLayout>
        <div style={{border:"1px solid gray", width:"90%", borderRadius:"20px", overflow:"hidden"}}>
          <PostsBox $ai="flex-start" $gap="1em">
          <UserImg size={20} color={theme.color.gray} icolor={theme.color.white}/>
            <FlexBox $fd="column" $ai="start" $gap=".5em" style={{width:"100%"}}>
            <div>NickName</div>
            <PostsText  style={{textAlign:"justify", wordBreak:"break-word"}}>aaa aaa aaa aaa aaa aaa</PostsText>
            <div onClick={()=>setcomment(!comment)}>4개의 댓글 18시간 전 마지막 댓글</div>
            {comment && <>
            
              <PostsComment $fd="column" $ai="start" $gap=".5em" style={{width:"100%"}}>
            <UserImg size={20} color={theme.color.gray} icolor={theme.color.white}/>
              <FlexBox $fd="column" $ai="start" $gap=".5em" style={{width:"100%"}}>
              <div>NickName</div>
              <PostsText  style={{textAlign:"justify", wordBreak:"break-word"}}>aaa aaa aaa aaa aaa aaa</PostsText>
              </FlexBox>
              </PostsComment>

              <PostsComment $fd="column" $ai="start" $gap=".5em" style={{width:"100%"}}>
            <UserImg size={20} color={theme.color.gray} icolor={theme.color.white}/>
              <FlexBox $fd="column" $ai="start" $gap=".5em" style={{width:"100%"}}>
              <div>NickName</div>
              <PostsText  style={{textAlign:"justify", wordBreak:"break-word"}}>aaa aaa aaa aaa aaa aaa</PostsText>
              </FlexBox>
              </PostsComment>

            </>}
            </FlexBox>
          </PostsBox>
          <PostsBox $backColor={"postsEven"} $ai="flex-start" $gap="1em">
          <UserImg size={20} color={theme.color.gray} icolor={theme.color.white}/>
            <FlexBox $fd="column" $ai="start" $gap=".5em" style={{width:"100%"}}>
            <div>NickName</div>
            <PostsText  style={{textAlign:"justify", wordBreak:"break-word"}}>aaa aaa aaa aaa aaa aaa</PostsText>
            <div>4개의 댓글 18시간 전 마지막 댓글</div>
            </FlexBox>
          </PostsBox>
          <PostsBox $ai="flex-start" $gap="1em">
          <UserImg size={20} color={theme.color.gray} icolor={theme.color.white}/>
            <FlexBox $fd="column" $ai="start" $gap=".5em" style={{width:"100%"}}>
            <div>NickName</div>
            <PostsText  style={{textAlign:"justify", wordBreak:"break-word"}}>aaa aaa aaa aaa aaa aaa</PostsText>
            <div>4개의 댓글 18시간 전 마지막 댓글</div>
            </FlexBox>
          </PostsBox>
          <PostsBox $backColor={"postsEven"} $ai="flex-start" $gap="1em">
          <UserImg size={20} color={theme.color.gray} icolor={theme.color.white}/>
            <FlexBox $fd="column" $ai="start" $gap=".5em" style={{width:"100%"}}>
            <div>NickName</div>
            <PostsText style={{textAlign:"justify", wordBreak:"break-word"}}>aaa aaa aaa aaa aaa aaa</PostsText>
            <div>4개의 댓글 18시간 전 마지막 댓글</div>
            </FlexBox>
          </PostsBox>
          <PostsBox $ai="flex-start" $gap="1em">
          <UserImg size={20} color={theme.color.gray} icolor={theme.color.white}/>
            <FlexBox $fd="column" $ai="start" $gap=".5em" style={{width:"100%"}}>
            <div>NickName</div>
            <PostsText  style={{textAlign:"justify", wordBreak:"break-word"}}>aaa aaa aaa aaa aaa aaa</PostsText>
            <div>4개의 댓글 18시간 전 마지막 댓글</div>
            </FlexBox>
          </PostsBox>
          <PostsBox $backColor={"postsEven"} $ai="flex-start" $gap="1em">
          <UserImg size={20} color={theme.color.gray} icolor={theme.color.white}/>
            <FlexBox $fd="column" $ai="start" $gap=".5em" style={{width:"100%"}}>
            <div>NickName</div>
            <PostsText style={{textAlign:"justify", wordBreak:"break-word"}}>aaa aaa aaa aaa aaa aaa</PostsText>
            <div>4개의 댓글 18시간 전 마지막 댓글</div>
            </FlexBox>
          </PostsBox>
        </div>
      </PostsLayout>

    </PostLayout>
  );
}

export default Post;
