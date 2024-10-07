import postService from "@/services/postService";
import { Post } from "@/types/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useManagePost = (
  initialPost: Post | null,
  memberId: string,
  type: string
) => {
  const [previewImages, setPreviewImages] = useState<string[]>([]); // 미리보기 이미지 URL 배열
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

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewPost({ ...newPost, content: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      // 이전 미리보기 URL 해제
      previewImages.forEach((url) => URL.revokeObjectURL(url));
      const fileArray = Array.from(files);

      const newImageList = fileArray.map((file, i) => ({
        imageNo: i + 1,
        title: file.name,
        originName: file.name,
        storedName: "",
        file: file,
      }));

      setNewPost((prevPost) => ({
        ...prevPost,
        imageList: newImageList,
      }));

      const newPreviews = fileArray.map((file) => URL.createObjectURL(file)); // 새 미리보기 URL
      setPreviewImages(newPreviews); // 미리보기 상태 업데이트
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData();

    formData.append(
      "post",
      new Blob([JSON.stringify(newPost)], { type: "application/json" })
    );
    newPost.imageList.forEach((image) => {
      if (image.file) {
        formData.append("imageList", image.file);
      }
    });

    type === "edit"
      ? await postService.updatePost(newPost.postNo, formData)
      : await postService.createPost(formData);

    router.push("/strategylab");
  };

  return {
    newPost,
    previewImages,
    handleTitleChange,
    handleContentChange,
    handleImageChange,
    handleSubmit,
  };
};

export default useManagePost;
