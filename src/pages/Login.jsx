import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { instanse } from '../redux/api/api'
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/modules/tokenSlice';

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
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
      let res = await instanse.post('/api/auth/login', { email, password })
      dispatch(setToken(res.headers.authorization));
      navigate(-1)
    } catch (error) {
      alert('아이디 혹은 비밀번호를 잘못 입력하셨거나 없는 회원 아이디입니다.');
    }
  };

  const onTestLoginHandler = async () => {
    let res = await instanse.post('/api/auth/login', { email:"kozy@gmail.com", password:"kozy" })
    dispatch(setToken(res.headers.authorization));
    navigate(-1)
  }
  
  return (
    <Container>
      <Title>InoBao에 로그인 하세요</Title>
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
      <Button onClick={onTestLoginHandler}>테스트계정으로 로그인</Button>
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
