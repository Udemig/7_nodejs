import { FC } from "react";
import Statistics from "./statistics";
import { Bell, Mail, Search, Settings, User } from "lucide-react";

const Header: FC = () => {
  return (
    <>
      <header className="h-21 bg-zinc-900 border-b border-zinc-800 px-6 py-[18px]">
        <div className="flex items-center justify-between gap-4">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
              <input
                className="w-full pl-10 pr-4 py-2 borderzinc-700 rounded-lg bg-zinc-800 text-gray-100 placeholder-gray-500"
                placeholder="Ticket ara..."
              />
            </div>
          </div>

          {/* Iconlar */}
          <div className="flex items-center gap-2 md:gap-4">
            <button className="icon">
              <Bell className="size-5" />
              <span className="icon-info">3</span>
            </button>
            <button className="icon">
              <Mail className="size-5" />
              <span className="icon-info">3</span>
            </button>
            <button className="icon">
              <Settings className="size-5" />
            </button>

            {/* Profil */}
            <div className="relative">
              <button className="flex items-center gap-2 p-2 hover:bg-zinc-800 rounded-lh transition">
                <div className="size-8 bg-blue-600 rounded-full grid place-items-center">
                  <User className="size-4" />
                </div>

                <div className="max-md:hidden text-left">
                  <p className="text-sm text-gray-100">Kullanıcı</p>
                  <p className="text-xs text-gray-400">Admin</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      <Statistics />
    </>
  );
};

export default Header;
