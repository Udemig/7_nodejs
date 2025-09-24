import Link from "next/link";

const Page = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-20">Bileşen - 2</h1>

      <Link href="/comp1" className="text-blue-500 underline">
        Bileşen - 1'e Dön
      </Link>
    </div>
  );
};

export default Page;
