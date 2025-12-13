import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { GetAllParams } from "../types";
import blogService from "../services/blog-service";
import { toast } from "react-toastify";

const useGetBlogs = (params?: GetAllParams) =>
  useQuery({
    queryKey: ["blogs", params],
    queryFn: () => blogService.getAll(params),
  });

const useGetBlog = (id?: string) =>
  useQuery({
    enabled: !!id,
    queryKey: ["blog", id],
    queryFn: () => blogService.getOne(id!),
    select: (data) => data.data,
  });

const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => blogService.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
    onError: () => toast.error("İşlem başarısız"),
  });
};

export { useGetBlogs, useGetBlog, useDeleteBlog };
