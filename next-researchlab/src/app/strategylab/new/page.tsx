"use client";

import { Member, RootState } from "@/redux/memberActions";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./page.module.css";

const NewPost = () => {
  const member = useSelector(
    (state: RootState) => state.member
  ) as Member | null;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previewImage, setPreviewImage] = useState<string[]>([]);
  const router = useRouter();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);
  // 이벤트타입의 경우 React접두사가 필요함
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setImages(fileArray);
      const previewFiles = fileArray.map((file) => URL.createObjectURL(file));
      setPreviewImage(previewFiles);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    const post = {
      title,
      content,
      writer: member!.memberId,
      imageList: images.map((image) => ({ originalName: image.name })),
    };

    formData.append(
      "post",
      new Blob([JSON.stringify(post)], { type: "application/json" })
    );

    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await axios.post("/strategylab/posts", formData, {
        headers: {
          "content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        router.push("/strategylab");
      }
    } catch (error) {
      console.log("실패", error);
    }
  };

  return (
    <>
      {member ? (
        <div className={styles["new-trade-post"]}>
          <h2 className={styles["form-title"]}>새 글 작성</h2>
          <form className={styles["post-form"]} onSubmit={handleSubmit}>
            <div className={styles["form-group"]}>
              <label htmlFor="title">제목: </label>
              <input
                type="text"
                value={title}
                id="title"
                onChange={handleTitleChange}
                className={styles["form-control"]}
                required
              />
            </div>
            <div className="form-group">
              <label>내용</label>
              <textarea
                value={content}
                id="content"
                onChange={handleContentChange}
                className={styles["form-control"]}
                required
              />
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="images">사진</label>
              <input
                type="file"
                id="images"
                className={styles["form-control"]}
                onChange={handleImageChange}
                multiple
                accept="image/*"
              />
            </div>
            <div>
              <h4>미리보기</h4>
              {previewImage.map((src, i) => (
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
              작성하기
            </button>
          </form>
        </div>
      ) : (
        <h4 style={{ textAlign: "center" }}>
          회원 서비스입니다. 로그인 해주세요
        </h4>
      )}
    </>
  );
};

export default NewPost;
