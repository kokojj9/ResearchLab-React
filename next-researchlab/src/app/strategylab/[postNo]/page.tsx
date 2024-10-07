"use client";

import { useParams } from "next/navigation";

import PostDetail from "@/components/strategyLab/postDetail";
import useFetchPostDetail from "@/hooks/posts/useFetchPostDetail";

const StrategyPostDetail = () => {
  const params = useParams();
  const postNo = typeof params?.postNo === "string" ? params.postNo : "";

  const { post, isLoading } = useFetchPostDetail(postNo);

  return (
    <div style={{ textAlign: "center", padding: "20px", color: "#e1eeeb" }}>
      {isLoading == true ? <h1>Loading...</h1> : <PostDetail post={post!} />}
    </div>
  );
};

export default StrategyPostDetail;
