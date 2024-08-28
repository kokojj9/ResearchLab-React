"use client";

import { Post } from "@/components/strategyLab/postItem";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import classes from "./page.module.css";

const StrategyPostDetail = () => {
  const postNo = useParams<{ postNo: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (postNo) {
      const fetchPost = async () => {
        try {
          const response = await axios.get(`/api/tradeBoard/${postNo.postNo}`);
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
      {isLoading == true ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1>{post!.title}</h1>
          <p>작성자: {post!.writer}</p>
          <Image
            className={classes.imageClass}
            src={`/${post!.imageList[0].storedName}`}
            alt={post!.title}
            width={100}
            height={100}
            style={{ borderRadius: "8px" }}
            unoptimized
            priority
          />
          <p>{post?.content}</p>
        </>
      )}
    </div>
  );
};

export default StrategyPostDetail;
