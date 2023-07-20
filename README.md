# Inocam Week4 - TEAM 9 

## 이노캠 대나무숲 
<details>
<summary>Page 상세내용</summary>

  |page|설명|
  |:--|:--|
  |Home|인터렉티브를 활용한 반응형 Home |
  |Post, PostWrite|이노캠 사용자들의 대나무숲 커뮤니티|
  |Login, Register|로그인과 화원가입 페이지|
  |Admin|관리자 페이지|

### page 컴포넌트
  |src > page|컴포넌트 설명|
  |:--|:--|
  |App.jsx| Router 설정|
  |Home.jsx|인터렉티브를 활용한 반응형 Home |
  |Post.jsx|이노캠 사용자들의 대나무숲 커뮤니티(게시글, 댓글)|
  |PostWrite.jsx|이노캠 사용자들의 대나무숲 커뮤니티 생성|
  |Login.jsx|로그인 페이지|
  |Register.jsx|화원가입 페이지|
  |Admin.jsx|관리자 페이지|
  |NotFound.jsx|존재하지 않는 페이지 진입시|
  |ErrorBoundery.jsx|에러 발생시 진입 페이지|
</details>

<details>
<summary>라이브러리 관련</summary>

  |라이브러리|버전|라이브러리 설명|
  |:--|:--:|:--|
  |axios|^0.0.0|비동기 통신을 위한 프로미스 가반 라이브러리|
  |dayjs|^0.0.0|날짜 포멧팅을 위한 라이브러리|
  |react-router-dom|^0.0.0|SPA 기반 React에서의 라우팅 처리를 위한 라이브러리|
  |@reduxjs/toolkit react-redux|^0.0.0|전역 또는 네트워크 상태 관리를 위한 라이브러리|
  |styled-compononts|^0.0.0|Css in JS|
  

</details>

<details>
<summary>테스트 계정 셍성(로그인)</summary>

    테스트계정(1)
    로그인ID : qqq@qqq.com
    로그인PW : 1!qQ1!qQ

    테스트계정(2)
    로그인ID : kozy@gmail.com
    로그인PW : kozy

    ```jsx
    onClick={()=>postLoginRTK({  email: "kozy@gmail.com", password: "kozy" })}
    ```

</details>