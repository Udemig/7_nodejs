import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { BlogFormValues, GetAllParams } from "../types";
import blogService from "../services/blog-service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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

const useCreateBlog = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: BlogFormValues) => blogService.create(data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Blog başarıyla oluşturuldu");
      navigate(`/blog/${res.data.id}`);
    },
    onError: () => toast.error("Blog oluşturulamadı"),
  });
};

const useUpdateBlog = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: BlogFormValues }) =>
      blogService.update(id, data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Blog başarıyla güncellendi");
      navigate(`/blog/${res.data.id}`);
    },
    onError: () => toast.error("Blog güncellenemedi"),
  });
};

export { useGetBlogs, useGetBlog, useDeleteBlog, useCreateBlog, useUpdateBlog };
