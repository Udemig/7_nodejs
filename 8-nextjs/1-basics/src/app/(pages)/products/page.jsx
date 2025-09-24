import Link from "next/link";

const Products = () => {
  return (
    <div className="page">
      <h1>Ürünler Sayfası</h1>

      <Link href="/products/1">Ürün 1</Link>

      <Link href="/products/2">Ürün 2</Link>

      <Link href="/products/3">Ürün 3</Link>

      <Link href="/products/4">Ürün 4</Link>

      <Link href="/products/5">Ürün 5</Link>
    </div>
  );
};

export default Products;
