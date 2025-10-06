import connectMongo from "@/utils/connect-mongo";
import { NextResponse as res } from "next/server";
import Ticket from "../models/ticket";

export async function GET() {
  try {
    // veritabanına bağlan
    await connectMongo();

    // veritabanından ticket'ları al
    const tickets = await Ticket.find();

    // toplam ticket sayısı
    const totalTickets = tickets.length;

    // kategoriye göre dağılım
    const ticketsByCategory = tickets.reduce((obj, ticket) => {
      obj[ticket.category] = (obj[ticket.category] || 0) + 1;

      return obj;
    }, {});

    // kategoriye göre dağılım
    const ticketsByStatus = tickets.reduce((obj, ticket) => {
      obj[ticket.status] = (obj[ticket.status] || 0) + 1;

      return obj;
    }, {});

    // çözüm oranı
    const completedTickets = tickets.filter((ticket) => ticket.status === "Çözüldü").length;
    const completionRate = +(totalTickets > 0 ? ((completedTickets / totalTickets) * 100).toFixed(1) : 0);

    // kritik öncelikli ticket'ları al
    const criticalTickets = tickets.filter((ticket) => ticket.priority > 4).length;

    // ortalama öncelik değerini hesapla
    const averagePriority = +(tickets.reduce((total, ticket) => total + ticket.priority, 0) / totalTickets).toFixed(1);

    // tarihleri hesapla
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const thisYear = new Date(now.getFullYear(), 0, 1);

    // tarihe göre hesapla
    const ticketsCreatedToday = tickets.filter((ticket) => new Date(ticket.createdAt) >= today).length;
    const ticketsCreatedLast7Days = tickets.filter((ticket) => new Date(ticket.createdAt) >= thisWeek).length;
    const ticketsCreatedThisMonth = tickets.filter((ticket) => new Date(ticket.createdAt) >= thisMonth).length;
    const ticketsCreatedThisYear = tickets.filter((ticket) => new Date(ticket.createdAt) >= thisYear).length;

    // client'a cevap gönder
    return res.json({
      message: "İstatistikler hesaplandı",
      totalTickets,
      ticketsByCategory,
      ticketsByStatus,
      completionRate,
      criticalTickets,
      averagePriority,
      now,
      today,
      ticketsCreatedToday,
      ticketsCreatedLast7Days,
      ticketsCreatedThisMonth,
      ticketsCreatedThisYear,
    });
  } catch (error) {
    return res.json({ message: "İstatiskler hesaplanırken bir hata oluştu" }, { status: 500 });
  }
}
