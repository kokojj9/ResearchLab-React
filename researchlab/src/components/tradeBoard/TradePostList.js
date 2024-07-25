import TradePostItem from "./TradePostItem";
import "./TradePostList.css";

const TradePostList = () => {
  // 더미 데이터
  const posts = [
    {
      boardNo: 1,
      memberId: "testMember",
      title: "테스트1",
      content: "요약내용1",
      img: 'https://i.namu.wiki/i/8N3IbreE6Wc57iuEkNzTbtbtKZpges0e1bWaZPI1paspjk71uGWU5ttRZUy6mD8_UNED1Y4oSTPZgvzhBm5nlQ.webp'
    },
    {
      boardNo: 2,
      memberId: "testMember2",
      title: "테스트2",
      content: "요약내용2",
      img: 'https://i.ytimg.com/vi/AdZ5IGM9_uE/maxresdefault.jpg'
    },
    {
      boardNo: 3,
      memberId: "testMember3",
      title: "테스트3",
      content: "요약내용3",
      img: 'https://m.aqostudio.com/web/upload/NNEditor/20220921/EC9584EC9DB4EBB88C20EAB080EC9D84.jpg'
    },
    {
      boardNo: 4,
      memberId: "testMember3",
      title: "테스트3",
      content: "요약내용3",
      img: 'https://m.aqostudio.com/web/upload/NNEditor/20220921/EC9584EC9DB4EBB88C20EAB080EC9D84.jpg'
    },
    {
      boardNo: 5,
      memberId: "testMember3",
      title: "테스트3",
      content: "요약내용3",
      img: 'https://m.aqostudio.com/web/upload/NNEditor/20220921/EC9584EC9DB4EBB88C20EAB080EC9D84.jpg'
    },
    {
      boardNo: 6,
      memberId: "testMember3",
      title: "테스트3",
      content: "요약내용3",
      img: 'https://m.aqostudio.com/web/upload/NNEditor/20220921/EC9584EC9DB4EBB88C20EAB080EC9D84.jpg'
    },
  ];

  return (
    <div className="container">
      <div className="trade-post-list">
        {posts.map(post => (
          <TradePostItem key={post.boardNo} post={post} />
        ))}
      </div>
    </div>
  );
};

export default TradePostList;
