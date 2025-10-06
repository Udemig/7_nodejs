import { MessageResponse, StatisticsResponse, TicketResponse, TicketsResponse } from "@/types";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const wait = async (ms = 2000) => {
  return await new Promise((resolve) => setTimeout(resolve, ms));
};

export const getTickets = async (): TicketsResponse => {
  const res = await fetch(`${APP_URL}/api/tickets`);

  return res.json();
};

export const deleteTicket = async (id: string): MessageResponse => {
  const res = await fetch(`${APP_URL}/api/tickets/${id}`, { method: "DELETE" });

  return res.json();
};

export const getTicket = async (id: string): TicketResponse => {
  const res = await fetch(`${APP_URL}/api/tickets/${id}`);

  return res.json();
};

export const getStatistics = async (): StatisticsResponse => {
  const res = await fetch(`${APP_URL}/api/statistics`);

  return res.json();
};
