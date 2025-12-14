import api from "./axios";
import type {
  PaginatedResponse,
  Blog,
  GetAllParams,
  Response,
  DetailedAuthor,
  BlogFormValues,
} from "../types";

const blogService = {
  getAll: async (params?: GetAllParams) => {
    const res = await api.get<PaginatedResponse<Blog[]>>("/blogs", { params });

    return res.data;
  },

  getOne: async (id: string) => {
    const res = await api.get<Response<Blog<DetailedAuthor>>>(`/blogs/${id}`);

    return res.data;
  },

  create: async (data: BlogFormValues) => {
    const res = await api.post<Response<Blog>>("/blogs", data);

    return res.data;
  },

  update: async (id: string, data: BlogFormValues) => {
    const res = await api.patch<Response<Blog>>(`/blogs/${id}`, data);

    return res.data;
  },

  delete: async (id: string) => {
    const res = await api.delete(`/blogs/${id}`);

    return res.data;
  },
};

export default blogService;
