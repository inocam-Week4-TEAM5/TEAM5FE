import React from "react";

import * as Compo from "../compononts"; // 상대경로 설정
import { useGetPostRTKQuery } from "../redux";
// import { useToken } from "../hooks/useToken";

export function Post() {

  const {isLoading, data} = useGetPostRTKQuery()

  if (isLoading) return <div>로딩중</div>
  return (
    <Compo.PostLayout $fd="column" $gap="2rem">
      {/* Post 생성하기에 대한 뷰포트 */}
      <Compo.PostForm/>
      {/* Post 게시글 뷰포트 */}
      <Compo.PostsLayout>
        <Compo.PostBoxLayout>

        {data && data.map((posts, index) => index % 2 === 0 
          ? <Compo.PostBox key={index} data={posts}/>
          : <Compo.PostBox key={index} $backColor={"postsEven"} data={posts}/>
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