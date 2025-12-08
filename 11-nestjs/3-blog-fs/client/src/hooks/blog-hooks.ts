import { useQuery } from "@tanstack/react-query";
import type { GetAllParams } from "../types";
import blogService from "../services/blog-service";

const useBlogs = (params?: GetAllParams) =>
  useQuery({
    queryKey: ["blogs", params],
    queryFn: () => blogService.getAll(params),
  });

const useBlog = (id: string) =>
  useQuery({
    queryKey: ["blog", id],
    queryFn: () => blogService.getOne(id),
  });

export { useBlogs, useBlog };
