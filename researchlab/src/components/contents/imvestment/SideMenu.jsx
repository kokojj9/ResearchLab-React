import './SideMenu.css';

export default function SideMenu({ onSelect, onShow, list }){

    return(
        <div className="side-menu">
            <div className="side-menu-header">
                <span>사용자 설정 목록</span>
                <div className="side-menu-buttons">
                    <button onClick={onSelect}>추가</button>
                    <button>삭제</button>
                </div>
            </div>
            <ul className="side-menu-list">
                {list.map((stock, i) => (
                    <li key={i} className='result-item'>
                        <p onClick={onShow}>{stock.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}