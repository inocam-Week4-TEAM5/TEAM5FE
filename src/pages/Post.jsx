import React from "react";
import axios from "axios";
import * as Compo from "../compononts"; // 상대경로 설정

export function Post() {
  
  const onLoginHandler = async () => {
    try {
      let res = await axios.post(`${process.env.REACT_APP_INOCAM_KEY}/api/auth/login`, {
        username: "asdf1111",
        password: "asdf1111"
      })
      console.log(res)
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Compo.PostLayout $fd="column" $gap="2rem">
      {/* Post 생성하기에 대한 뷰포트 */}
      <Compo.PostForm/>

      {/* Post 게시글 뷰포트 */}
      <button onClick={onLoginHandler}>로그인 테스트1</button>
      <Compo.PostsLayout>
        <Compo.PostBoxLayout>

        {Array.from({length:10}, () => 0).map((_,index) => index % 2 === 0 
          ?  <Compo.PostBox key={index}/>
          :  <Compo.PostBox key={index} $backColor={"postsEven"}/>
        )}  
        
        </Compo.PostBoxLayout>
      </Compo.PostsLayout>
    </Compo.PostLayout>
  );
}

/*
  이미지 리사이징 관련 
  https://velog.io/@runprogrmm/React-browser-image-compression%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EB%A6%AC%EC%82%AC%EC%9D%B4%EC%A7%95
  https://goddino.tistory.com/379
*/
