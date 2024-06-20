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

    const [isInfoValid, setIsInfoValid] = useState(false);
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
        const value = e.target.value; 
        setMemberId(value);
        const isValid = validateMemberId(value);
        setIsMemberIdValid(isValid);
        updateValidity();
    }

    const handleMemberPwdChange = e => {
        const value = e.target.value;
        setMemberPwd(value);
        const isValid = validateMemberPwd(value);
        setIsMemberPwdValid(isValid);
        updateValidity();
    }

    const handleEmailChange = e => {
        const value = e.target.value;
        setEmail(value);
        const isValid = validateEmail(value);
        setIsEmailValid(isValid);
        updateValidity();
    }

    const updateValidity = () => {
        setIsInfoValid(isMemberIdValid && isMemberPwdValid && isEmailValid);
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
                            className={isMemberIdValid ? 'valid' : 'invalid'}
                            placeholder="영문, 숫자 5~12자"
                        />
                        {isMemberIdValid ? (
                            <span className="valid-message">유효한 아이디입니다.</span>
                        ) : (
                            <span className="invalid-message">아이디는 5자 이상 12자 이하의 영문, 숫자만 가능합니다.</span>
                        )}
                    </p>
                    <p>
                        비밀번호 :
                        <input
                            type="password"
                            value={memberPwd}
                            onChange={handleMemberPwdChange}
                            className={isMemberPwdValid ? 'valid' : 'invalid'}
                            placeholder="영문, 숫자, 특수문자를 포함한 8~16자"
                        />
                        {isMemberPwdValid ? (
                            <span className="valid-message">유효한 비밀번호입니다.</span>
                        ) : (
                            <span className="invalid-message">비밀번호를 영문, 숫자, 특수문자를 포함하여 8~16자여야 합니다.</span>
                        )}
                    </p>
                    <p>
                        이메일 :
                        <input
                            type="text"
                            value={email}
                            onChange={handleEmailChange}
                            className={isEmailValid ? 'valid' : 'invalid'}
                        />
                        {isEmailValid ? (
                            <span className="valid-message">유효한 이메일 형식입니다.</span>
                        ) : (
                            <span className="invalid-message">유효한 이메일 형식이 아닙니다.</span>
                        )}
                    </p>
                </div>
                <button className="enrollBtn" onClick={handleEnrollMember} disabled={!isInfoValid}>회원 가입</button>
                <button onClick={closeModal}>닫기</button>
            </div>
        </dialog>,
        document.getElementById('modal-root')
    );
})

export default EnrollModal;