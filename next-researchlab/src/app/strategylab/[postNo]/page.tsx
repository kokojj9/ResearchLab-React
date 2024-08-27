"use client";

const StrategyPostDetail = () => {
  // const postNo = useParams<{ postNo: string }>();
  // console.log(postNo);
  // const [isLoading, setIsLoading] = useState(true);
  // const [post, setPost] = useState<PostItemProps | null>(null);

  //더미 데이터
  // const post = {
  //   postNo,
  //   memberId: "testMember",
  //   title: "테스트" + postNo,
  //   content: "내용" + postNo,
  //   img: "https://i.namu.wiki/i/8N3IbreE6Wc57iuEkNzTbtbtKZpges0e1bWaZPI1paspjk71uGWU5ttRZUy6mD8_UNED1Y4oSTPZgvzhBm5nlQ.webp",
  //   likes: 66,
  // };

  // useEffect(() => {
  //   if (postNo) {
  //     const fetchPost = async () => {
  //       try {
  //         console.log("요청");
  //         const response = await axios.get(`/tradeBoard/${postNo}`);
  //         setPost(response.data);
  //         setIsLoading(false);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     fetchPost();
  //   }
  // }, [postNo]);

  return (
    <h1>123</h1>
    // <div style={{ textAlign: "center", padding: "20px", color: "#e1eeeb" }}>
    //   {isLoading == true ? (
    //     <h1>Loading...</h1>
    //   ) : (
    //     <>
    //       <h1>{post!.post.title}</h1>
    //       <p>작성자: {post!.post.writer}</p>
    //       <Image
    //         src={`/${post!.post.imageList[0].storedName}`}
    //         alt={post!.post.title}
    //         style={{ width: "400px", height: "auto", borderRadius: "8px" }}
    //       />
    //       <p>{post?.post.content}</p>
    //     </>
    //   )}
    // </div>
  );
};

export default StrategyPostDetail;
