"use client";

import Link from "next/link";
import styles from "./Header.module.css";

interface HeaderProps {
  adCode728x90?: string;
}

export default function Header({ adCode728x90 }: HeaderProps) {
  return (
    <header className={styles.headerWrapper}>
      {/* ADSTERRA HEADER BANNER SLOT (728x90) */}
      {/* INSTRUCTION: Jab aap ke paas Adsterra ka 728x90 script ho, tab code inject karein */}
      {adCode728x90 && (
        <div className={styles.topAdContainer}>
          <div 
            className={styles.adContent}
            dangerouslySetInnerHTML={{ __html: adCode728x90 }} 
          />
        </div>
      )}

      {/* Main Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.logoContainer}>
          <Link href="/" className={styles.logo}>
            DRA<span>MIX</span>
          </Link>
        </div>

        <ul className={styles.navLinks}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/category/pakistani-drama">Pakistani Drama</Link></li>
          <li><Link href="/category/turkish-drama">Turkish Drama</Link></li>
          <li><Link href="/category/indian-drama">Indian Drama</Link></li>
          <li><Link href="/category/korean-drama">Korean Drama</Link></li>
        </ul>

        <div className={styles.searchBox}>
          <input 
            type="text" 
            placeholder="Search dramas..." 
            className={styles.searchInput}
          />
          <button className={styles.searchBtn}>🔍</button>
        </div>
      </nav>
    </header>
  );
}