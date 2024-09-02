import Image from "next/image";
import { Post } from "./postItem";

import { Member, RootState } from "@/redux/memberActions";
import { useSelector } from "react-redux";
import classes from "./postDetail.module.css";

const PostDetail: React.FC<{ post: Post }> = ({ post }) => {
  // const member = useContext(MemberContext);
  const member = useSelector(
    (state: RootState) => state.member
  ) as Member | null;

  return (
    <>
      <h1>{post!.title}</h1>
      {member?.memberId == post.writer ? (
        <p>
          <button>수정하기</button>
          <button>삭제하기</button>
        </p>
      ) : (
        <></>
      )}
      <p>작성자: {post!.writer}</p>
      <Image
        className={classes.imageClass}
        src={`/${post!.imageList[0].storedName}`}
        alt={post!.title}
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
