import type { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="text-center text-sm md:text-base text-grey-50 py-4 md:py-6 border-t border-white/5 bg-linear-to-t from-dark-15/50 to-transparent">
      <p className="flex items-center justify-center gap-2">
        &copy; {new Date().getFullYear()} Tüm Hakları Saklıdır.
      </p>
    </footer>
  );
};

export default Footer;
