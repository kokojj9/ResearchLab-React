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

  async fetchPostDetail(postNo: string): Promise<Post> {
    const res = await axios.get(`/api/strategylab/posts/${postNo}`);
    return res.data;
  },

  async createPost(formData: FormData) {
    return await axios.post("/api/strategylab/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  async updatePost(postNo: number, formData: FormData) {
    return await axios.put(`/api/strategylab/posts/${postNo}`, formData, {
      headers: {
        "Content-Type": "multipart/formData",
      },
    });
  },

  async deletePost(postNo: number, memberId: string) {
    return await axios.delete(`/api/strategylab/posts/${postNo}`, {
      params: { memberId },
    });
  },
};

export default postService;
