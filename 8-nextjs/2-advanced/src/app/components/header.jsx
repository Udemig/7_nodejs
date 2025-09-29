import Link from "next/link";
import { fetchRecipes } from "../../utils/api";
import NavLink from "./nav-link";

const Header = async () => {
  const data = await fetchRecipes();

  return (
    <header className="border-b pb-5 mb-5 flex justify-between">
      <Link href="/">Next</Link>

      <nav className="flex gap-5">
        <NavLink href="/recipes-server">
          Tarifler ({data.recipes.length})
        </NavLink>
        <NavLink href="/wonders">7-Harika</NavLink>
        <NavLink href="/about">Hakkımızda</NavLink>
      </nav>
    </header>
  );
};

export default Header;
