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
      if(response.data != null){
       setMember(response.data.data);
      }
    })
  }


  const loginDialog = useRef();
  const EnrollDialog = useRef();

  const openLoginModal = () => {
    loginDialog.current.open();
  }

  const openEnrollModal = () => {
    EnrollDialog.current.open();
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
      setMember(null);
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
