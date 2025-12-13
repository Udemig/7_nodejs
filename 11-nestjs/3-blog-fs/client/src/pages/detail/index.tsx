import type { FC } from "react";
import { useParams } from "react-router-dom";
import { useGetBlog } from "../../hooks/blog-hooks";
import PageLoader from "../../components/loader/page-loader";
import Error from "../../components/error";
import ReactMarkdown from "react-markdown";
import { FaCalendar } from "react-icons/fa";
import Comments from "../../components/comments";

const Detail: FC = () => {
  const { id } = useParams();
  const { isLoading, error, data, refetch } = useGetBlog(id);

  if (isLoading) return <PageLoader />;

  if (error) return <Error message={error.message} refetch={refetch} />;

  if (!data) return;

  return (
    <div>
      <div className="h-[30vh] md:h-[45vh] bg-[url('/banner.png')] bg-cover bg-center flex items-end justify-center pb-10 relative">
        <div className="absolute inset-0 bg-linear-to-t from-dark-08 via-dark-08/50 to-transparent" />

        <h1 className="text-3xl md:text-5xl text-center font-bold relative z-10 px-4 animate-fade-in-up">
          {data.title}
        </h1>
      </div>

      <div className="flex flex-col-reverse md:grid md:grid-cols-[3fr_1fr] border-b border-white/5 padding-x">
        <div className="prose prose-invert animate-fade-in-up">
          <ReactMarkdown>{data.content}</ReactMarkdown>
        </div>

        <div className="border-l border-white/5 bg-white/2">
          <div className="flex flex-col gap-2 border-b border-white/5 px-4 md:px-6 py-5">
            <span className="text-sm text-grey-50 flex items-center gap-2">
              <FaCalendar className="text-yellow-55" />
              Tarih
            </span>
            <span className="font-medium">
              {new Date(data.createdAt).toLocaleDateString("tr", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="flex flex-wrap md:flex-col gap-3 px-4 md:px-6 py-5">
            <span className="text-sm text-grey-50 w-full">Etiketler</span>
            {data.tags.map((tag, key) => (
              <div
                key={key}
                className="bg-yellow-55/10 border border-yellow-55/20 text-yellow-55 rounded-full text-center px-4 py-1.5 text-sm font-medium"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Comments />
    </div>
  );
};

export default Detail;
