import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const EnrollModal = forwardRef(function EnrollModal({}, ref) {
    const EnrollDialog = useRef();
   
    useImperativeHandle(ref, () =>{
        return {
            open() {
                EnrollDialog.current.showModal();
            }
        }
    });


    return createPortal(
        <dialog ref={EnrollDialog} id="enrollModal-wrap">
            <div className="modal">
                <div className="modalContent">
                    <h2>회원가입</h2>
                    <p>아이디 : <input /></p>
                    <p>비밀번호 : <input /></p>
                    <p>이메일 : <input /></p>

                    
                </div>
                    <button>회원 가입</button>
                    <button>닫기</button>
            </div>
        </dialog>,
        document.getElementById('modal-root')
    );
})

export default EnrollModal;