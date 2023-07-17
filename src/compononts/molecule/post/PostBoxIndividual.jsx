import React from "react";
import { UserImg } from "../../atom";
import { theme } from "../../../theme";
import { FlexBox } from "../../../styled";
import { PostsText } from "../../css/postStyle";

export function PostBoxIndividual ({children}) {
  return (
    <>
      <UserImg size={20} color={theme.color.gray} icolor={theme.color.white} />
      <FlexBox $fd="column" $ai="start" $gap=".5em" style={{ width: "100%" }}>
        <div children="NickName" />
        <PostsText
          style={{ textAlign: "justify", wordBreak: "break-word" }}
          children="aaa aaa aaa aaa aaa aaa"/>
        {children}
      </FlexBox>
    </>
  );
}
