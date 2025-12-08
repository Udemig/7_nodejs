import type { FC } from "react";
import { useBlogs } from "../../hooks/blog-hooks";
import BasicLoader from "../../components/loader/basic-loader";
import Error from "../../components/error";
import Tag from "./tag";
import Post from "./post";

const List: FC = () => {
  const { isLoading, error, data, refetch } = useBlogs();

  if (isLoading) return <BasicLoader />;

  if (error) return <Error message={error.message} refetch={refetch} />;

  const tags = [
    "Hepsi",
    ...new Set(data?.data.map((blog) => blog.tags).flat()),
  ];

  return (
    <>
      <div className="flex gap-3 border-y border-white/5 py-10 padding-x overflow-x-auto bg-linear-to-b from-dark-15/30 to-transparent custom-scrollbar">
        {tags.map((tag, key) => (
          <Tag tag={tag} key={key} />
        ))}
      </div>

      <div className="min-h-[50vh] py-5 lg:py-10 xl:py-15">
        {data?.data.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📰</div>
            <p className="text-grey-50 text-lg">Henüz blog yazısı bulunmuyor</p>
          </div>
        ) : (
          data?.data.map((blog, index) => (
            <div
              key={blog.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Post blog={blog} />
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default List;
