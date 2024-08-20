import { MemberContext } from "@/context/MembetContext";
import axios from "axios";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/members/button";
import EnrollModal, {
  EnrollModalHandle,
} from "../../components/members/enrollDialog";
import LoginModal, {
  LoginModalHandle,
} from "../../components/members/loginModal";
import "./main-header.module.css";

const Header = () => {
  const memberContext = useContext(MemberContext);

  if (!memberContext) {
    throw new Error("MemberContext를 찾을 수 없음");
  }

  const { member, getSession, setMember } = memberContext;

  const loginDialog = useRef<LoginModalHandle | null>(null);
  const enrollDialog = useRef<EnrollModalHandle | null>(null);

  const openLoginModal = () => loginDialog.current?.open();
  const openEnrollModal = () => enrollDialog.current?.open();
  const closeModal = () => {
    loginDialog.current?.close();
    enrollDialog.current?.close();
  };

  const handleLogout = async () => {
    try {
      await axios.post("/members/logout", {}, { withCredentials: true });
      setMember(null);
    } catch (error) {
      console.error("로그아웃 실패", error);
    }
  };

  return (
    <>
      <header>
        <h1 className="logo">ResearchLab</h1>
        <nav className="menuList">
          <ul>
            <li>
              <Link className="menuLink" to="/mainNews">
                주요 뉴스
              </Link>
            </li>
            <li>
              <Link className="menuLink" to="/stockList">
                주식 종목
              </Link>
            </li>
            <li>
              <Link className="menuLink" to="/cryptoList">
                암호 화폐
              </Link>
            </li>
            <li>
              <Link className="menuLink" to="/calculator">
                복리 계산기
              </Link>
            </li>
            <li>
              <Link className="menuLink" to="/strategylab">
                매매전략연구소
              </Link>
            </li>
          </ul>
        </nav>
        <div id="memberServiceArea">
          {member ? (
            <>
              <p>{member.id}님 반갑습니다.</p>
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
      <LoginModal
        ref={loginDialog}
        closeModal={closeModal}
        getSession={getSession}
      />
      <EnrollModal ref={enrollDialog} closeModal={closeModal} />
    </>
  );
};

export default Header;
