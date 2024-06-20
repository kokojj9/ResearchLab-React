import { useEffect, useRef, useState } from 'react';
import axios from "axios";
import './App.css';
import Header from './components/common/Header.jsx'
import LoginModal from './components/member/LoginModal.jsx';
import EnrollModal from './components/member/EnrollModal.jsx';



function App() {
  const [member, setMember] = useState(null);

  useEffect(() => {
    getSession();
  }, [])

  const getSession = () => {
    axios({
      method: 'get',
      url: '/members/getSession',
      withCredentials: true
    }).then(response => {
      setMember(response.data.data);
    }).catch(response => {
      console.log(response);
    })
  }


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

  const handleLogout = () => {
    axios({
      method : 'post',
      url : '/members/logout',
      withCredentials: true
    }).then(response => {

    }).catch(response => {

    })
  }

  return (

    <div className="App">
      <Header
        openLoginModal={openLoginModal}
        openEnrollModal={openEnrollModal}
        loginMember={member}
        onLogout={handleLogout}
      />
      <LoginModal ref={loginDialog} closeModal={closeModal} getSession={getSession} ></LoginModal>
      <EnrollModal ref={EnrollDialog} closeModal={closeModal}></EnrollModal>
    </div>

  );
}

export default App;
