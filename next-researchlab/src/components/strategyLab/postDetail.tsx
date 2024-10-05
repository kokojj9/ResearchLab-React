"use client";

import { Member, Post } from "@/types/types";
import Image from "next/image";

import { RootState } from "@/redux/memberActions";
import postService from "@/services/postService";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import classes from "./postDetail.module.css";

const PostDetail: React.FC<{ post: Post }> = ({ post }) => {
  const router = useRouter();

  const member = useSelector(
    (state: RootState) => state.member
  ) as Member | null;

  const deletePost = async (postNo: number) => {
    const memberId = member?.memberId;

    if (!memberId) {
      console.log("로그인된 사용자가 없습니다.");
      return;
    }

    const response = await postService.deletePost(postNo, memberId);

    if (response.status === 200) {
      alert("게시글을 삭제 하였습니다.");
    } else {
      console.log(`게시글 삭제 실패: ${response.status}`);
    }

    router.push("/strategylab");
  };

  return (
    <div>
      <h1>{post!.title}</h1>
      {member?.memberId == post.writer ? (
        <p>
          <button
            onClick={() => router.push(`/strategylab/editPost/${post.postNo}`)}
          >
            수정하기
          </button>
          <button onClick={() => deletePost(post.postNo)}>삭제하기</button>
        </p>
      ) : (
        <div></div>
      )}
      <p>작성자: {post!.writer}</p>
      <p>{post!.content}</p>
      {post.imageList[0].storedName ? (
        <Image
          className={classes.imageClass}
          src={`/${post.imageList[0].storedName}`}
          alt={post.title}
          width={300}
          height={300}
          style={{ borderRadius: "8px" }}
          unoptimized
        />
      ) : (
        <h3>미리보기 이미지가 없습니다.</h3>
      )}
    </div>
  );
};

export default PostDetail;
