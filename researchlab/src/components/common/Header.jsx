import './Header.css';

export default function Header() {



    return (
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
                    <button>로그인</button>
                    <button>회원가입</button>
                </div>
        </header>
    );
}