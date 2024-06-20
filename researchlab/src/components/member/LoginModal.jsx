import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";

import './LoginModal.css';

const LoginModal = forwardRef(function LoginModal({ closeModal, onLoginSuccess }, ref) {
    const loginDialog = useRef();

    const [memberId, setMemberId] = useState('');
    const [memberPwd, setMemberPwd] = useState('');

    useImperativeHandle(ref, () => {
        return {
            open() {
                loginDialog.current.showModal();
            },
            close() {
                loginDialog.current.close();
            }
        }
    });

    const handleLogin = () => {
        axios({
            method : 'post',
            url : '/members/login',
            data : {
                memberId: memberId,
                memberPwd: memberPwd
            }
        }).then(response => {
            console.log(response);
            if(response.data.responseCode === "YY"){
                onLoginSuccess(response.data.data);
               
            }
            else {
                console.log(response.data.resultMessage);
            }
        }).catch((e) => {
            console.log(e);
        })
            closeModal();
    }

    return createPortal(
        <dialog ref={loginDialog} id="loginModal-wrap" className="dialog">
            <div className="modal">
                <div className="modalContent">
                    <h2>로그인</h2>
                    
                    <p>
                        아이디 :
                        <input
                            type="text"
                            value={memberId}
                            onChange={e => setMemberId(e.target.value)}
                        />
                    </p>
                    <p>
                        비밀번호 :
                        <input
                            type="password"
                            value={memberPwd}
                            onChange={e => setMemberPwd(e.target.value)}
                        />
                    </p>
                </div>
                <button onClick={handleLogin}>로그인</button>
                <button onClick={closeModal}>닫기</button>
            </div>
        </dialog>,
        document.getElementById('modal-root')
    );
})

export default LoginModal;