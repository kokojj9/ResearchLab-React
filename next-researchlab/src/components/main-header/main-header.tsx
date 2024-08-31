"use client";
import Link from "next/link";
import { useContext, useRef } from "react";

import axios from "axios";

import styles from "./main-header.module.css";

import { MemberContext } from "@/context/MemberContext";
import Button from "../../components/members/button";
import EnrollModal, {
  EnrollModalHandle,
} from "../../components/members/enrollDialog";
import LoginModal, {
  LoginModalHandle,
} from "../../components/members/loginModal";

const Header = () => {
  const memberContext = useContext(MemberContext);

  if (!memberContext) {
    throw new Error("MemberContext를 찾을 수 없음");
  }

  const { member, login, logout } = memberContext;

  const loginDialog = useRef<LoginModalHandle>(null);
  const enrollDialog = useRef<EnrollModalHandle>(null);

  const openLoginModal = () => loginDialog.current?.open();
  const openEnrollModal = () => enrollDialog.current?.open();
  const closeModal = () => {
    loginDialog.current?.close();
    enrollDialog.current?.close();
  };

  const handleLogout = async () => {
    try {
      await axios.post("api/members/logout", {}, { withCredentials: true });
      logout();
    } catch (error) {
      console.error("로그아웃 실패", error);
    }
  };

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.logo}>ResearchLab</h1>
        <nav className={styles.menuList}>
          <ul>
            <li>
              <Link className={styles.menuLink} href="/mainNews">
                주요 뉴스
              </Link>
            </li>
            <li>
              <Link className={styles.menuLink} href="/stockList">
                주식 종목
              </Link>
            </li>
            <li>
              <Link className={styles.menuLink} href="/cryptoList">
                암호 화폐
              </Link>
            </li>
            <li>
              <Link className={styles.menuLink} href="/calculator">
                복리 계산기
              </Link>
            </li>
            <li>
              <Link className={styles.menuLink} href="/strategylab">
                매매전략연구소
              </Link>
            </li>
          </ul>
        </nav>
        <div id={styles.memberServiceArea}>
          {member ? (
            <>
              <p>{member.memberId}님 반갑습니다.</p>
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
      <LoginModal ref={loginDialog} closeModal={closeModal} login={login} />
      <EnrollModal ref={enrollDialog} closeModal={closeModal} />
    </>
  );
};

export default Header;
