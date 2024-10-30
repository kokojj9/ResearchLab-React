import { Post } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./postItem.module.css";

const PostItem: React.FC<{ post: Post }> = ({ post }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewText, setPreviewText] = useState<string>("");

  useEffect(() => {
    // 게시글 내용에서 첫 번째 이미지 태그의 src 추출
    const extractImageFromContent = (htmlContent: string) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, "text/html");
      const img = doc.querySelector("img"); // 첫 번째 이미지 태그 찾기
      return img ? img.src : null; // 이미지가 있으면 src 반환
    };

    // 게시글 내용에서 이미지 태그를 제거하고 텍스트만 추출
    const extractTextFromContent = (htmlContent: string) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, "text/html");
      return doc.body.textContent || ""; // 텍스트만 반환
    };

    const firstImage = extractImageFromContent(post.content);
    const textContent = extractTextFromContent(post.content);

    // 글자 수 제한 (100자로 제한)
    const truncatedText =
      textContent.length > 100
        ? textContent.slice(0, 100) + "..."
        : textContent;

    setPreviewImage(firstImage);
    setPreviewText(truncatedText);
  }, [post.content]);

  return (
    <div className={styles["trade-post-item"]}>
      <Link
        href={`/strategylab/${post.postNo}`}
        className={styles["trade-post-link"]}
      >
        {previewImage ? (
          <Image
            src={previewImage} // 추출한 이미지 URL 사용
            alt="게시글 메인 이미지"
            height={300}
            width={300}
            priority
          />
        ) : (
          <div className={styles["no-preview"]}>미리보기 없음</div>
        )}
        <div className={styles["trade-post-content"]}>
          <h2>{post.title}</h2>
          {/* 글자 수 제한된 텍스트만 출력 */}
          <p>{previewText}</p>
          <div className={styles["trade-post-footer"]}>
            <span>👀 {post.views}</span>
            <span>{post.createDate}</span>
            <span>by {post.writer}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostItem;
