import type { FC } from "react";

interface Props {
  tag: string;
}

const Tag: FC<Props> = ({ tag }) => {
  return (
    <div
      className={`${
        tag === "Hepsi"
          ? "bg-yellow-55/10 text-yellow-55 border-yellow-55/50"
          : "bg-white/5 border-white/10 text-grey-60 hover:bg-white/10 hover:text-white hover:border-white/20"
      } flex-1 text-center capitalize border p-[10px] lg:p-[18px] 2xl:p-[30px] rounded-xl cursor-pointer min-w-[120px] small-text transition-all duration-200 whitespace-nowrap line-clamp-1`}
    >
      {tag}
    </div>
  );
};

export default Tag;
