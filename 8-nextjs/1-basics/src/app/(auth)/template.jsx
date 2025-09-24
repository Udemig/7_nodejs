"use client";
import Link from "next/link";
import { useState } from "react";

// Auth route grubunun içerisinde oluşturduğumuz için sadece login ve signup sayfalarına etki eder
const Layout = ({ children }) => {
  const [name, setName] = useState("");

  return (
    <div className="flex gap-20">
      <aside className="border p-5 px-10 rounded-md flex flex-col text-2xl gap-5 mt-50">
        <h1>Selam, {name}</h1>
        <input type="text" className="border rounded-md" onChange={(e) => setName(e.target.value)} />

        <Link href="/login">Login</Link>
        <Link href="/signup">Signup</Link>
      </aside>

      <div>{children}</div>
    </div>
  );
};

export default Layout;
