import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import "./EnrollModal.css";
import axios from "axios";
import useValidation from "../hooks/useValidation";
import ErrorMessage from "./ErrorMessage";

const EnrollModal = forwardRef(function EnrollModal({ closeModal }, ref) {
  const EnrollDialog = useRef();

  // 유효성 검사
  const validateMemberId = (id) => /^[a-zA-Z0-9]{5,12}$/.test(id);
  const validateMemberPwd = (password) =>
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,16}$/.test(
      password
    );
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // 입력값을 커스텀Hook으로 전달
  const memberId = useValidation(validateMemberId);
  const memberPwd = useValidation(validateMemberPwd);
  const email = useValidation(validateEmail);

  const inInfoValid = memberId.isValid && memberPwd.isValid && email.isValid;

  useImperativeHandle(ref, () => {
    return {
      open() {
        EnrollDialog.current.showModal();
      },
      close() {
        EnrollDialog.current.close();
      },
    };
  });

  const handleEnrollMember = async () => {
    if (!memberId.value || !memberPwd.value || !email.value) {
      alert("회원 정보를 모두 입력해주세요");
      return;
    }

    try {
      const response = await axios.post("/members/enroll", {
        memberId: memberId.value,
        memberPwd: memberPwd.value,
        email: email.value,
      });
      alert("회원가입이 완료되었습니다.");
      EnrollDialog.current.close();
    } catch (error) {
      console.log(error);
    }
  };

  return createPortal(
    <dialog ref={EnrollDialog} id="enrollModal-wrap" className="dialog">
      <div className="modal">
        <div className="modalContent">
          <h2>회원가입</h2>
          <p>
            아이디 :
            <input
              type="text"
              value={memberId.value}
              onChange={memberId.handleChange}
              className={memberId.isValid ? "valid" : "invalid"}
              placeholder="영문, 숫자 5~12자"
            />
            {memberId.isInput && (
              <ErrorMessage
                message={
                  memberId.isValid
                    ? "유효한 아이디입니다."
                    : "아이디는 5자 이상 12자 이하의 영문, 숫자만 가능합니다."
                }
                isValid={memberId.isValid}
              />
            )}
          </p>
          <p>
            비밀번호 :
            <input
              type="password"
              value={memberPwd.value}
              onChange={memberPwd.handleChange}
              className={memberPwd.isValid ? "valid" : "invalid"}
              placeholder="영문, 숫자, 특수문자를 포함한 8~16자"
            />
            {memberPwd.isInput && (
              <ErrorMessage
                message={
                  memberPwd.isValid
                    ? "유효한 비밀번호입니다."
                    : "비밀번호를 영문, 숫자, 특수문자를 포함하여 8~16자여야 합니다."
                }
                isValid={memberPwd.isValid}
              />
            )}
          </p>
          <p>
            이메일 :
            <input
              type="text"
              value={email.value}
              onChange={email.handleChange}
              className={email.isValid ? "valid" : "invalid"}
            />
            {email.isInput && (
              <ErrorMessage
                message={
                  email.isValid
                    ? "유효한 이메일 형식입니다."
                    : "유효한 이메일 형식이 아닙니다."
                }
                isValid={email.isValid}
              />
            )}
          </p>
        </div>
        <button
          className="enrollBtn"
          onClick={handleEnrollMember}
          disabled={!inInfoValid}
        >
          회원 가입
        </button>
        <button onClick={closeModal}>닫기</button>
      </div>
    </dialog>,
    document.getElementById("modal-root")
  );
});

export default EnrollModal;
