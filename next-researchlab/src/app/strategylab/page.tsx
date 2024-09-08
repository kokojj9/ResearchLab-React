"use client";

import { Post } from "@/components/strategyLab/postItem";
import PostList from "@/components/strategyLab/postList";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

const StrategylabBoard = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/strategylab", {
          params: { page, size: 15 },
        });
        setPosts((prevPosts) => [...prevPosts, ...response.data.content]);
        setHasMore(!response.data.last);
      } catch (error) {
        console.error("조회 실패", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  return (
    <div className={styles["trade-diary-board"]}>
      <header className={styles["board-header"]}>
        <h1>매매전략연구소</h1>
        <div className={styles["board-actions"]}>
          <Link href="/strategylab/new" className={styles.btn}>
            글쓰기
          </Link>
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
