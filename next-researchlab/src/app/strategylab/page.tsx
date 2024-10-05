"use client";

import PostList from "@/components/strategyLab/postList";
import useFetchPosts from "@/hooks/posts/useFetchPosts";
import useViewType from "@/hooks/posts/useViewType";
import { RootState } from "@/redux/memberActions";
import { Member } from "@/types/types";
import Link from "next/link";
import { useSelector } from "react-redux";
import styles from "./page.module.css";

const StrategylabBoard = () => {
  const { viewType, page, setPage, handleViewChange } = useViewType();

  const member = useSelector(
    (state: RootState) => state.member
  ) as Member | null;

  const { posts, isLoading } = useFetchPosts(
    viewType,
    member?.memberId || null,
    page
  );

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
