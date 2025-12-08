import type { FC } from "react";
import type { Blog } from "../../types";
import { Link } from "react-router-dom";

interface Props {
  blog: Blog;
}

const Post: FC<Props> = ({ blog }) => {
  return (
    <Link
      to={`/blog/${blog.id}`}
      className="group flex flex-col gap-5 md:gap-12 md:grid md:grid-cols-[1fr_2fr_1fr] py-6 padding-x border-b border-white/5 hover:bg-white/2 transition-all duration-300"
    >
      <div className="flex gap-3">
        <img
          src="/avatar.jpg"
          alt="avatar"
          className="size-10 rounded-full ring-2 ring-white/10 group-hover:ring-yellow-55/30 transition-all"
        />

        <div className="max-md:flex items-center gap-3">
          <h5 className="font-semibold group-hover:text-yellow-55 transition-colors">
            {blog.author.username}
          </h5>
          <span className="text-sm text-grey-50">{blog.author.email}</span>
          <p className="text-sm text-grey-50">
            {new Date(blog.createdAt).toLocaleDateString("tr", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      <div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl md:text-2xl font-bold group-hover:text-yellow-55 transition-colors">
            {blog.title}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default Post;
