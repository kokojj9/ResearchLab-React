import postService from "@/services/postService";
import { Post } from "@/types/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useManagePost = (
  initialPost: Post | null,
  memberId: string,
  type: string
) => {
  const router = useRouter();

  const [newPost, setNewPost] = useState<Post>({
    postNo: initialPost?.postNo || 0,
    title: initialPost?.title || "",
    content: initialPost?.content || "",
    writer: initialPost?.writer || memberId || "",
    views: initialPost?.views || 0,
    imageList: initialPost?.imageList || [],
    createDate: initialPost?.createDate || "",
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPost({ ...newPost, title: e.target.value });
  };

  // Quill 에디터의 onChange를 통해 바로 content 상태 업데이트
  const handleContentChange = (content: string) => {
    setNewPost({ ...newPost, content });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append(
      "post",
      new Blob([JSON.stringify(newPost)], { type: "application/json" })
    );

    if (type === "edit") {
      await postService.updatePost(newPost.postNo, formData);
    } else {
      await postService.createPost(formData);
    }

    router.push("/strategylab");
  };

  return {
    newPost,
    handleTitleChange,
    handleContentChange,
    handleSubmit,
  };
};

export default useManagePost;
