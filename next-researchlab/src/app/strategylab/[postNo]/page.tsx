"use client";

import { Post } from "@/types/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import PostDetail from "@/components/strategyLab/postDetail";
import postService from "@/services/postService";

const StrategyPostDetail = () => {
  const params = useParams();
  const postNo = typeof params?.postNo === "string" ? params.postNo : "";
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (postNo) {
      const fetchPost = async () => {
        console.log("상세글 조회");

        try {
          const resPost = await postService.fetchPostDetail(postNo);
          setPost(resPost);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      };

      fetchPost();
    }
  }, [postNo]);

  return (
    <div style={{ textAlign: "center", padding: "20px", color: "#e1eeeb" }}>
      {isLoading == true ? <h1>Loading...</h1> : <PostDetail post={post!} />}
    </div>
  );
};

export default StrategyPostDetail;
