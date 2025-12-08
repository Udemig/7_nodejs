import type { FC } from "react";
import Button from "../../components/button";

const Ad: FC = () => {
  return (
    <div className="py-10 lg:py-15 xl:py-25 padding-x bg-linear-to-r from-dark-15 via-dark-20 to-dark-15 flex flex-col md:flex-row justify-between md:items-center gap-6 border-y border-white/5 relative overflow-hidden">
      {/* efekt */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(245,158,11,0.05),transparent_50%)]" />

      <div className="flex flex-col gap-4 relative z-10">
        <span className="bg-yellow-55/10 text-yellow-55 px-4 py-2 w-fit rounded-full text-sm font-medium border border-yellow-55/20">
          ✨ Bilgi Hazinesi
        </span>

        <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold">
          FutureTech'in Detaylı Blog Yazılarını Keşfedin
        </h1>
      </div>

      <Button
        text="Blogları Görüntüle"
        designs="max-md:w-full max-md:justify-center relative z-10"
      />
    </div>
  );
};

export default Ad;
