import React, { useEffect, useRef, memo, useState, useContext } from "react"
import SideMenu from "./imvestment/SideMenu";
import FindInvestment from "./imvestment/FindInvestment";
import './StockList.css'

export default function StockList() {
    const [list, setList] = useState([
        {
            id: Math.round(Math.random() * 1000),
            name: '원전주 모음',
            stocks: [ 
                {
                    srtnCd: '005930', 
                    itmsNm: '삼성전자',
                },
            ]
        },
    ]);

    const handleSetList = (name, stocks) => {
        const newList = {
            id: Math.round(Math.random() * 1000),
            name: name,
            stocks: stocks
        };
        setList([...list, newList]);
        setShowConfig(false);
    };

    const [showConfig, setShowConfig] = useState(false);

    const handleControlConfig = () => {
        setShowConfig(true);
    }

    return (
        <>
            <h2>종목 조회</h2>
            <div className="secter-container">
                <div className="member-menu-config">
                    <SideMenu onSelect={handleControlConfig} list={list}/>
                </div>
                <div className="stock-list">
                    {showConfig && <FindInvestment onSave={handleSetList} />}
                </div>
            </div>
        </>
    );
}