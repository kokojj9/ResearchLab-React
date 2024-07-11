import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";

import "./LoginModal.css";

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

  const handleLogin = () => {
    axios({
      method: "post",
      url: "/members/login",
      data: {
        memberId: memberId,
        memberPwd: memberPwd,
      },
      withCredentials: true,
    })
      .then((response) => {
        if (response.data.resultMessage === "login success") {
          getSession();
          closeModal();
        } else {
          alert("회원 정보를 정확히 입력해주세요");
        }
      })
      .catch((response) => {
        console.log(response.data.resultMessage);
      });
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
