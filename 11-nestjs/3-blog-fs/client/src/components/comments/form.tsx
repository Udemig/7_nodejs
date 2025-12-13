import React, { type FC } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { useAuth } from "../../context/auth-context";
import { toast } from "react-toastify";
import { useCreateComment } from "../../hooks/comment-hooks";
import { useParams } from "react-router-dom";

const Form: FC = () => {
  const { mutate, isPending } = useCreateComment();
  const { user } = useAuth();
  const { id } = useParams();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const text = e.currentTarget.text.value.trim();

    if (!text) return toast.warning("Yorum boş bırakılamaz");

    mutate({ blogId: id!, content: text });

    e.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3">
      <input
        disabled={!user}
        type="text"
        name="text"
        placeholder={
          user
            ? "Yorumunuzu giriniz..."
            : "Yorum yapabilmek için giriş yapmalısınız"
        }
        className="flex-1 bg-white/5 border border-white/10 rounded-xl py-3 px-5 focus:border-yellow-55/50 focus:ring-2 focus:ring-yellow-55/20 outline-none disabled:bg-white/2 disabled:cursor-not-allowed transition-all placeholder:text-grey-50"
      />

      <button
        type="submit"
        disabled={!user || isPending}
        className="bg-linear-to-r from-yellow-55 to-yellow-60 text-black font-medium px-5 py-3 rounded-xl cursor-pointer hover:shadow-lg hover:shadow-yellow-55/30 hover:scale-105 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none flex items-center gap-2"
      >
        <span className="hidden sm:inline">Gönder</span>
        <FaPaperPlane className="text-sm" />
      </button>
    </form>
  );
};

export default Form;
