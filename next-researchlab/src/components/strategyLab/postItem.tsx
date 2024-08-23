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
}

interface PostItemProps {
  post: Post;
}

type image = {
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
        {post.imageList.map((image) => (
          <Image
            key={image.title}
            src={`/${image.storedName}`} // nextjs Image에서는 절대경로로
            alt={image.title}
            height={300}
            width={300}
          />
        ))}
        <div className={styles["trade-post-content"]}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <div className={styles["trade-post-footer"]}>
            <span>by {post.writer}</span>
            {/* <span>👀 {post.views}</span> */}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostItem;
