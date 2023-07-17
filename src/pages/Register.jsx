import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // 관리자 회원가입 여부
  const [adminCode, setAdminCode] = useState(''); // 관리자 코드
  const [isEmailDuplicate, setIsEmailDuplicate] = useState(false);
  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleToggleAdmin = () => {
    setIsAdmin(!isAdmin);
  };

  const handleAdminCodeChange = (e) => {
    setAdminCode(e.target.value);
  };

  const handleEmailDuplicateCheck = (e) => {
    e.preventDefault();
    // 중복 확인 로직을 작성합니다.
    // 실제로는 서버로 요청을 보내고 응답을 처리해야 합니다.
    // 여기서는 예시로 상태만 변경하여 모달을 열고 닫습니다.
    setIsEmailDuplicate(true);
    setModalIsOpen(true);
  };

  const handleNicknameDuplicateCheck = (e) => {
    e.preventDefault();
    // 중복 확인 로직을 작성합니다.
    // 실제로는 서버로 요청을 보내고 응답을 처리해야 합니다.
    // 여기서는 예시로 상태만 변경하여 모달을 열고 닫습니다.
    setIsNicknameDuplicate(true);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 회원가입 처리 로직을 작성합니다.
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Nickname:', nickname);
    console.log('IsAdmin:', isAdmin);
    console.log('Admin Code:', adminCode);
    // 실제로는 서버로 요청을 보내고 응답을 처리해야 합니다.
  };

  return (
    <Container>
      <Title>TEAM9 ID 생성</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <DuplicateCheckButton onClick={handleEmailDuplicateCheck}>
          중복 확인
        </DuplicateCheckButton>
        <br />
        <InputPw
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <br />
        <Input
          type="text"
          placeholder="Nickname"
          value={nickname}
          onChange={handleNicknameChange}
        />
        <DuplicateCheckButton onClick={handleNicknameDuplicateCheck}>
          중복 확인
        </DuplicateCheckButton>
        <br />
        <Label>
          <ToggleSwitch>
            <ToggleCheckbox
              type="checkbox"
              checked={isAdmin}
              onChange={handleToggleAdmin}
            />
            <ToggleSlider />
          </ToggleSwitch>
          관리자 회원가입시
        </Label>
        <br />
        {isAdmin && (
          <InputPw
            type="password"
            placeholder="Admin Code"
            value={adminCode}
            onChange={handleAdminCodeChange}
          />
        )}
        <br />
        <Button type="submit">Register</Button>
      </Form>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Duplicate Check Modal"
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
          content: {
            height: '100px',
            width: '200px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        {isEmailDuplicate || isNicknameDuplicate ? (
          <ModalMessage>중복입니다.</ModalMessage>
        ) : (
          <ModalMessage>사용 가능합니다.</ModalMessage>
        )}
        <ModalButton onClick={closeModal}>닫기</ModalButton>
      </Modal>
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

const InputPw = styled.input`
  padding: 8px;
  margin-bottom: 10px;
  position: relative;
  right: 44px;
`;

const DuplicateCheckButton = styled.button`
  padding: 8px 8px;
  margin-left: 10px;
  position: relative;
  right: -48px;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  position: relative;
  right: -30px;
  margin-top: 40px;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  margin-right: 10px;
`;

const ToggleSlider = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 16px;
  background-color: #ccc;
  transition: 0.4s;
  cursor: pointer;

  &:before {
    position: absolute;
    content: '';
    height: 14px;
    width: 14px;
    left: 3px;
    bottom: 3px;
    border-radius: 50%;
    background-color: white;
    transition: 0.4s;
  }
`;

const ToggleCheckbox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + ${ToggleSlider} {
    background-color: #2196f3;
  }

  &:checked + ${ToggleSlider}:before {
    transform: translateX(20px);
  }
`;


const Button = styled.button`
  padding: 8px 16px;
`;

const ModalMessage = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  margin-bottom: 20px;
`;

const ModalButton = styled.button`
  padding: 8px 16px;
  margin: 0 auto;
  display: block;
`;

export default Register; 