"use client";

import useManagePost from "@/hooks/posts/useManagePost";
import { RootState } from "@/redux/memberActions";
import { Member, Post } from "@/types/types";
import { useSelector } from "react-redux";
import QuillEditor from "../quill/QuillEditor";
import styles from "./postForm.module.css";

const PostForm: React.FC<{ type: string; post: Post | null }> = ({
  type,
  post,
}) => {
  const member = useSelector(
    (state: RootState) => state.member
  ) as Member | null;

  const { newPost, handleTitleChange, handleContentChange, handleSubmit } =
    useManagePost(post, member!.memberId, type);

  return (
    <div className={styles["new-trade-post"]}>
      <h2 className={styles["form-title"]}>
        {post ? "게시글 수정" : "새 게시글 작성"}
      </h2>
      <form className={styles["post-form"]} onSubmit={handleSubmit}>
        <div className={styles["form-group"]}>
          <label htmlFor="title">제목: </label>
          <input
            type="text"
            value={newPost?.title}
            id="title"
            onChange={handleTitleChange}
            className={styles["form-control"]}
            required
          />
        </div>
        <div className={styles["form-group"]}>
          <label>내용</label>
          <QuillEditor value={newPost.content} onChange={handleContentChange} />
        </div>
        <div className={styles["button-group"]}>
          <button type="submit" className={styles["submit-btn"]}>
            {post ? "수정하기" : "작성하기"}
          </button>
          <button type="button" className={styles["submit-btn"]}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
