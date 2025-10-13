import { CheckoutBody } from "@/types/car";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // isteğin body bölümündeki veriye eriş
    const body: CheckoutBody = await req.json();

    // clienta cevap gönder
    return NextResponse.json(
      { message: "Ödeme Alındı", body },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Bir hata oluştu", error },
      { status: 500 }
    );
  }
}
