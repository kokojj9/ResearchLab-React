import { Link } from "react-router-dom";
import "./TradePostItem.css";

const TradePostItem = ({ post }) => {
  return (
    <div className="trade-post-item">
      <Link to={`/tradeBoard/${post.postNo}`} className="trade-post-link">
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

export default TradePostItem;
