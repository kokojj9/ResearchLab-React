export default function MyList(){
    return(
        <>
            <div className="find-investment">
                <div className="content-area">
                    <div className="results">
                        <h2>종목 리스트</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>종목 코드</th>
                                    <th>종목 이름</th>
                                    <th>가격</th>
                                    <th>날짜</th>
                                </tr>
                            </thead>
                            <tbody>
                                    <tr className='result-item'>
                                        <td>123</td>
                                        <td>삼성</td>
                                        <td>80000</td>
                                        <td>20240703</td>
                                    </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}