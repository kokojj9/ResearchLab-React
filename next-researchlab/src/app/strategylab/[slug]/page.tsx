import Image from "next/image";
import { useParams } from "next/navigation";

const StrategyPostDetail = () => {
  console.log("11");
  const { postNo } = useParams();

  //더미 데이터
  const post = {
    postNo,
    memberId: "testMember",
    title: "테스트" + postNo,
    content: "내용" + postNo,
    img: "https://i.namu.wiki/i/8N3IbreE6Wc57iuEkNzTbtbtKZpges0e1bWaZPI1paspjk71uGWU5ttRZUy6mD8_UNED1Y4oSTPZgvzhBm5nlQ.webp",
    likes: 66,
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", color: "#e1eeeb" }}>
      <h1>{post.title}</h1>
      <p>작성자: {post.memberId}</p>
      <p>좋아요: {post.likes}</p>
      <Image
        src={post.img}
        alt={post.title}
        style={{ width: "400px", height: "auto", borderRadius: "8px" }}
      />
      <p>{post.content}</p>
    </div>
  );
};

export default StrategyPostDetail;
