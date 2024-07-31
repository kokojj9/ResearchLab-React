import TradePostItem from "./TradePostItem";
import "./TradePostList.css";

const TradePostList = ({ posts }) => {
  return (
    <div className="container">
      <div className="trade-post-list">
        {posts != undefined ? (
          posts.map((post) => <TradePostItem key={post.postNo} post={post} />)
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default TradePostList;
