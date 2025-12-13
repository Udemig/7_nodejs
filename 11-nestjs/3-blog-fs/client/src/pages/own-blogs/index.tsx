import { Link } from "react-router-dom";
import Error from "../../components/error";
import PageLoader from "../../components/loader/page-loader";
import { useAuth } from "../../context/auth-context";
import { useDeleteBlog, useGetBlogs } from "../../hooks/blog-hooks";
import { FaArrowRight, FaEdit, FaTrash } from "react-icons/fa";

const OwnBlogs = () => {
  const { user } = useAuth();
  const { data, isLoading, error, refetch } = useGetBlogs({ userId: user?.id });
  const { mutate, isPending } = useDeleteBlog();

  const handleDelete = (id: string) => {
    if (!confirm("Silmek istediğinizden emin misiniz")) return;

    mutate(id);
  };

  if (isLoading) return <PageLoader />;

  if (error) return <Error message={error.message} refetch={refetch} />;

  return (
    <div className="padding-x padding-y">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-8 bg-yellow-55 rounded-full" />
        <h1 className="text-2xl md:text-3xl font-bold">Bloglarım</h1>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {data!.data?.length < 1 && (
          <div className="glass-card p-10 text-center">
            <div className="text-5xl mb-4">📝</div>
            <p className="text-grey-50 text-lg">
              Size ait herhangi bir blog bulunamadı
            </p>
            <Link
              to="/blog/create"
              className="inline-block mt-4 text-yellow-55 hover:text-yellow-60 font-medium transition-colors"
            >
              İlk blogunuzu oluşturun →
            </Link>
          </div>
        )}

        {data!.data?.length > 0 &&
          data?.data.map((blog) => (
            <div
              key={blog.id}
              className="glass-card p-5 md:p-6 hover:border-yellow-55/20 transition-all duration-300 group"
            >
              <h2 className="font-semibold text-lg md:text-xl mb-3 group-hover:text-yellow-55 transition-colors">
                {blog.title}
              </h2>

              <p className="text-grey-50 leading-relaxed">
                {blog.content.slice(0, 100) + "..."}
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link to={`/blog/${blog.id}`} className="blog-button">
                  Blog'a Git
                  <FaArrowRight className="size-3 text-yellow-55" />
                </Link>

                <Link to={`/blog/${blog.id}/edit`} className="blog-button">
                  Düzenle
                  <FaEdit className="size-3 text-yellow-55" />
                </Link>

                <button
                  disabled={isPending}
                  onClick={() => handleDelete(blog.id)}
                  className="blog-button hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-500!"
                >
                  Sil
                  <FaTrash className="size-3 text-red-500" />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OwnBlogs;
