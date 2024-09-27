"use client";

import { Post } from "@/components/strategyLab/postItem";
import PostList from "@/components/strategyLab/postList";
import { Member, RootState } from "@/redux/memberActions";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./page.module.css";

let flag = true;

const StrategylabBoard = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const member = useSelector(
    (state: RootState) => state.member
  ) as Member | null;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/strategylab/posts", {
          params: { page, size: 15 },
        });
        // console.log(response.data.content);
        setPosts((prevPosts) => [...prevPosts, ...response.data.content]);
        setHasMore(!response.data.last);
        setIsLoading(false);
      } catch (error) {
        console.error("조회 실패", error);
      }
    };

    if (flag) {
      fetchPosts();
      flag = false;
    }
  }, [page]);

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
          <Link href="/strategylab/myPosts" className={styles.btn}>
            내 글 목록 보기
          </Link>
        </div>
      </header>
      <main>{isLoading ? <p>Loading...</p> : <PostList posts={posts} />}</main>
    </div>
  );
};

export default StrategylabBoard;
