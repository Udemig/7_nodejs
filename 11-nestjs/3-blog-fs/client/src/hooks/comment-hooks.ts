import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import commentService from "../services/comment-service";
import { toast } from "react-toastify";

const useGetComments = (blogId: string) => {
  return useQuery({
    enabled: !!blogId, // blogId varsa sorgu çalışsın
    queryKey: ["comments", blogId],
    queryFn: () => commentService.getAll(blogId),
  });
};

const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ blogId, content }: { blogId: string; content: string }) =>
      commentService.create(blogId, content),

    // istek başarılı olursa yorumları alan sorguyu yeniden çalıştır
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["comments"] }),

    onError: () => toast.error("Yorum oluşturulamadı"),
  });
};

const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      blogId,
      commentId,
    }: {
      blogId: string;
      commentId: string;
    }) => commentService.delete(blogId, commentId),

    // yorum silinince yorumları alan sorguyu yeniden çalıştır
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["comments"] }),

    onError: () => toast.error("Yorum silinemedi"),
  });
};

export { useCreateComment, useGetComments, useDeleteComment };
