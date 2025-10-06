import connectMongo from "@/utils/connect-mongo";
import { NextResponse as res } from "next/server";
import Ticket from "../../models/ticket";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(req: Request, { params }: Params) {
  try {
    // veritbanına bağlan
    await connectMongo();

    // id parametresine eriş
    const { id } = await params;

    // id'si bilinen elemanı al
    const ticket = await Ticket.findById(id);

    // client'a cevap döndür
    return res.json({ message: "Ticket bulundu", ticket });
  } catch (error) {
    return res.json(
      {
        message: "Ticket aranırken bir hata oluştu",
        error: error instanceof Error ? error.message : "Bilinmeyen hata!",
      },
      { status: 400 }
    );
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    // veritabanına bağlan
    await connectMongo();

    // id parametresine eriş
    const { id } = await params;

    // id'si bilenen elemanı kaldır
    await Ticket.findByIdAndDelete(id);

    // client'a cevap gönder
    return res.json({ message: "Ticket silindi" });
  } catch (error) {
    return res.json(
      {
        message: "Ticket aranırken bir hata oluştu",
        error: error instanceof Error ? error.message : "Bilinmeyen hata!",
      },
      { status: 400 }
    );
  }
}

export async function PUT(req: Request, { params }: Params) {
  try {
    // veritabanına bağlan
    await connectMongo();

    // id parametresine eriş
    const { id } = await params;

    // body verisine eriş
    const body = await req.json();

    // ticket'ı güncelle
    const updatedTicket = await Ticket.findByIdAndUpdate(id, body, { new: true });

    // client'a cevap gönder
    return res.json({ message: "Ticket güncellendi", ticket: updatedTicket });
  } catch (error) {
    return res.json(
      {
        message: "Ticket aranırken bir hata oluştu",
        error: error instanceof Error ? error.message : "Bilinmeyen hata!",
      },
      { status: 400 }
    );
  }
}
