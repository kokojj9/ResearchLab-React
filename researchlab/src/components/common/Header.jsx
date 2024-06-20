import Button from '../member/Button.jsx';
import './Header.css';

export default function Header({openLoginModal, openEnrollModal, loginMember, onLogout}) {

    return (
        <>
            <header>
                <h1 className="logo">ReserchLab</h1>
                <div className='menuList'>
                    <ul>
                        <li>주요 뉴스</li>
                        <li>종목 조회</li>
                        <li>복리 계산기</li>
                    </ul>
                </div>
                <div id='memberServiceArea'>
                    {loginMember !== null ? (
                        <>
                            <p>{loginMember.memberId}님 반갑습니다.</p>
                            <Button onSelect={onLogout}>로그아웃</Button>
                        </>
                    ) : (
                        <>
                            <Button onSelect={openLoginModal}>로그인</Button>
                            <Button onSelect={openEnrollModal}>회원가입</Button>
                        </>
                    )}
                </div>
            </header>
        </>
    );
}