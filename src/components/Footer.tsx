"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      console.log("Subscribed email:", email);
      alert(`Subscribed successfully: ${email}`);
      setEmail("");
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Section 1: Brand Info */}
        <div className={styles.brandCol}>
          <Link href="/" className={styles.logo}>
            DRAMIX
          </Link>
          <p className={styles.description}>
            Watch your favorite drama series, latest episodes, and upcoming trailers in full HD.
          </p>
        </div>

        {/* Section 2: Quick Links */}
        <div className={styles.linksCol}>
          <h4 className={styles.colTitle}>Quick Links</h4>
          <ul className={styles.linksList}>
            <li className={styles.linkItem}>
              <Link href="/">Home</Link>
            </li>
            <li className={styles.linkItem}>
              <Link href="/trending">Trending</Link>
            </li>
            <li className={styles.linkItem}>
              <Link href="/series">Series</Link>
            </li>
            <li className={styles.linkItem}>
              <Link href="/upcoming">Upcoming</Link>
            </li>
            <li className={styles.linkItem}>
              <Link href="/top-rated">Top Rated</Link>
            </li>
          </ul>
        </div>

        {/* Section 3: Legal & Help */}
        <div className={styles.linksCol}>
          <h4 className={styles.colTitle}>Legal & Help</h4>
          <ul className={styles.linksList}>
            <li className={styles.linkItem}>
              <Link href="/privacy">Privacy Policy</Link>
            </li>
            <li className={styles.linkItem}>
              <Link href="/terms">Terms of Service</Link>
            </li>
            <li className={styles.linkItem}>
              <Link href="/dmca">DMCA Disclaimer</Link>
            </li>
            <li className={styles.linkItem}>
              <Link href="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Section 4: Social & Newsletter */}
        <div className={styles.newsletterCol}>
          <h4 className={styles.colTitle}>Stay Connected</h4>
          
          {/* Social Icons */}
          <div className={styles.socials}>
            {/* Twitter / X */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="Twitter"
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="Instagram"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="YouTube"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
              </svg>
            </a>
          </div>

          {/* Subscription Form */}
          <form onSubmit={handleSubscribe} className={styles.form}>
            <input
              type="email"
              placeholder="Enter your email..."
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
            <button type="submit" className={styles.button}>
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className={styles.bottomBar}>
        <span className={styles.copyright}>
          &copy; 2026 DRAMIX. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
