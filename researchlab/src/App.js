import { useRef, useState } from 'react';
import axios from "axios";
import './App.css';
import Header from './components/common/Header.jsx'
import LoginModal from './components/member/LoginModal.jsx';
import EnrollModal from './components/member/EnrollModal.jsx';



function App() {
  const [member, setMember] = useState(null);

  const loginDialog = useRef();
  const EnrollDialog = useRef();

  

  const openLoginModal = () => {
    loginDialog.current.open();
    // console.log('로그인모달');
  }

  const openEnrollModal = () => {
    EnrollDialog.current.open();
    // console.log('회원가입모달');
  }

  const closeModal = () => {
    loginDialog.current.close();
    EnrollDialog.current.close();
  }

  
  return (

    <div className="App">
      <Header 
        openLoginModal={openLoginModal} 
        openEnrollModal={openEnrollModal}
        loginMember={member}
      />
      <LoginModal ref={loginDialog} closeModal={closeModal} onLoginSuccess={setMember} ></LoginModal>
      <EnrollModal ref={EnrollDialog} closeModal={closeModal}></EnrollModal>
    </div>

  );
}

export default App;
