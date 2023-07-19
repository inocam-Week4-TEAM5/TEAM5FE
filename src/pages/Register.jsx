import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';


Modal.setAppElement('#root');

export const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [admin, setAdmin] = useState(false); // 관리자 회원가입 여부
  const [adminToken, setAdminToken] = useState(''); // 관리자 코드
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
    setAdmin(!admin);
  };

  const handleAdminCodeChange = (e) => {
    setAdminToken(e.target.value);
  };

  const [modalDuplicateMessage, setModalDuplicateMessage] = useState('');
  const [modalSuccessMessage, setModalSuccessMessage] = useState('');
  const [modalFailureMessage, setModalFailureMessage] = useState('');

  const handleEmailDuplicateCheck = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://3.15.32.86:8080/api/auth/email?email=${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }), // 이메일을 서버로 전송합니다.
      });

      if (response.ok) {
        const data = await response.json();
        setIsEmailDuplicate(data.isDuplicate);
        setModalDuplicateMessage(data ? '사용 가능한 이메일입니다.' : '사용 중인 이메일입니다.');
      } else {
        setIsEmailDuplicate(false);
        setModalDuplicateMessage('중복 확인 중 오류가 발생했습니다.');
      }
      setModalIsOpen(true);
    } catch (error) {
      setIsEmailDuplicate(false);
      setModalDuplicateMessage('중복 확인 중 오류가 발생했습니다.');
      setModalIsOpen(true);
    }
  };

  const handleNicknameDuplicateCheck = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://3.15.32.86:8080/api/auth/nickname?nickname=${nickname}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname }), // 닉네임을 서버로 전송합니다.
      });

      if (response.ok) {
        const data = await response.json();
        setIsNicknameDuplicate(data.isDuplicate);
        setModalDuplicateMessage(data ? '사용 가능한 닉네임입니다.' : '사용 중인 닉네임입니다.');
      } else {
        setIsNicknameDuplicate(false);
        setModalDuplicateMessage('중복 확인 중 오류가 발생했습니다.');
      }
      setModalIsOpen(true);
    } catch (error) {
      setIsNicknameDuplicate(false);
      setModalDuplicateMessage('중복 확인 중 오류가 발생했습니다.');
      setModalIsOpen(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://3.15.32.86:8080/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          nickname,
          admin: admin,
          adminToken,
        }),
      });

      if (response.ok) {
        setModalSuccessMessage('회원가입이 성공적으로 완료되었습니다.');
        navigate('/login');
      } else {
        setModalFailureMessage('회원가입에 실패했습니다. 다시 시도해주세요.');
      }
      setModalIsOpen(true);
    } catch (error) {
      setModalFailureMessage('오류가 발생했습니다. 다시 시도해주세요.');
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalDuplicateMessage('');
    setModalSuccessMessage('');
    setModalFailureMessage('');
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
        <InputPw
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <br />
        <Label>
          <ToggleSwitch>
            <ToggleCheckbox
              type="checkbox"
              checked={admin}
              onChange={handleToggleAdmin}
            />
            <ToggleSlider />
          </ToggleSwitch>
          관리자 회원가입시
        </Label>
        <br />
        {admin && (
          <InputPw
            type="password"
            placeholder="Admin Code"
            value={adminToken}
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
        {modalDuplicateMessage && <ModalMessage>{modalDuplicateMessage}</ModalMessage>}
        {modalSuccessMessage && <ModalMessage>{modalSuccessMessage}</ModalMessage>}
        {modalFailureMessage && <ModalMessage>{modalFailureMessage}</ModalMessage>}
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
  right: 39px;
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
  margin-top: 80px;
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

