"use client";

import { RootState } from "@/redux/memberActions";
import postService from "@/services/postService";
import { Member, Post } from "@/types/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./postDetail.module.css";

const PostDetail: React.FC<{ post: Post }> = ({ post }) => {
  const router = useRouter();
  const member = useSelector(
    (state: RootState) => state.member
  ) as Member | null;

  const deletePost = async (postNo: number) => {
    const memberId = member?.memberId;

    if (!memberId) {
      console.log("로그인된 사용자가 없습니다.");
      return;
    }

    await postService.deletePost(postNo, memberId);
    router.push("/strategylab");
  };

  return (
    <div className={styles.postContainer}>
      {/* 포스트 헤더: 제목, 작성자, 작성일 */}
      <div className={styles.postHeader}>
        <h1 className={styles.postTitle}>{post.title}</h1>
        <div className={styles.postInfo}>
          <span className={styles.writer}>작성자: {post.writer}</span>
          <span className={styles.date}>
            작성일: {new Date(post.createDate).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* 포스트 내용 */}
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* 수정 및 삭제 버튼 */}
      {member?.memberId === post.writer && (
        <div className={styles.actionButtons}>
          <button
            className={`${styles.actionButton} ${styles.editButton}`}
            onClick={() => router.push(`/strategylab/editPost/${post.postNo}`)}
          >
            수정하기
          </button>
          <button
            className={`${styles.actionButton} ${styles.deleteButton}`}
            onClick={() => deletePost(post.postNo)}
          >
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
