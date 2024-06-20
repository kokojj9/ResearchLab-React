import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom";
import './EnrollModal.css';
import axios from "axios";

const EnrollModal = forwardRef(function EnrollModal({ closeModal }, ref) {
    const EnrollDialog = useRef();

    const [memberId, setMemberId] = useState('');
    const [memberPwd, setMemberPwd] = useState('');
    const [email, setEmail] = useState('');
    
    const [isMemberIdValid, setIsMemberIdValid] = useState(false);
    const [isMemberPwdValid, setIsMemberPwdValid] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);

    const [memberInfoValid, setMemberInfoValid] = useState(false);
    // 유효성 검사

    const validateMemberId = id => {
        const regex = /^[a-zA-Z0-9]{5,12}$/;
        return regex.test(id);
    };

    const validateMemberPwd = password => {
        const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,16}$/;
        return regex.test(password);
    };

    const validateEmail = email => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleMemberIdChange = e => {
        setMemberId(e.target.value);
        const isValid = validateMemberId(memberId);
        setIsMemberIdValid(isValid);
        updateValidity();
    }

    const handleMemberPwdChange = e => {
        setMemberPwd(e.target.value);
        const isValid = validateMemberPwd(memberPwd);
        setIsMemberPwdValid(isValid);
        updateValidity();
    }

    const handleEmailChange = e => {
        setEmail(e.target.value);
        const isValid = validateEmail(email);
        setIsEmailValid(isValid);
        updateValidity();
    }

    const updateValidity = () => {
        setMemberInfoValid(isMemberIdValid && isMemberPwdValid && isEmailValid);
    }



    //

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
                console.log(response);
            }).catch((response) => {
                console.log(response);
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
                            onChange={handleMemberIdChange}
                        />
                    </p>
                    <p>
                        비밀번호 :
                        <input
                            type="password"
                            value={memberPwd}
                            onChange={handleMemberPwdChange}
                        />
                    </p>
                    <p>
                        이메일 :
                        <input
                            type="text"
                            value={email}
                            onChange={handleEmailChange}
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