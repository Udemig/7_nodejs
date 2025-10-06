export interface Ticket {
  id: string;
  title: string;
  description: string;
  category: "Bağlantı Sorunu" | "Donanım Sorunu" | "Yazılım Sorunu" | "Diğer";
  priority: number;
  progress: number;
  status: "Beklemede" | "Devam Ediyor" | "Çözüldü";
  createdAt: string;
  updatedAt: string;
}

export type TicketsResponse = Promise<{
  message: string;
  tickets: Ticket[];
}>;

export type TicketResponse = Promise<{
  message: string;
  ticket: Ticket;
}>;

export type MessageResponse = Promise<{
  message: string;
}>;

export type StatisticsResponse = Promise<{
  message: string;
  totalTickets: number;
  ticketsByCategory: {
    "Bağlantı Sorunu": number;
    "Donanım Sorunu": number;
  };
  ticketsByStatus: {
    Çözüldü: number;
    Beklemede: number;
    "Devam Ediyor": number;
  };
  completionRate: number;
  criticalTickets: number;
  averagePriority: number;
  now: string;
  today: string;
  ticketsCreatedToday: number;
  ticketsCreatedLast7Days: number;
  ticketsCreatedThisMonth: number;
  ticketsCreatedThisYear: number;
}>;
