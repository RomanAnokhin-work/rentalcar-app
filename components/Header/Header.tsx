"use client"
import Link from "next/link";
import css from "./Header.module.css";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  return (
    <header className={css.header}>
      <Link className={css.logo_link} href="/" aria-label="Home">
         <svg className={css.logo_icon} width={102} height={16} >
              <use href="/logo.svg" />
            </svg>
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li className={css.navigation_item}>
            <Link  href="/" className={pathname === "/" ? css.active : ""}>Home</Link>
          </li>
          <li className={css.navigation_item}>
            <Link href="/catalog" className={pathname.startsWith("/catalog") ? css.active : ""}>Catalog</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}