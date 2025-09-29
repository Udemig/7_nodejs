import { NextResponse } from "next/server";

export const GET = async () => {
  // client'a cevap gönder
  return NextResponse.json({
    message: "Kullanıcı Listesi!",
  });
};
