import React, { useEffect, useRef, memo, useState, useContext } from "react"
import SideMenu from "./imvestment/SideMenu";
import FindInvestment from "./imvestment/FindInvestment";


export default function StockList() {
    const [list, setlist] = useState({
        configurations:{
            no:'',
            title:'',
            items:{
                code:''
            }
        },
    });


    const [showConfig, setShowConfig] = useState(false);

    const handleControlConfig = () => {
        setShowConfig(true);
    }

    return (
        <>
            <h2>종목 조회</h2>
            <div className="secter-container">
                <div className="member-menu-config">
                    <SideMenu onSelect={handleControlConfig}/>
                </div>
                <div className="stock-list">
                    {showConfig && <FindInvestment />}
                </div>
            </div>
            
        </>
    );
}