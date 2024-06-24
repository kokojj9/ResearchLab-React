import { useEffect } from "react"
import { createChart } from 'lightweight-charts';
import './StockList.css';

let flag = false; // 개발모드에서 두번실행되어 위젯이 중복으로 실행되는거 막는 플래그임

export default function StockList() {

    useEffect(() => {
        if(flag){
            return;
        }

        flag = true;

        const script = document.createElement('script');
        script.type = "text/javascript";
        script.async = true;
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"
        script.innerHTML = JSON.stringify({
            "symbols": [
                {
                    proName: "FOREXCOM:SPXUSD",
                    title: "S&P 500 Index"
                },
                {
                    proName: "FOREXCOM:NSXUSD",
                    title: "US 100 Cash CFD"
                },
                {
                    proName: "FX_IDC:EURUSD",
                    title: "EUR to USD"
                },
                {
                    proName: "BITSTAMP:BTCUSD",
                    title: "Bitcoin"
                },
                {
                    proName: "BITSTAMP:ETHUSD",
                    title: "Ethereum"
                }
            ],
            showSymbolLogo: true,
            isTransparent: false,
            displayMode: "compact",
            colorTheme: "dark",
            locale: "kr"
        });
        document.getElementById('tradingview-widget-container').appendChild(script);
    }, []);

   

    return (
        <div>
            <h2>종목 조회</h2>
            <div id="tradingview-widget-container" className="tradingview-widget-container">
                <div className="tradingview-widget-container__widget"></div>
            </div>
            <div className="separator"></div>
            <p>주식/ 코인 종목조회영역</p>
            <div className="secter-container">
                <div className="member-menu-config">
                    <p>사용자 설정 종목</p>
                </div>
                <div className="stock-list">
                    <p>종목 선택하면 차트 보여줄 영역</p>
                </div>
            </div>
        </div>
    );
}