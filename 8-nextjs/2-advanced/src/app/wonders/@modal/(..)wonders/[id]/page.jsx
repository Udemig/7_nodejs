"use client";

import { data } from "@/utils/constants";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

const Modal = () => {
  // url'deki paramatreye eriştik
  const { id } = useParams();
  const wonder = data.find((item) => item.id === id);
  // yönlendirme işlemlerini fonksiyon içerisinde yapmamız sağlar
  const router = useRouter();

  const handleClose = () => {
    // 1 sayfa geriye yönlendir
    router.back();

    // 1 sayfa ileriye yönlendir
    router.forward();

    // belirli bir sayfaya yönlendir
    router.push("/wonders");

    // belirli bir sayfaya yönlendir geçmişi sil
    router.replace("/wonders");

    // sayfayı tekrar rendler
    router.refresh();
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-black/50 grid place-items-center backdrop-blur-xs">
      <div className="bg-white px-10 pb-10 text-black rounded-md">
        <div className="flex justify-between my-5 text-lg">
          <button onClick={handleClose} className="btn">
            X
          </button>
          <button onClick={handleRefresh} className="btn">
            ?
          </button>
        </div>

        <Image
          src={wonder.src}
          alt={wonder.name}
          className="max-h-[300px] aspect-square w-full rounded-md object-cover"
        />

        <h1 className="text-center my-5 text-3xl">{wonder.name}</h1>

        <div className="my-10">
          <h3 className="text-lg">Fotoğrafçı</h3>
          <span className="text-lg">{wonder.photographer}</span>
        </div>

        <div className="my-10">
          <h3 className="text-lg">Lokasyon</h3>
          <span>{wonder.location}</span>
        </div>
      </div>
    </div>
  );
};

export default Modal;
