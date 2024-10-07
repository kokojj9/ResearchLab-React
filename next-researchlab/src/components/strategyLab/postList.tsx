import { Post } from "@/types/types";
import PostItem from "./postItem";
import styles from "./postList.module.css";

const PostList: React.FC<{ posts: Post[] }> = ({ posts }) => {
  return (
    <div className={styles.container}>
      <div className={styles["trade-post-list"]}>
        {posts != undefined ? (
          posts.map((post) => <PostItem key={post.postNo} post={post} />)
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default PostList;
