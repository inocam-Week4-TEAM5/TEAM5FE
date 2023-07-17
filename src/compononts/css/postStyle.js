import { css, styled } from "styled-components";
import { Flex, FlexBox, Layout, cursor } from "../../styled";

const PostLayout = styled(FlexBox)`
  ${Layout}
  margin-top: ${({theme}) => theme.headerHeight};
  margin-bottom: 5vh;
`

const PostWrite = styled(FlexBox)`
  background-color: ${({theme}) => theme.color.white};
  margin-top: ${({$mTop}) => $mTop}px;
  width: 90%;
  min-height: 150px;
  border-radius:${({$borderR}) => `${$borderR}px`};
  padding: 1rem 2rem;
  ${({$border, theme}) => $border && css`
    border: 1px solid ${theme.color.gray};
  `}
  ${({$backColor, theme}) => $backColor === "postsEven" &&
    css`
      background-color: ${theme.color.lightgreen2};
    `
  }
`

const PostInput = styled.textarea`
  outline: none;
  border: none;
  font-size: 1.2rem;
  width: 100%;
  height: 60px;
  resize: none;
  overflow: hidden;

  &::placeholder {
    font-size: 1.2rem;
    font-weight: 800;
  }
`

const PhotoBtn = styled.div`
  width: 100%;

  label {
    width: fit-content;
    ${cursor}
    ${Flex}
    justify-content: flex-start;
    gap: 0.3em;
    &:hover {
      color : ${({theme}) => theme.color.green}
    }
  }
`

const PostBtn = styled.div`
  width: 100px;
  height: fit-content;
  border-radius: 20px;
  padding: 0 0.5em;
  background-color: ${({theme}) => theme.color.gray};
  color: ${({theme}) => theme.color.white};
  ${Flex}
  transition: all 0.5s;

  ${({$postText}) => $postText && css`
  ${cursor}
    background-color: ${({theme}) => theme.color.green};
    width: 150px;
  `}
`

const PostsLayout = styled(FlexBox)`
  flex-direction: column;
  width: 100%;
`
const PostBoxLayouy = styled.div`
  border: 1px solid ${({theme}) => theme.color.gray};
  width: 90%;
  border-radius: 20px;
  overflow: hidden;
`

const PostsBox = styled(PostWrite)`
  ${Flex}
  width: 100%;
  min-height: fit-content;
`
const PostsText = styled.div`
    /* overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical; */
`

const PostsComment = styled.div`
  ${Flex}
  width: 100%;
  /* background-color: yellow; */
`


export { PostLayout, PostWrite, PostInput, PhotoBtn,PostBtn, PostsLayout, PostBoxLayouy, PostsBox, PostsText, PostsComment }