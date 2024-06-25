import { useState } from "react";

export default function SideMenu({ onSelect }){

    return(
        <>
            <span>사용자 설정 종목</span><button onClick={onSelect}>추가</button><button>삭제</button>
            <ul>
                <li>설정 1</li>
                <li>설정 2</li>
                <li>설정 3</li>
            </ul>
        </>
    );
}