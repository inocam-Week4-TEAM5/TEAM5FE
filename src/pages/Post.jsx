import React, { useEffect, useRef, useState } from "react";
import { PostInput, PostLayout, PostWrite } from "../compononts/css/postStyle";
import { FlexBox } from "../styled";
import { usePostImgRTKMutation } from "../redux/api/api";

function Post() {
  const postRef = useRef(null);
  const [postText, setPostText] = useState("");
  const [postImgRTK] = usePostImgRTKMutation();

  const onChangeHeight = (e) => {
    setPostText(e.target.value);
    postRef.current.style.height = "auto";
    postRef.current.style.height = `${postRef.current.scrollHeight}px`;
  };

  const [postImge, sepostImg] = useState("");
  const onChangeFiles = (e) => {
    sepostImg(e.target.files);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const base64Images = [];

    const promises = []; // 변환 작업의 Promise를 저장할 배열

    for (let i = 0; i < postImge.length; i++) {
      const file = postImge[i];
      const reader = new FileReader();

      const promise = new Promise((resolve) => {
        reader.onload = () => {
          const base64Data = reader.result.split(",")[1]; // Base64 데이터 추출
          base64Images.push(base64Data); // Base64 데이터를 배열에 추가
          resolve();
        };
      });

      promises.push(promise);
      reader.readAsDataURL(file); // 파일을 Base64로 변환
    }

    await Promise.all(promises); // 모든 변환이 완료될 때까지 기다림
    
    console.log(base64Images);
    formData.append("images", base64Images);
    for (const x of formData.entries()) {
      console.log(x);
    }
    postImgRTK(formData)
  };

  useEffect(() => {
    postRef.current && postRef.current.focus();
  }, []);

  return (
    <PostLayout $fd="column" $gap="2rem">
      <PostWrite
        as="form"
        $fd="column"
        $jc="space-between"
        onSubmit={onSubmitHandler}
      >
        <PostInput
          ref={postRef}
          type="text"
          value={postText}
          placeholder="오늘의 대나무숲 이야기는?"
          onChange={onChangeHeight}
        />

        <FlexBox $jc="space-between" $type="mobilePost">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={onChangeFiles}
          ></input>
          <p>모든 사람이 답글을 달 수 있습니다. </p>
          <button
            disabled={!postText}
            onClick={onSubmitHandler}
            style={{ backgroundColor: postText && "yellow" }}
          >
            post
          </button>
        </FlexBox>
      </PostWrite>

      <div>보여주기</div>
    </PostLayout>
  );
}

export default Post;

// const onSubmitHandler = async (e) => {
//   e.preventDefault();
//   const formData = new FormData();
//   const base64Images = [];

//   const promises = []; // 변환 작업의 Promise를 저장할 배열

//   for (let i = 0; i < postImge.length; i++) {
//     const file = postImge[i];
//     const reader = new FileReader();

//     const promise = new Promise((resolve) => {
//       reader.onload = () => {
//         const base64Data = reader.result.split(",")[1]; // Base64 데이터 추출
//         base64Images.push(base64Data); // Base64 데이터를 배열에 추가
//         resolve();
//       };
//     });

//     promises.push(promise);
//     reader.readAsDataURL(file); // 파일을 Base64로 변환
//   }

//   await Promise.all(promises); // 모든 변환이 완료될 때까지 기다림

//   formData.append('images', [...base64Images])
//   postImgRTK(formData)
// };
