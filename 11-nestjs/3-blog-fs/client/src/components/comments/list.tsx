import type { FC } from "react";
import { useDeleteComment, useGetComments } from "../../hooks/comment-hooks";
import { useParams } from "react-router-dom";
import BasicLoader from "../loader/basic-loader";
import Error from "../error";
import { useAuth } from "../../context/auth-context";
import { FaTrash } from "react-icons/fa";

const List: FC = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { data, isLoading, error, refetch } = useGetComments(id!);
  const { mutate, isPending } = useDeleteComment();

  const handleDelete = (commentId: string) => {
    if (!confirm("Silmek istediğinizden emin misiniz?")) return;

    mutate({ blogId: id!, commentId });
  };

  if (isLoading) return <BasicLoader />;

  if (error) return <Error message={error.message} refetch={refetch} />;

  return (
    <div className="mt-10 flex flex-col">
      {data?.data.map((comment) => (
        <div key={comment.id} className="py-5 border-b border-dark-20">
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-2">
              <img
                src="/avatar.jpg"
                alt="avatar"
                className="size-10 rounded-md"
              />

              <div>
                <p className="font-semibold">{comment.user.username}</p>
                <p className="text-sm text-zinc-500">{comment.createdAt}</p>
              </div>
            </div>

            {user?.id === comment.user.id && (
              <button
                disabled={isPending}
                onClick={() => handleDelete(comment.id)}
                className="bg-zinc-800 border border-zinc-700 rounded-md p-2 hover:bg-zinc-600 transition cursor-pointer disabled:cursor-not-allowed disabled:brightness-75"
              >
                <FaTrash />
              </button>
            )}
          </div>

          <p className="mt-3">{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default List;
