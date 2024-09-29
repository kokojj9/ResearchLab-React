import Image from "next/image";
import { Post } from "./postItem";

import { Member, RootState } from "@/redux/memberActions";
import axios from "axios";
import { useSelector } from "react-redux";
import classes from "./postDetail.module.css";

const PostDetail: React.FC<{ post: Post }> = ({ post }) => {
  // const member = useContext(MemberContext);
  const member = useSelector(
    (state: RootState) => state.member
  ) as Member | null;

  const deletePost = async (postNo: number) => {
    const memberId = member?.memberId;

    if (!memberId) {
      console.log("로그인된 사용자가 없습니다.");
      return;
    }

    const response = await axios.delete(`/api/strategylab/posts/${postNo}`, {
      params: { memberId },
    });
    console.log(response);
    if (response.status === 200) {
      console.log("게시글 삭제 성공");
    } else {
      console.log(`게시글 삭제 실패: ${response.status}`);
    }
    return;
  };

  return (
    <>
      <h1>{post!.title}</h1>
      {member?.memberId == post.writer ? (
        <p>
          <button>수정하기</button>
          <button onClick={() => deletePost(post.postNo)}>삭제하기</button>
        </p>
      ) : (
        <></>
      )}
      <p>작성자: {post!.writer}</p>
      <Image
        className={classes.imageClass}
        src={`/${post!.imageList[0].storedName}`}
        alt={post.title}
        width={100}
        height={100}
        style={{ borderRadius: "8px" }}
        unoptimized
      />
      <p>{post?.content}</p>
    </>
  );
};

export default PostDetail;
