import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://18.219.10.23:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error('로그인 실패');
      }
      // Here we get the JWT token from the response headers
      const token = response.headers.get('Authorization');
      if (token) {
        window.localStorage.setItem('jwtToken', token);
        navigate('/post');
      } else {
        throw new Error('JWT 토큰이 응답 헤더에 없습니다');
      }
    } catch (error) {
      alert('아이디 혹은 비밀번호를 잘못 입력하셨거나 없는 회원 아이디입니다.');
    }
  };

  return (
    <Container>
      <Title>TEAM9에 로그인 하세요</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <br />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <br />
        <Button type="submit">로그인</Button>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const Title = styled.h1`
  font-size: 30px;
  margin-bottom: 50px;
`;

const Form = styled.form`
  text-align: center;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 8px 16px;
  margin-top: 40px;
`;

export default Login;
