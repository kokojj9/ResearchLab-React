"use client";

import PostList from "@/components/strategyLab/postList";
import { Member, RootState } from "@/redux/memberActions";
import postService from "@/services/postService";
import { Post } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./page.module.css";

const StrategylabBoard = () => {
  const [page, setPage] = useState(0);
  const [viewType, setViewType] = useState("all");

  const member = useSelector(
    (state: RootState) => state.member
  ) as Member | null;

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
