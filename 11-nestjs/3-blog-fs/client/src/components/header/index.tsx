import type { FC } from "react";
import { IoMdArrowRoundUp as Arrow } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../context/auth-context";

const Header: FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="z-50">
      {/* Üst Yazı */}
      <div className="bg-linear-to-r from-dark-08 via-dark-15 to-dark-08 text-sm md:text-base px-4 py-2.5 md:px-6 md:py-3 flex justify-center gap-2 border-b border-white/5">
        <span className="text-grey-60">
          Yeni ve güncel blog yazıları için bültenimize abone olun
        </span>
        <Arrow className="text-yellow-55 rotate-45 animate-bounce" />
      </div>

      {/* İçerik */}
      <div className="bg-dark-10/80 backdrop-blur-xl w-full padding-x py-4 flex justify-between items-center border-b border-white/5 sticky top-0 z-50">
        {/* Logo */}
        <Link to="/">
          <img
            src="/logo.png"
            alt="logo"
            className="w-[100px] lg:w-[140px] 2xl:w-[180px hover:opacity-80 transition-opacity"
          />
        </Link>

        {/* Navbar */}
        <nav className="flex items-center gap-1 md:gap-2 text-sm md:text-base">
          <NavLink to="/" className="nav-link">
            Anasayfa
          </NavLink>
          <NavLink to="/own-blogs" className="nav-link">
            Bloglarım
          </NavLink>
          <NavLink to="/about" className="nav-link max-md:hidden">
            Hakkımızda
          </NavLink>
          <NavLink to="/contact" className="nav-link max-md:hidden">
            İletişim
          </NavLink>
        </nav>

        {/* Kullanıcı */}
        <div>
          {!user ? (
            <Link
              to="/register"
              className="bg-linear-to-r from-yellow-55 to-yellow-60 text-black px-4 py-2 text-sm md:text-base rounded-xl cursor-pointer font-medium shadow-lg shadow-yellow-55/20 hover:shadow-yellow-55/40 hover:scale-105 transition-all duration-300"
            >
              Bize Katıl
            </Link>
          ) : (
            <div className="group relative text-sm md:text-base">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-all">
                <FaUser className="text-yellow-55 texsm" />
                <span>{user?.username}</span>
              </div>

              {/* Dropdown */}
              <div className="z-999999 hidden group-hover:block absolute top-9 -right-2 glass-card bg-dark-10/90 p-2 min-w-40 shadow-2xl text-center">
                <Link to="/blog/create" className="dropdown-item block">
                  Blog Yaz
                </Link>
                <button onClick={logout} className="dropdown-item mt-2">
                  Çıkış Yap
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
