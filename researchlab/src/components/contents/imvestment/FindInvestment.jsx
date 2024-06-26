import React from 'react';
import './FindInvestment.css';
import axios from 'axios';

export default function FindInvestment() {

    const findStock = () => {
        axios({
            method: 'get',
            url: '/investment/findStock',
            data: document.getElementsByClassName('stockName').value,

        }).then(response => {

        })
    }


    return (
        <>
            <div className="find-investment">
                <div className="input-group">
                    <label>
                        설정 목록 이름:
                        <input type="text" className="input-field" placeholder='예) 원전주 모음'/>
                    </label>
                    <button className="action-button">추가</button>
                </div>
                <div className="input-group">
                    <label>
                        종목명:
                        <input type="text" className="input-field stockName" placeholder='예) 삼성전자'/>
                    </label>
                    <button className="action-button" onClick={findStock}>검색</button>
                </div>
            </div>
            <div className="results">

            </div>
        </>
    );
}
