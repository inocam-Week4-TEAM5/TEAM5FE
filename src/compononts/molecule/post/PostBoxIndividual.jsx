import React, { useContext } from "react";
import { UserImg } from "../../atom";
import { theme } from "../../../theme";
import { FlexBox } from "../../../styled";
import { PostsText } from "../../css/postStyle";
import { postIndividual } from "../../organism";
import { useGetTime } from "../../../hooks/useGetTime";

export function PostBoxIndividual ({children}) {
  const {nickname,contents, imageUrls,createdDate} = useContext(postIndividual)
  const {timehandle}  = useGetTime()
  return (
    <>
      <UserImg size={20} color={theme.color.gray} icolor={theme.color.white} />
      <FlexBox $fd="column" $ai="start" $gap=".5em" style={{ width: "100%" }}>
        <FlexBox $jc="space-between" style={{ width: "100%"}}>
          <div style={{ fontFamily: 'YanoljaYacheR', fontSize:"16px"}} children={nickname}/>
          <div children={timehandle(createdDate)}/>
        </FlexBox>
        <FlexBox $jc="flex-start" $ai="center" $gap="3.3%" $type="imageUrls" style={{ width: "100%", flexWrap: "wrap" }}>
          {imageUrls && imageUrls.map((img, inx) => ( <img key={inx}  style={{display:"block", marginBottom:"10px"}} src={img} width="22.5%" alt="previewImg" /> ))}
        </FlexBox>
        <PostsText
          style={{ textAlign: "justify", wordBreak: "break-word" }}
          children={contents}/>
        {children}
      </FlexBox>
    </>
  );
}
