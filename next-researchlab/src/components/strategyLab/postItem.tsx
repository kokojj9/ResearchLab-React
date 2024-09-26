import Image from "next/image";
import Link from "next/link";
import styles from "./postItem.module.css";

export interface Post {
  postNo: number;
  title: string;
  content: string;
  writer: string;
  views: number;
  imageList: image[];
  createDate: string;
}

export interface PostItemProps {
  post: Post;
}

type image = {
  imageNo: number;
  title: string;
  originName: string;
  storedName: string;
};

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  return (
    <div className={styles["trade-post-item"]}>
      <Link
        href={`/strategylab/${post.postNo}`}
        className={styles["trade-post-link"]}
      >
        <Image
          key={post.imageList[0].imageNo}
          src={`/${post.imageList[0].storedName}`} // nextjs Image에서는 절대경로로
          alt="게시글메인이미지"
          height={300}
          width={300}
          priority // Image 태그 최적화 비활성화
        />
        <div className={styles["trade-post-content"]}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <div className={styles["trade-post-footer"]}>
            <span>by {post.writer}</span>
            <span>{post.createDate}</span>
            {/* <span>👀 {post.views}</span> */}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostItem;
