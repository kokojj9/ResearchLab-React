import React, { useEffect, useRef, memo, useState, useContext } from "react";
import SideMenu from "./imvestment/SideMenu";
import FindInvestment from "./imvestment/FindInvestment";
import "./StockList.css";
import MyList from "./imvestment/MyList";

const StockList = () => {
  const [showConfig, setShowConfig] = useState(false);
  const [showMyList, setShowMyList] = useState(false);
  const [list, setList] = useState([]);

  const handleSetList = (name, stocks) => {
    const newList = {
      id: Math.round(Math.random() * 1000),
      name: name,
      stocks: stocks,
    };
    setList([...list, newList]);
    setShowConfig(false);
  };

  const handleControlConfig = () => {
    setShowConfig(true);
    setShowMyList(false);
  };

  const handleMyList = () => {
    setShowConfig(false);
    setShowMyList(true);
  };

  return (
    <>
      <h2>종목 조회</h2>
      <div className="secter-container">
        <div className="member-menu-config">
          <SideMenu
            onSelect={handleControlConfig}
            onShow={handleMyList}
            list={list}
          />
        </div>
        <div className="stock-list">
          {showConfig && <FindInvestment onSave={handleSetList} />}
          {showMyList && <MyList />}
        </div>
      </div>
    </>
  );
}

export default StockList;