import React, { useCallback, useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import TradePostList from "../../components/tradeBoard/TradePostList";
import "./TradeDiaryBoard.css";
import axios from "axios";

const TradeDiaryBoard = () => {
  const location = useLocation();
  const isPost = location.pathname.includes("/tradeBoard/");
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/tradeBoard", {
        params: { page, size: 15 },
      });
      console.log(response.data);
      setPosts((prevPosts) => [...prevPosts, ...response.data.content]);
      setHasMore(!response.data.last);
    } catch (error) {
      console.error("조회 실패", error);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

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
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <TradePostList posts={posts} />
        )}
        <Outlet />
      </main>
    </div>
  );
};

export default TradeDiaryBoard;
