import React, { useEffect, useRef, memo } from 'react';

let flag = false;

function ChartDetail() {
  const container = useRef();

  useEffect(
    () => {

      if(flag){
        return;
      }

      flag = true;

      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "autosize": true,
          "symbol": "BINANCE:BTCUSD",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "kr",
          "withdateranges": true,
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "calendar": false,
          "studies": [
            "STD;RSI"
          ],
          "support_host": "https://www.tradingview.com"
        }`;
      container.current.appendChild(script);
    }, []
  );

  return (
    <div className="chart-widget" ref={container} style={{ height: "100%", width: "100%" }}>
    </div>
  );
}

export default memo(ChartDetail);