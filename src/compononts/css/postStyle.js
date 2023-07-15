import { styled } from "styled-components";
import { FlexBox, Layout } from "../../styled";

const PostLayout = styled(FlexBox)`
  ${Layout}
  background-color: yellow;
`

const PostWrite = styled(FlexBox)`

  background-color: #ffff;
  margin-top: 30px;
  width: 90%;
  min-height: 150px;
  border-radius: 20px;
  padding: 1rem 2rem;
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

export { PostLayout, PostWrite, PostInput }