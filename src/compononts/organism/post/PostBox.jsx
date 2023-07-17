import React, { useState } from "react";
import { PostsBox, PostsComment } from "../../css";
import { PostBoxIndividual } from "../../molecule";

export function PostBox(props) {
  const [showComment, setShowcomment] = useState(false);

  return (
    <PostsBox {...props} $ai="flex-start" $gap="1em">
      <PostBoxIndividual>
          <div
            onClick={() => setShowcomment(!showComment)}
            children={
              showComment
                ? "4개의 댓글 18시간 전 마지막 댓글, (댓글 닫기)"
                : "4개의 댓글 18시간 전 마지막 댓글, (댓글 보기)"
            }
          />
          {showComment &&
            Array.from({ length: 4 }, () => 0).map(() => (
              <PostsComment
                $fd="column"
                $ai="start"
                $gap=".5em"
                style={{ width: "100%" }}
              >
                <PostBoxIndividual />
              </PostsComment>
            ))}
      </PostBoxIndividual>
    </PostsBox>
  );
}
