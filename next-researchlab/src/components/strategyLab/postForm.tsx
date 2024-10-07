"use client";

import useManagePost from "@/hooks/posts/useManagePost";
import { RootState } from "@/redux/memberActions";
import { Member, Post } from "@/types/types";
import Image from "next/image";
import { useSelector } from "react-redux";
import styles from "./postForm.module.css";

const PostForm: React.FC<{ type: string; post: Post | null }> = ({
  type,
  post,
}) => {
  const member = useSelector(
    (state: RootState) => state.member
  ) as Member | null;

  const {
    newPost,
    previewImages,
    handleTitleChange,
    handleContentChange,
    handleImageChange,
    handleSubmit,
  } = useManagePost(post, member!.memberId, type);

  // useEffect(() => {
  //   if (type === "edit" && post) {
  //     const initialPreviews = post.imageList.map(
  //       (image) => `/${image.storedName}`
  //     );
  //     setPreviewImages(initialPreviews); // 수정 시 기존 이미지 미리보기 설정
  //   }
  // }, [post, type]);
  // 커스텀훅으로 분리되어 값 변경시 자동으로 재렌더링 -> 이 로직은 필요없어짐

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
          <textarea
            value={newPost?.content}
            id="content"
            onChange={handleContentChange}
            className={styles["form-control"]}
            required
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="imageList">사진</label>
          <input
            type="file"
            id="imageList"
            onChange={handleImageChange}
            className={styles["form-control"]}
            multiple
            accept="image/*"
          />
        </div>
        <div className={styles["form-group"]}>
          <label>미리보기</label>
          {previewImages.map((src, i) => (
            <Image
              key={i}
              src={src}
              width={300}
              height={300}
              alt="미리보기"
              style={{
                objectFit: "cover",
                margin: "5px",
              }}
            />
          ))}
        </div>
        <button type="submit" className={styles["submit-btn"]}>
          {post ? "수정하기" : "작성하기"}
        </button>
      </form>
    </div>
  );
};

export default PostForm;
