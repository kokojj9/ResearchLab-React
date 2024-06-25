import { useState } from "react";
import './SideMenu.css';

export default function SideMenu({ onSelect }){

    return(
        <div className="side-menu">
            <div className="side-menu-header">
                <span>사용자 설정 종목</span>
                <div className="side-menu-buttons">
                    <button onClick={onSelect}>추가</button>
                    <button>삭제</button>
                </div>
            </div>
            <ul className="side-menu-list">
                <li>설정 1</li>
                <li>설정 2</li>
                <li>설정 3</li>
            </ul>
        </div>
    );
}