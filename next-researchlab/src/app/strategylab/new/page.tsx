"use client";

import PostForm from "@/components/strategyLab/postForm";
import { Member, RootState } from "@/redux/memberActions";
import { useSelector } from "react-redux";

const NewPost = () => {
  const member = useSelector(
    (state: RootState) => state.member
  ) as Member | null;

  return (
    <>
      {member ? (
        <PostForm type="new" post={null} />
      ) : (
        <h4 style={{ textAlign: "center" }}>
          회원 서비스입니다. 로그인 해주세요
        </h4>
      )}
    </>
  );
};

export default NewPost;
