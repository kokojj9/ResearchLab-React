import React, { useState } from 'react';
import './FindInvestment.css';
import axios from 'axios';

export default function FindInvestment({ onSave }) {
    const [stockName, setStockName] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [addedItems, setAddedItems] = useState([]);

    const findStock = async () => {
        try {
            const response = await axios.get('/investment/findStock', {
                params: {
                    stockName: stockName 
                }
            });

            const item = response.data.response.body.items.item;
            const latestStock = filterLast(item);
            setSearchResults(latestStock);
            console.log(latestStock);  

        } catch (error) {
            console.log('주식종목 조회 에러');
        }
        
    }
    // 공공데이터 조회 결과중 가장 최근 날짜 종목만 필터링하는 메소드
    const filterLast = items => {
        const stockGroup = items.reduce((acc, item) => {
            // acc : 그룹화 객체, item : 배열의 현재요소
            if(!acc[items.srtnCd]) {
                // 존재하지않으면 빈배열
                acc[item.srtnCd] = [];
            }
            
            acc[item.srtnCd].push(item);
            console.log('acc : ' + acc);
            // 객체로 반환해줌
            return acc;
        }, {});
        // Object.values : 객체의 값을 배열로 변환
        const latestStock = Object.values(stockGroup).map(group => {
            return group.reduce((latest, item) => {
                // latest 와 item의 날짜값을 비교하여 가장 최신 요소를 반환
                return new Date(item.basDt) > new Date(latest.basDt) ? item : latest;
            });
        });

        return latestStock;
    }

    const addItem = item => {
        const isAdded = addedItems.some(addedItem => item.srtnCd === addedItem.srtnCd)

        if(!isAdded) {
            setAddedItems([...addedItems, item]);
        }
    }

    const handleSetList = () => {
        const listName = document.getElementById('settingName').value;
        if(listName){
            onSave(listName, addedItems);
        }
    }

    return (
        <>
            <div className="find-investment">
                <div className="input-group">
                    <label>
                        설정 목록 이름:
                        <input type="text" id='settingName' className="input-field" placeholder='예) 원전주 모음'/>
                    </label>
                    <button className="action-button" onClick={handleSetList}>리스트로 저장</button>
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
                    <table>
                        <thead>
                            <tr>
                                <th>종목 코드</th>
                                <th>종목 이름</th>
                                <th>가격</th>
                                <th>날짜</th>
                                <th>추가</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchResults.map((result, i) => (
                                <tr key={i} className='result-item'>
                                    <td>{result.srtnCd}</td>
                                    <td>{result.itmsNm}</td>
                                    <td>{result.mkp}원</td>
                                    <td>{result.basDt}</td>
                                    <td><button onClick={() => addItem(result)}>추가</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="added-items">
                    <h2>추가된 항목</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>종목 코드</th>
                                <th>종목 이름</th>
                            </tr>
                        </thead>
                        <tbody>
                            {addedItems.map((item, i) => (
                                <tr key={i} className='added-item'>
                                    <td>{item.srtnCd}</td>
                                    <td>{item.itmsNm}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
