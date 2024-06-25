import React from 'react';
import './FindInvestment.css';

export default function FindInvestment() {
    return (
        <>
            <div className="find-investment">
                <label>
                    설정 목록 이름:
                    <input type="text" className="input-field" />
                </label>
                <label>
                    종목명:
                    <input type="text" className="input-field" />
                </label>
                <button className="action-button">검색</button>
                <button className="action-button">추가</button>
            </div>
            <div className="results">

            </div>
        </>
    );
}
