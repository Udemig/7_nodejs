import Link from "next/link";

const NotFound = () => {
  return (
    <div className="page">
      <h1 className="text-yellow-500">404</h1>

      <h1>Aradığınız Sayfa Bulunamadı</h1>

      <Link href="/" className="text-blue-500">
        Anasayfa
      </Link>
    </div>
  );
};

export default NotFound;
