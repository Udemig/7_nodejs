import Link from "next/link";

// Oluşturulan @slot sayfaları layout'a prop olarak gelir
const Layout = ({ children, users, revenue, notifications }) => {
  return (
    <div className="p-5 mt-20">
      <div className="mb-10 space-x-5 text-blue-500">
        <Link href="/dashboard">Admin Paneli</Link>
        <Link href="/dashboard/settings">Panel Ayarları</Link>
      </div>

      <div>
        {children}

        <div className="flex mt-10">
          <div className="flex-1">
            <div className="border p-5">{users}</div>
            <div className="border p-5">{revenue}</div>
          </div>

          <div className="border p-5">{notifications}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
