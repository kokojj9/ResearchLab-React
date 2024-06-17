import { useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/common/Header.jsx'
import LoginModal from './components/member/LoginModal.jsx';
import EnrollModal from './components/member/EnrollModal.jsx';



function App() {
  const loginDialog = useRef();
  const EnrollDialog = useRef();

  // const [isLoginModal, setIsLoginModal] = useState(false);
  // const [isEnrollModal, setIsEnrollModal] = useState(false);

  const openLoginModal = () => {
    // setIsLoginModal(true);
    loginDialog.current.open();
    console.log('로그인모달');
  }

  const openEnrollModal = () => {
    // setIsEnrollModal(true);
    EnrollDialog.current.open();
    console.log('회원가입모달');
  }

  const closeModal = () => {
    // setIsLoginModal(false);
    // setIsEnrollModal(false);
  }

  
  return (

    <div className="App">
      <Header 
        openLoginModal={openLoginModal} 
        openEnrollModal={openEnrollModal}
      />
      <LoginModal ref={loginDialog} closeModal={closeModal}></LoginModal>
      <EnrollModal ref={EnrollDialog} closeModal={closeModal}></EnrollModal>
    </div>

  );
}

export default App;
