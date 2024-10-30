import apiClient from "@/api/apiClient";
import { Post } from "@/types/types";

const postService = {
  async fetchAllPosts(page: number, size: number): Promise<Post[]> {
    try {
      const res = await apiClient.get("/api/strategylab/posts", {
        params: { page, size },
      });
      return res.data.content;
    } catch (e) {
      console.log("전체 게시글 조회 실패", e);
      return [];
    }
  },

  async fetchMyPosts(
    memberId: string,
    page: number,
    size: number
  ): Promise<Post[]> {
    try {
      const res = await apiClient.get(
        `/api/strategylab/members/${memberId}/posts`,
        {
          params: { page, size },
        }
      );

      return res.data.content;
    } catch (e) {
      console.log("내 게시글 조회 실패", e);
      return [];
    }
  },

  async fetchPostDetail(postNo: string): Promise<Post | null> {
    try {
      const res = await apiClient.get(`/api/strategylab/posts/${postNo}`);
      return res.data;
    } catch (e) {
      console.log("게시글 상세조회 실패", e);
      return null;
    }
  },

  async createPost(formData: FormData) {
    try {
      return await apiClient.post("/api/strategylab/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (e) {
      console.log("글 작성 실패", e);
      alert("게시글 작성에 실패하였습니다.");
    }
  },

  async updatePost(postNo: number, formData: FormData) {
    try {
      return await apiClient.put(`/api/strategylab/posts/${postNo}`, formData, {
        headers: {
          "Content-Type": "multipart/formData",
        },
      });
    } catch (e) {
      console.log("게시글 수정 실패", e);
      alert("게시글 수정에 실패하였습니다.");
    }
  },

  async deletePost(postNo: number, memberId: string) {
    try {
      return await apiClient.delete(`/api/strategylab/posts/${postNo}`, {
        params: { memberId },
      });
    } catch (e) {
      console.log("게시글 삭제 실패", e);
      alert("게시글 삭제에 실패하였습니다.");
    }
  },
};

export default postService;
