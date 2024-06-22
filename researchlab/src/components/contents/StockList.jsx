import { useEffect } from "react"

export default function StockList() {
    useEffect(() => {
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
            <div id="tradingview-widget-container" class="tradingview-widget-container">
                <div class="tradingview-widget-container__widget"></div>
            </div>
            <div className="separator"></div>
            <p>주식/ 코인 종목조회영역</p>
        </div>
    );
}