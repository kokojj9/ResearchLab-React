import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom";
import './EnrollModal.css';
import axios from "axios";

const EnrollModal = forwardRef(function EnrollModal({ closeModal }, ref) {
    const EnrollDialog = useRef();

    const [memberId, setMemberId] = useState('');
    const [memberPwd, setMemberPwd] = useState('');
    const [email, setEmail] = useState('');

    useImperativeHandle(ref, () => {
        return {
            open() {
                EnrollDialog.current.showModal();
            },
            close() {
                EnrollDialog.current.close();
            }
        }
    });

    const handleEnrollMember = () => {
        if (memberId && memberPwd && email) {
            axios({
                method: 'post',
                url: '/members/enroll',
                data: {
                    memberId: memberId,
                    memberPwd: memberPwd,
                    email: email
                }
            }).then(response => {

            }).catch(() => {

            })
        }
        else {
            alert('회원 정보를 모두 입력해주세요!');
        }
    }


    return createPortal(
        <dialog ref={EnrollDialog} id="enrollModal-wrap" className="dialog">
            <div className="modal">
                <div className="modalContent">
                    <h2>회원가입</h2>
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
                    <p>
                        이메일 :
                        <input
                            type="text"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </p>
                </div>
                <button onClick={handleEnrollMember}>회원 가입</button>
                <button onClick={closeModal}>닫기</button>
            </div>
        </dialog>,
        document.getElementById('modal-root')
    );
})

export default EnrollModal;