"use client";

import { Post } from "@/components/strategyLab/postItem";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const StrategyPostDetail = () => {
  const postNo = useParams<{ postNo: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (postNo?.postNo) {
      const fetchPost = async () => {
        try {
          const response = await axios.get(`/api/tradeBoard/${postNo.postNo}`);
          setPost(response.data);
          setIsLoading(false);
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchPost();
    }
  }, [postNo]);

  return (
    <div style={{ textAlign: "center", padding: "20px", color: "#e1eeeb" }}>
      {isLoading == true ? (
        <h1>Loading...</h1>
      ) : post ? (
        <>
          <h1>{post!.title}</h1>
          <p>작성자: {post!.writer}</p>
          <Image
            src={`/${post!.imageList[0].storedName}`}
            alt={post!.title}
            style={{ width: "400px", height: "auto", borderRadius: "8px" }}
          />
          <p>{post!.content}</p>
        </>
      ) : (
        <p>게시글을 찾을 수 없음</p>
      )}
    </div>
  );
};

export default StrategyPostDetail;
