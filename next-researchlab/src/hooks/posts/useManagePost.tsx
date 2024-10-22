import postService from "@/services/postService";
import { Post } from "@/types/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

  const deleteTempImg = async () => {
    try {
      await axios.delete("/api/strategy/fileUpload");
    } catch (error) {
      console.log("임시 파일 삭제 실패", error);
    }
  };
  // 페이지를 벗어날 때 또는 취소 버튼을 눌렀을 때 실행될 로직
  const handleCancel = () => {
    if (type !== "edit") {
      deleteTempImg();
    }
    router.push("/strategylab");
  };

  // 페이지 이탈 시 이미지 삭제 (새로고침, 뒤로가기 등)
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      if (type !== "edit") {
        deleteTempImg();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [type]);

  return {
    newPost,
    handleTitleChange,
    handleContentChange,
    handleSubmit,
    handleCancel,
  };
};

export default useManagePost;
