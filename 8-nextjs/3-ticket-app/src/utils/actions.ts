"use server";

import Ticket from "@/app/api/models/ticket";
import connectMongo from "./connect-mongo";
import { redirect } from "next/navigation";

// server action içerisinde olduğumuz için doğrudan vt sorguları bile yapabiliyoruz
export async function createTicketAction(formData: FormData) {
  // formdata içerisinden gerekli bilgileri al
  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    priority: formData.get("priority"),
    progress: formData.get("progress"),
    status: formData.get("status"),
  };

  // api isteği at (opsiyonel)

  // veritbanına bağlan
  await connectMongo();

  // yeni ticket oluştur
  await Ticket.create(rawData);

  // tickets sayfasına yönlendir
  redirect("/tickets");
}

export async function updateTicketAction(formData: FormData) {
  // güncellenicek elemanın id'si
  const id = formData.get("id");

  // formdata içerisinden gerekli bilgileri al
  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    priority: formData.get("priority"),
    progress: formData.get("progress"),
    status: formData.get("status"),
  };

  // veritabanına bağlan
  await connectMongo();

  // ticket'ı vt'nında güncelle
  await Ticket.findByIdAndUpdate(id, rawData);

  // tickets sayfasına yönlendir
  redirect("/tickets");
}
