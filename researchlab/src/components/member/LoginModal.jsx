import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";


const LoginModal = forwardRef(function LoginModal({}, ref) {
    const loginDialog = useRef();
   
    useImperativeHandle(ref, () =>{
        return {
            open() {
                loginDialog.current.showModal();
            }
        }
    });


    return createPortal(
        <dialog ref={loginDialog} id="loginModal-wrap">
            <div className="modal">
                <div className="modalContent">
                    <h2>로그인</h2>
                    <p>아이디 : <input /></p>
                    <p>비밀번호 : <input /></p>
                </div>
                    <button>로그인</button>
                    <button>닫기</button>
            </div>
        </dialog>,
        document.getElementById('modal-root')
    );
})

export default LoginModal;