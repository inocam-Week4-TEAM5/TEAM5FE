import React, { createContext }  from "react";
import { UserImg } from "../../atom";
import { theme } from "../../../theme";
import { FlexBox } from "../../../styled";
import { PostsText } from "../../css/postStyle";
import { useGetTime } from "../../../hooks/useGetTime";
import CommentPatch from "../../organism/post/CommentPatch";
export const commentsContext = createContext(null)

export function CommnetBoxIndividual ({comments, children}) {
  
  const {timehandle}  = useGetTime()
  return (
    <>
    <commentsContext.Provider value={comments}>
      <UserImg size={20} color={theme.color.gray} icolor={theme.color.white} />
      <FlexBox $fd="column" $ai="start" $gap=".5em" style={{ width: "100%" }}>
        <FlexBox $jc="space-between" style={{ width: "100%"}}>
          <div style={{ fontFamily: 'YanoljaYacheR', fontSize:"16px"}}  children={comments.nickname}/>
          <div children={timehandle(comments.createdDate)}/>
        </FlexBox>
        <FlexBox $jc="flex-start" $ai="center" $gap="3.3%" style={{ width: "100%", flexWrap: "wrap" }}>
        </FlexBox>
        <PostsText
          style={{ textAlign: "justify", wordBreak: "break-word" }}
          children={comments.content}/>
        {children}
      </FlexBox>
      <CommentPatch commentsId={comments.id} comment={comments.content} liked={comments.liked} likeCount={comments.likeCount}/>
      </commentsContext.Provider>
    </>
  );
}
