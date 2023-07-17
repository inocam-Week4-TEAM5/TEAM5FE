import React from "react";
import {
  PostBoxLayouy,
  PostLayout,
  PostsLayout,
} from "../compononts/css/postStyle";
import PostForm from "../compononts/organism/post/PostForm";
import axios from "axios";
import PostBox from "../compononts/organism/post/PostBox";

function Post() {

  const onLoginHandler = async () => {
    try {
      let res = await axios.post(`${process.env.REACT_APP_INOCAM_KEY}/api/auth/login`, {
        email: "zs2311@gmail.com",
        passward: "sassdf"
      })
      console.log(res)
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <PostLayout $fd="column" $gap="2rem">
      {/* Post 생성하기에 대한 뷰포트 */}
      <PostForm/>

      {/* Post 게시글 뷰포트 */}
      <button onClick={onLoginHandler}>로그인 테스트</button>
      <PostsLayout>
        <PostBoxLayouy>

        {Array.from({length:10}, () => 0).map((_,index) => index % 2 === 0 
          ?  <PostBox key={index}/>
          :  <PostBox key={index} $backColor={"postsEven"}/>
        )}  
        
        </PostBoxLayouy>
      </PostsLayout>
    </PostLayout>
  );
}

export default Post;

/*
  이미지 리사이징 관련 
  https://velog.io/@runprogrmm/React-browser-image-compression%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EB%A6%AC%EC%82%AC%EC%9D%B4%EC%A7%95
  https://goddino.tistory.com/379
*/
