import React, { createContext, useState } from "react";
import { PostsBox, PostsComment } from "../../css";
import { PostBoxIndividual } from "../../molecule";
import { FlexBox } from "../../../styled";
import PostPatch from "./PostPatch";
import { CommnetBoxIndividual } from "../../molecule/post/CommnetBoxIndividual";
import { theme } from "../../../theme";
export const postIndividual = createContext(null)

export function PostBox({ data, ...rest }) {
  const [showComment, setShowcomment] = useState(false);
  const { commentList, nickname } = data
  const showCommentToggle = () => {
    commentList.length > 0 && setShowcomment(!showComment)
  }
  return (
    <postIndividual.Provider value={data}>
    <PostsBox {...rest} $ai="flex-start" $gap="1em">
      <PostBoxIndividual>
        <FlexBox $gap=".5em">
          <div
            onClick={showCommentToggle}
            
            children={
              !showComment
                ? commentList.length === 0
                ? <div style={{borderRadius:"50px", padding:".1em .5em", backgroundColor:theme.color.darkgreen, color:theme.color.white}}>댓글{commentList.length}개</div>
                : <div style={{borderRadius:"50px", padding:".1em .5em", cursor:"pointer", backgroundColor:theme.color.darkgreen, color:theme.color.white}} >댓글{commentList.length}개, 댓글 보기</div>
                : <div style={{borderRadius:"50px", padding:".1em .5em", cursor:"pointer", backgroundColor:theme.color.darkgreen, color:theme.color.white}} >댓글{commentList.length}개, 댓글 닫기</div>
            }
          />
          <PostPatch />
        </FlexBox>
        {showComment &&
          commentList.map((comments, index) => (
            <PostsComment
              key={index}
              $fd="column"
              $ai="start"
              $gap=".5em"
              style={{ width: "100%" }}
            >
            <CommnetBoxIndividual comments={comments}/>
            </PostsComment>
          ))}
      </PostBoxIndividual>
    </PostsBox>
    </postIndividual.Provider>
  );
}
