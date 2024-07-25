import { Link } from "react-router-dom";
import "./TradePostItem.css";

const TradePostItem = ({ post }) => {
  return (
    <div className="trade-post-item">
      <Link to={`/tradeBoard/${post.boardNo}`} className="trade-post-link">
        <img src={post.img} alt={post.title} />
        <div className="trade-post-content">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <div className="trade-post-footer">
            <span>by {post.memberId}</span>
            <span>♥ {post.likes}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TradePostItem;
