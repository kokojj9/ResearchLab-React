import React from "react";
import { Link, Outlet } from "react-router-dom";
import TradePostList from "../../components/tradeBoard/TradePostList";
import "./TradeDiaryBoard.css";

const TradeDiaryBoard = () => {
  return (
    <div className="trade-diary-board">
      <header className="board-header">
        <h1>매매전략연구소</h1>
        <div className="board-actions">
          <Link to="/tradeBoard/new" className="btn">
            글쓰기
          </Link>
          <Link to="/tradeBoard/myPosts" className="btn">
            내 글 목록 보기
          </Link>
        </div>
      </header>
      <main>
        <TradePostList />
        <Outlet />
      </main>
    </div>
  );
};

export default TradeDiaryBoard;
