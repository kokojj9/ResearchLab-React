import { useRef } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

import './Header.css';
import Button from '../member/Button.jsx';
import LoginModal from '../member/LoginModal.jsx';
import EnrollModal from '../member/EnrollModal.jsx';

export default function Header({ loginMember, getSession, setMember }) {

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
            method: 'post',
            url: '/members/logout',
            withCredentials: true
        }).then(response => {
            setMember(null);
        }).catch(response => {

        })
    }

    return (
        <>
            <header>
                <h1 className="logo">ReserchLab</h1>
                <div className='menuList'>
                    <ul>
                        <li><Link className='menuLink' to="/mainNews">주요 뉴스</Link></li>
                        <li><Link className='menuLink' to="/stockList">주식 종목</Link></li>
                        <li><Link className='menuLink' to="/cryptoList">암호 화폐</Link></li>
                        <li><Link className='menuLink' to="/cal">복리 계산기</Link></li>
                    </ul>
                </div>
                <div id='memberServiceArea'>
                    {loginMember !== null ? (
                        <>
                            <p>{loginMember.memberId}님 반갑습니다.</p>
                            <Button onSelect={handleLogout}>로그아웃</Button>
                        </>
                    ) : (
                        <>
                            <Button onSelect={openLoginModal}>로그인</Button>
                            <Button onSelect={openEnrollModal}>회원가입</Button>
                        </>
                    )}
                </div>
            </header>
            <LoginModal ref={loginDialog} closeModal={closeModal} getSession={getSession} ></LoginModal>
            <EnrollModal ref={EnrollDialog} closeModal={closeModal}></EnrollModal>
        </>
    );
}