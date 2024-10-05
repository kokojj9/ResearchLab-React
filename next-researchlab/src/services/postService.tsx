import { Post } from "@/types/types";
import axios from "axios";

const postService = {
  async fetchAllPosts(page: number, size: number): Promise<Post[]> {
    const res = await axios.get("/api/strategylab/posts", {
      params: { page, size },
    });
    return res.data.content;
  },

  async fetchMyPosts(
    memberId: string,
    page: number,
    size: number
  ): Promise<Post[]> {
    const res = await axios.get(`/api/strategylab/members/${memberId}/posts`, {
      params: { page, size },
    });
    return res.data.content;
  },
};

export default postService;
