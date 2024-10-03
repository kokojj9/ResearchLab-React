"use client";

import { Member, RootState } from "@/redux/memberActions";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./postForm.module.css";
import { Post } from "./postItem";

const PostForm: React.FC<{ type: string; post: Post | null }> = ({
  type,
  post,
}) => {
  const member = useSelector(
    (state: RootState) => state.member
  ) as Member | null;

  const [newPost, setNewPost] = useState<Post>({
    postNo: post?.postNo || 0,
    title: post?.title || "",
    content: post?.content || "",
    writer: post?.writer || member?.memberId || "",
    views: post?.views || 0,
    imageList: post?.imageList || [],
    createDate: post?.createDate || "",
  });

  const [previewImages, setPreviewImages] = useState<string[]>([]); // 미리보기 이미지 URL 배열
  const router = useRouter();

  useEffect(() => {
    if (type === "edit" && post) {
      const initialPreviews = post.imageList.map(
        (image) => `/${image.storedName}`
      );
      setPreviewImages(initialPreviews); // 수정 시 기존 이미지 미리보기 설정
    }
  }, [post, type]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPost({ ...newPost, title: e.target.value });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewPost({ ...newPost, content: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      // 이전 미리보기 URL 해제
      previewImages.forEach((url) => URL.revokeObjectURL(url));

      const fileArray = Array.from(files);

      const newImageList = fileArray.map((file, i) => ({
        imageNo: i + 1,
        title: file.name,
        originName: file.name,
        storedName: "",
        file: file,
      }));

      setNewPost((prevPost) => ({
        ...prevPost,
        imageList: newImageList,
      }));

      const newPreviews = fileArray.map((file) => URL.createObjectURL(file)); // 새 미리보기 URL

      setPreviewImages(newPreviews); // 미리보기 상태 업데이트
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    const postData = {
      ...newPost,
      writer: member!.memberId,
    };

    formData.append(
      "post",
      new Blob([JSON.stringify(postData)], { type: "application/json" })
    );
    console.log(newPost.imageList);
    newPost.imageList.forEach((image) => {
      if (image.file) {
        formData.append("imageList", image.file);
      }
    });

    try {
      const response =
        type === "edit"
          ? await axios.put(
              `/api/strategylab/posts/${newPost.postNo}`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            )
          : await axios.post("/api/strategylab/posts", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });

      if (response.status === 200) {
        router.push("/strategylab");
      }
    } catch (error) {
      console.log("요청 실패", error);
    }
  };

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
