"use client";

import { Post } from "@/components/strategyLab/postItem";
import PostList from "@/components/strategyLab/postList";
import { Member, RootState } from "@/redux/memberActions";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./page.module.css";

const StrategylabBoard = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [viewType, setViewType] = useState("all");

  const member = useSelector(
    (state: RootState) => state.member
  ) as Member | null;

  // 전체 글, 내 글 조회 요청 공용 메서드
  const fetchPosts = async (url: string, params = {}) => {
    try {
      const response = await axios.get(url, { params }); // 글조회, 내글조회 중복으로 url를 동적으로 취급 할 수 있게끔 매개변수로 변경
      setPosts((prevPost) => [...prevPost, ...response.data.content]);
      setHasMore(!response.data.last);
      console.log(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("조회 실패", error);
    }
  };

  useEffect(() => {
    setIsLoading(true);

    if (viewType === "all") {
      fetchPosts("/api/strategylab/posts", { page, size: 15 });
    } else if (viewType === "my") {
      if (member) {
        fetchPosts(`/api/strategylab/members/${member!.memberId}/posts`, {
          page,
          size: 15,
        });
      } else {
        alert("로그인이 필요합니다.");
        return;
      }
    }
  }, [page, viewType, member]);

  const handleViewChange = (type: string) => {
    if (type != viewType) setPosts([]);
    setPage(0);
    setViewType(type);
  };

  return (
    <div className={styles["trade-diary-board"]}>
      <header className={styles["board-header"]}>
        <h1>매매전략연구소</h1>
        <div className={styles["board-actions"]}>
          {member ? (
            <Link href="/strategylab/new" className={styles.btn}>
              글쓰기
            </Link>
          ) : (
            <button className={styles.btn} disabled>
              글쓰기 (로그인 필요)
            </button>
          )}
          <button
            className={styles.btn}
            onClick={() => handleViewChange("all")}
          >
            전체 게시글 보기
          </button>
          {member && (
            <button
              className={styles.btn}
              onClick={() => handleViewChange("my")}
            >
              내 게시글 보기
            </button>
          )}
        </div>
      </header>
      <main>{isLoading ? <p>Loading...</p> : <PostList posts={posts} />}</main>
    </div>
  );
};

export default StrategylabBoard;
