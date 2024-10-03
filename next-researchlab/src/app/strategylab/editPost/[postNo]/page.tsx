"use client";

import PostForm from "@/components/strategyLab/postForm";
import { Post } from "@/components/strategyLab/postItem";
import { Member, RootState } from "@/redux/memberActions";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const EditPost = () => {
  const params = useParams();
  const postNo = params?.postNo;

  const [isLoading, setIsLoading] = useState(true);

  const member = useSelector(
    (state: RootState) => state.member
  ) as Member | null;

  const [post, setPost] = useState<Post | null>(null);

  //포스트 정보 서버에 요청
  useEffect(() => {
    const fetchPost = async () => {
      console.log("상세글 조회");

      try {
        const response = await axios.get(`/api/strategylab/posts/${postNo}`);
        setPost(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPost();
  }, [postNo]);

  return (
    <>
      {isLoading && <h4 style={{ textAlign: "center" }}>Loading...</h4>}
      {!isLoading && member ? (
        post ? ( // post가 있는 경우에만 PostForm을 렌더링
          <PostForm type="edit" post={post} />
        ) : (
          <h4 style={{ textAlign: "center" }}>게시글을 불러오지 못했습니다.</h4>
        )
      ) : (
        <h4 style={{ textAlign: "center" }}>
          회원 서비스입니다. 로그인 해주세요
        </h4>
      )}
    </>
  );
};

export default EditPost;
