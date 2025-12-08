import api from "./axios";
import type {
  PaginatedResponse,
  Blog,
  GetAllParams,
  Response,
  DetailedAuthor,
} from "../types";

const blogService = {
  getAll: async (params?: GetAllParams) => {
    const res = await api.get<PaginatedResponse<Blog[]>>("/blogs", { params });

    return res.data;
  },

  getOne: async (id: string) => {
    const res = await api.get<Response<Blog<DetailedAuthor>[]>>(`/blogs/${id}`);

    return res.data;
  },

  create: async () => {},

  update: async () => {},

  delete: async () => {},
};

export default blogService;
