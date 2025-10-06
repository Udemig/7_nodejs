import { House, Ticket, Plus, Users, Mail, ChartArea } from "lucide-react";

export const navigationItems = [
  {
    label: "Dashboard",
    href: "/",
    icon: House,
  },
  {
    label: "Tickets",
    href: "/tickets",
    icon: Ticket,
  },
  {
    label: "Yeni Ticket",
    href: "/ticket/add",
    icon: Plus,
  },
  {
    label: "Takımlar",
    href: "#",
    icon: Users,
  },
  {
    label: "Gelen Kutusu",
    href: "#",
    icon: Mail,
  },
  {
    label: "İstatisstikler",
    href: "#",
    icon: ChartArea,
  },
];

export const STATUS_COLORS = {
  Beklemede: "bg-yellow-500 ",
  "Devam Ediyor": "bg-blue-500",
  Çözüldü: "bg-green-500",
};

export const DATE_FORMATS = {
  long: {
    day: "2-digit",
    month: "long",
    year: "numeric",
  },
  short: {
    day: "2-digit",
    month: "short",
    year: "numeric",
  },
} as const;

export const TICKET_CATEGORIES = ["Yazılım Sorunu", "Donanım Sorunu", "Bağlantı Sorunu"];

export const TICKET_STATUSES = ["Devam Ediyor", "Beklemede", "Çözüldü"];

export const TICKET_PRIORITIES = [1, 2, 3, 4, 5] as const;

export enum PRIORITY_LABELS {
  "Çok Düşük" = 1,
  "Düşük",
  "Orta",
  "Yüksek",
  "Kritik",
}
