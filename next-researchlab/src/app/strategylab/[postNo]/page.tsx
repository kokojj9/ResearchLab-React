"use client";

import { Post } from "@/components/strategyLab/postItem";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import PostDetail from "@/components/strategyLab/postDetail";

const StrategyPostDetail = () => {
  const postNo = useParams<{ postNo: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (postNo) {
      const fetchPost = async () => {
        console.log("상세글 조회");
        try {
          const response = await axios.get(
            `/api/strategylab/posts/${postNo.postNo}`
          );
          setPost(response.data);
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
