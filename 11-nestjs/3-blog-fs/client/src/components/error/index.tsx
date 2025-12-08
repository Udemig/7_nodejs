import type { FC } from "react";

interface Props {
  message: string;
  refetch?: () => void;
}

const Error: FC<Props> = ({ message, refetch }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full py-20 px-4">
      <div className="glass-card p-8 max-w-md">
        <h1 className="text-4xl mb-4">😔</h1>
        <h1 className="text-xl font-semibold mb-2">Üzgünüz bir sorun oluştu</h1>
        <p className="text-red-400 bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/20">
          {message}
        </p>
      </div>

      {refetch && (
        <button
          onClick={refetch}
          className="mt-5 glass-card px-4 py-2 cursor-pointer hover:brightness-90"
        >
          Tekrar Dene
        </button>
      )}
    </div>
  );
};

export default Error;
