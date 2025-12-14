import { useEffect, useState, type FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { mdeOptions } from "../../constants";
import Select from "react-select/creatable";
import {
  useCreateBlog,
  useGetBlog,
  useUpdateBlog,
} from "../../hooks/blog-hooks";
import PageLoader from "../../components/loader/page-loader";

const BlogForm = () => {
  const { mutate: createMutate, isPending: createPending } = useCreateBlog();
  const { mutate: updateMutate, isPending: updatePending } = useUpdateBlog();

  // form state'leri
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  // güncellenicek olan blog'un bilgilerini al
  const { id } = useParams();
  const { data: blogData, isLoading: blogLoading } = useGetBlog(id);

  // state'Lerin ilk değerlerini ayarla
  useEffect(() => {
    setTitle(blogData?.title || "");
    setContent(blogData?.content || "");
    setTags(blogData?.tags || []);
  }, [blogData]);

  // form gönderilince
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (id) {
      // düzenle
      updateMutate({ id, data: { title, content, tags } });
    } else {
      // oluştur
      createMutate({ title, content, tags });
    }
  };

  if (blogLoading) return <PageLoader />;

  return (
    <div className="max-w-3xl mx-auto padding-x py-10">
      <h1 className="text-3xl font-bold text-zinc-400 mb-8">
        {id ? "Blog Düzenle" : "Blog Oluştur"}
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="group">
          <label htmlFor="title" className="label">
            Başlık
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="input"
            placeholder="Başlık giriniz..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="group">
          <label htmlFor="content" className="label">
            İçerik
          </label>

          <SimpleMDE
            id="content"
            className="prose"
            options={mdeOptions}
            value={content}
            onChange={(value) => setContent(value)}
          />
        </div>

        <div className="group">
          <label htmlFor="tags" className="label">
            Etiketler
          </label>

          <Select
            isMulti
            options={[]}
            inputId="tags"
            className="text-black"
            placeholder="Etiketleri seçiniz..."
            value={tags.map((tag) => ({ value: tag, label: tag }))}
            onChange={(tags) => setTags(tags!.map((tag) => tag.value))}
          />
        </div>

        <div className="flex justify-end mt-5 gap-5">
          <Link
            to={-1 as any}
            className="bg-zinc-700 text-white px-4 py-2 rounded-md hover:bg-zinc-600 transition cursor-pointer"
          >
            Geri
          </Link>

          <button
            disabled={updatePending || createPending}
            type="submit"
            className="bg-yellow-55 text-black px-4 py-2 rounded-md hover:bg-yellow-60 transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            {id ? "Güncelle" : "Oluştur"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
