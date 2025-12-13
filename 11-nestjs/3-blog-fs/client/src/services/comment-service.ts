import api from "./axios";
import type { PaginatedResponse, Comment } from "../types";

const commentService = {
  create: async (blogId: string, content: string) => {
    const res = await api.post(`/blog/${blogId}/comments`, { content });

    return res.data;
  },

  getAll: async (blogId: string) => {
    const res = await api.get<PaginatedResponse<Comment[]>>(
      `/blog/${blogId}/comments`
    );

    return res.data;
  },

  delete: async (blogId: string, commentId: string) => {
    const res = await api.delete(`/blog/${blogId}/comments/${commentId}`);

    return res.data;
  },
};

export default commentService;
