"use client";

import { Member, RootState } from "@/redux/memberActions";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const MyPosts = () => {
  const member = useSelector(
    (state: RootState) => state.member
  ) as Member | null;

  useEffect(() => {}, [member]);

  return (
    <>
      <h1>내가 쓴글 목록</h1>
    </>
  );
};

export default MyPosts;
