import Link from "next/link";

const PostItem = ({ post }) => {
  return (
    <div className="trade-post-item">
      <Link href={`/strategylab/${post.postNo}`} className="trade-post-link">
        {post.imageList.map((image) => (
          <img src={image.storedName} alt={post.title} />
        ))}
        <div className="trade-post-content">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <div className="trade-post-footer">
            <span>by {post.writer}</span>
            {/* <span>👀 {post.views}</span> */}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostItem;
