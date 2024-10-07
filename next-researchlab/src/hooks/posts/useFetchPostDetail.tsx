import postService from "@/services/postService";
import { Post } from "@/types/types";
import { useEffect, useState } from "react";

const useFetchPostDetail = (postNo: string) => {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (postNo) {
      const fetchPost = async () => {
        const resPost = await postService.fetchPostDetail(postNo);
        setPost(resPost);
        setIsLoading(false);
      };

      fetchPost();
    }
  }, [postNo]);

  return { post, isLoading };
};

export default useFetchPostDetail;
