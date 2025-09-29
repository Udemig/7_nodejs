import { NextResponse } from "next/server";

export const GET = async (req) => {
  // istek ile gelen arama parametrelerine erişme
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  // client'a cevap gönder
  return NextResponse.json({
    message: "Ürün Listesi!",
    category,
  });
};

export const POST = async (req) => {
  // isteğin body kısmında gelen veriye eriş
  const body = await req.json();

  // client'a cevap gönder
  return NextResponse.json(
    {
      message: "Ürün Oluşturuldu!",
      body,
    },
    { status: 201 }
  );
};
