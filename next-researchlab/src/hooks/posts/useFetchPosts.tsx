import postService from "@/services/postService";
import { Post } from "@/types/types";
import { useEffect, useState } from "react";

const useFetchPosts = (
  viewType: string,
  memberId: string | null,
  page: number
) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);

      if (viewType === "all") {
        const allPosts = await postService.fetchAllPosts(page, 15);
        setPosts((prevPosts) => [...prevPosts, ...allPosts]);
      } else if (viewType === "my") {
        const myPosts = await postService.fetchMyPosts(memberId!, page, 15);
        setPosts((prevPosts) => [...prevPosts, ...myPosts]);
      }

      setIsLoading(false);
    };

    fetchPosts();
  }, [page, viewType, memberId]);

  return { posts, isLoading, hasMore };
};

export default useFetchPosts;
