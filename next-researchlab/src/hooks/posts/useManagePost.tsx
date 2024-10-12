import postService from "@/services/postService";
import { Post } from "@/types/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useManagePost = (
  initialPost: Post | null,
  memberId: string,
  type: string
) => {
  const [pendingImages, setPendingImages] = useState<File[]>([]); // 이미지 저장
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

  // 이미지 업로드: Quill과 관련된 처리는 나중에 제출 시 서버로 전송
  const handleImageUpload = (image: File) => {
    setPendingImages((prevImages) => [...prevImages, image]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append(
      "post",
      new Blob([JSON.stringify(newPost)], { type: "application/json" })
    );

    pendingImages.forEach((image) => {
      formData.append("imageList", image); // 제출 시 이미지 파일을 함께 전송
    });

    console.log(formData);

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
    handleImageUpload,
    handleSubmit,
  };
};

export default useManagePost;
