import { Post } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import styles from "./postItem.module.css";

const PostItem: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className={styles["trade-post-item"]}>
      <Link
        href={`/strategylab/${post.postNo}`}
        className={styles["trade-post-link"]}
      >
        {post.imageList[0].storedName ? (
          <Image
            src={`/${post.imageList[0].storedName}`} // nextjs Image에서는 절대경로로
            alt="게시글 메인 이미지"
            height={300}
            width={300}
            priority
          />
        ) : (
          <div
            style={{
              textAlign: "center",
              height: "150px",
              margin: "0",
              lineHeight: "150px",
              borderBottom: "solid 1px gray",
            }}
          >
            미리보기 없음
          </div>
        )}
        <div className={styles["trade-post-content"]}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <div className={styles["trade-post-footer"]}>
            <span>by {post.writer}</span>
            <span>{post.createDate}</span>
            <span>👀 {post.views}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostItem;
