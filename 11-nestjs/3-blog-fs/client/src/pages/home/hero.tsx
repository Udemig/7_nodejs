import type { FC } from "react";
import { FaPlus } from "react-icons/fa";
import Button from "../../components/button";

interface Props {
  title: string;
  count: number | string;
}

const HeroItem: FC<Props> = ({ title, count }) => {
  return (
    <div className="p-4 hover:bg-white/5 transition-colors group">
      <span className="flex items-center gap-1 text-xl md:text-2xl xl:text-3xl font-semibold">
        {count}{" "}
        <FaPlus className="text-yellow-55 scale-[0.7] group-hover:rotate-90 transition-transform" />
      </span>

      <span className="small-text">{title}</span>
    </div>
  );
};

const Hero: FC = () => {
  return (
    <div className="grid lg:grid-cols-7">
      <div className="lg:col-span-4 borde border-white/5 bg-linear-to-br from-dark-15/50 to-transparent">
        <div className="px-4 md:px-8 lg:px-12 xl:ps-18 pt-10 pb-8 md:py-16 xl:pt-20 animate-fade-in-up">
          <h4 className="text-grey-50 text-lg md:text-xl lg:text-2xl 2xl:text-3xl font-light tracking-wide">
            Yarına Yolculuğunuz Burada Başlıyor
          </h4>

          <h1 className="text-2xl md:text-3xl lg:text-4xl 2xl:text-6xl mt-3 mb-4 font-bold bg-linear-to-r from-white via-grey-90 to-grey-70 bg-clip-text text-transparent">
            Yapay Zekanın Sınırlarını Keşfedin
          </h1>

          <p className="small-text leading-relaxed">
            Yapay zeka inovasyonunun merkezine hoş geldiniz. FutureTech AI News,
            makinelerin düşündüğü, öğrendiği ve geleceği yeniden şekillendirdiği
            bir dünyaya açılan kapınız.
          </p>
        </div>

        <div className="grid grid-cols-3 border-t border-white/5">
          <HeroItem title="Kaynak Mevcut" count={300} />
          <HeroItem title="İndirme" count={"12k"} />
          <HeroItem title="Aktif Kullanıcı" count={"10k"} />
        </div>
      </div>

      <div className="lg:col-span-3 border border-white/5 relative overflow-hidden h-full max-lg:min-[300px] flex items-end p-5 md:p-8 lg:p-12 bg-linear-to-t from-dark-08 via-transparent to-transparent">
        <div className="absolute top-0 left-0">
          <img
            src="/sun.png"
            alt="sun"
            className="rotate-30 scale-[1.2] brightness-50 opacity-80"
          />
        </div>

        <div className="absolute inset-0 bg-linear-to-t from-dark-08 via-dark-08/50 to-transparent z-5"></div>

        <div className="z-10 animate-fade-in-up">
          <h2 className="md:text-xl xl:text-2xl font-semibold">
            1000+ Kaynağı Keşfedin
          </h2>

          <p className="small-text my-4 leading-relaxed">
            Gelişen teknoloji trendleri ve atılımlar hakkında 1000'den fazla
            makale.
          </p>

          <Button text="Kaynakları Keşfet" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
