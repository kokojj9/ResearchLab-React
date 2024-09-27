"use client";

import { Member, RootState } from "@/redux/memberActions";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const MyPosts = () => {
  const member = useSelector(
    (state: RootState) => state.member
  ) as Member | null;

  useEffect(() => {
    const fetchMyPost = async () => {
      try {
        const response = await axios.get(
          `/api/strategylab/members/${member?.memberId}/posts`
        );

        console.log("내 글 조회");
      } catch (error) {}
    };

    fetchMyPost();
  }, []);

  return (
    <>
      <h1>내가 쓴글 목록</h1>
    </>
  );
};

export default MyPosts;
