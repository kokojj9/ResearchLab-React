import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";

import "./loginModal.module.css";

const LoginModal = forwardRef(function LoginModal(
  { closeModal, getSession },
  ref
) {
  const loginDialog = useRef();

  const [memberId, setMemberId] = useState("");
  const [memberPwd, setMemberPwd] = useState("");

  useImperativeHandle(ref, () => {
    return {
      open() {
        loginDialog.current.showModal();
      },
      close() {
        loginDialog.current.close();
      },
    };
  });

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "/members/login",
        {
          memberId: memberId,
          memberPwd: memberPwd,
        },
        { withCredentials: true }
      );

      if (response.data.resultMessage === "로그인 성공") {
        getSession();
        closeModal();
      } else {
        alert("회원 정보를 정확히 입력해주세요");
      }
    } catch (error) {
      console.error(error.response.data.resultMessage);
    }
  };

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
              onChange={(e) => setMemberId(e.target.value)}
            />
          </p>
          <p>
            비밀번호 :
            <input
              type="password"
              value={memberPwd}
              onChange={(e) => setMemberPwd(e.target.value)}
            />
          </p>
        </div>
        <button onClick={handleLogin}>로그인</button>
        <button onClick={closeModal}>닫기</button>
      </div>
    </dialog>,
    document.getElementById("modal-root")
  );
});

export default LoginModal;
