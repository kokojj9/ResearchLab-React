import React, { useState } from 'react';
import './FindInvestment.css';
import axios from 'axios';

export default function FindInvestment() {
    const [stockName, setStockName] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [addedItems, setAddedItems] = useState([]);

    const findStock = () => {
        axios({
            method: 'get',
            url: '/investment/findStock',
            params: {
                stockName: stockName 
            }
        }).then(response => {
            const items = response.data.response.body.items.item;
            console.log(items);
            addSearchResult(items);
            console.log(searchResults);
        }).catch(() => {
            console.log('에러');
        })
    }

    const addSearchResult = items => {
        setSearchResults(items);
    }

    const addItem = item => {
        setAddedItems([...addedItems, item]);
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
                        <input 
                            type="text" 
                            className="input-field stockName" 
                            onChange={e => setStockName(e.target.value)} 
                            placeholder='예) 삼성전자'
                        />
                    </label>
                    <button className="action-button" onClick={findStock}>검색</button>
                </div>
            </div>
            <div className="content-area">
                <div className="results">
                    <h2>검색 결과</h2>
                    {searchResults.map((result, i) => (
                        <div key={i} className='result-item'>
                            <span>{result.srtnCd}</span>
                            <span>{result.itmsNm}</span>
                            <span>{result.mkp}원</span>
                            <button onClick={() => addItem(result)}>추가</button>
                        </div>
                    ))}
                </div>
                <div className="added-items">
                    <h2>추가된 항목</h2>
                    {addedItems.map((item, i) => (
                        <div key={i} className='added-item'>
                            <span>{item.srtnCd}</span>
                            <span>{item.itmsNm}</span>
                        </div>
                    ))}                    
                </div>
            </div>
        </>
    );
}
