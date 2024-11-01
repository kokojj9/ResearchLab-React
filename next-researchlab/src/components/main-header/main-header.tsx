"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./main-header.module.css";

import { login, logout, Member, setMember } from "@/redux/memberActions";
import axios from "axios";
import Button from "../../components/members/button";
import EnrollModal, {
  EnrollModalHandle,
} from "../../components/members/enrollDialog";
import LoginModal, {
  LoginModalHandle,
} from "../../components/members/loginModal";
import { RootState } from "../../redux/memberActions";

const Header = () => {
  const dispatch = useDispatch();
  const member = useSelector(
    (state: RootState) => state.member
  ) as Member | null;

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
      await axios.post("api/auth/logout", {}, { withCredentials: true });
      dispatch(logout(null));
    } catch (error) {
      console.error("로그아웃 실패", error);
    }
  };

  useEffect(() => {
    const fetchMember = async () => {
      try {
        // Spring 백엔드의 인증 확인 API 호출
        const response = await axios.get("/api/auth/checkJwt", {
          withCredentials: true,
        });
        dispatch(member(response.data));
      } catch (error) {
        console.error("Authentication failed:", error);
        dispatch(setMember(null));
      }
    };

    fetchMember();
  }, [dispatch, member]);

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
              <Link className={styles.menuLink} href="/stock">
                주식 종목
              </Link>
            </li>
            <li>
              <Link className={styles.menuLink} href="/crypto">
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
      <LoginModal
        ref={loginDialog}
        closeModal={closeModal}
        login={(member) => dispatch(login(member))}
      />
      <EnrollModal ref={enrollDialog} closeModal={closeModal} />
    </>
  );
};

export default Header;
