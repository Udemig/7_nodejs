import { Edu_AU_VIC_WA_NT_Arrows } from "next/font/google";
import { notFound } from "next/navigation";

// statik metadata
// export const metadata = {
//   title: "Ürün Detay",
// };

// dinamik metadata tanımı
// dinamik sayfaların metadatasını dinamik bir şekilde tanımlamak için kullanırız
export const generateMetadata = async ({ params }) => {
  const { productId } = await params;

  // api isteği atılıp ürün bilgileri alınabilir

  return {
    title: `${productId} - Ürün Detay `,
  };
};

// component
const Detail = async ({ params }) => {
  const { productId } = await params;

  if (productId > 5) {
    // 404 sayfasını ekrana basar
    notFound();
  }

  return (
    <div className="page">
      <h1>Detay Sayfası</h1>
      <h2>Ürün ID: {productId}</h2>
    </div>
  );
};

export default Detail;
