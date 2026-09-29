"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme, type Theme } from "../context/ThemeContext";

interface HeaderProps {
  adCode728x90?: string;
}

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/category/pakistani-drama", label: "Pakistani Drama" },
  { href: "/category/turkish-drama", label: "Turkish Drama" },
  { href: "/category/indian-drama", label: "Indian Drama" },
  { href: "/category/korean-drama", label: "Korean Drama" },
];

export default function Header({ adCode728x90 }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { theme, resolvedTheme, setTheme } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close theme dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setThemeDropdownOpen(false);
      }
    }

    if (themeDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [themeDropdownOpen]);

  const themeOptions: Array<{ key: Theme; label: string; icon: React.ReactNode }> = [
    {
      key: "light",
      label: "Light",
      icon: (
        <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
    {
      key: "dark",
      label: "Dark",
      icon: (
        <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      ),
    },
    {
      key: "system",
      label: "System",
      icon: (
        <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/90 dark:bg-[#0a0d14]/90 border-b border-slate-200/80 dark:border-white/5 transition-colors">
      {/* Optional Adsterra Top Banner Slot */}
      {adCode728x90 && (
        <div className="w-full bg-slate-100 dark:bg-black/60 py-2 border-b border-slate-200 dark:border-white/5 flex justify-center items-center">
          <div
            className="max-w-[728px] overflow-hidden text-center"
            dangerouslySetInnerHTML={{ __html: adCode728x90 }}
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="group flex items-center gap-1.5 focus:outline-none">
              <span className="text-2xl sm:text-3xl font-black tracking-wider text-slate-900 dark:text-white transition-colors">
                DRA
                <span className="text-red-600 drop-shadow-[0_0_12px_rgba(229,9,20,0.8)] group-hover:text-red-500 transition-colors">
                  MIX
                </span>
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-widest text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-950/40 border border-red-200 dark:border-red-800/40 px-1.5 py-0.5 rounded">
                HD
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "text-red-600 bg-red-50 dark:text-white dark:bg-white/10 font-semibold shadow-sm"
                        : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Bar: Search Trigger + Theme Switcher + Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <Link
              href="/"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
              title="Search Dramas"
            >
              <svg
                className="w-3.5 h-3.5 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span>Search</span>
            </Link>

            {/* THEME SWITCHER DROPDOWN */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-red-500/50"
                title={`Current theme: ${theme} (${resolvedTheme})`}
                aria-label="Toggle Theme Menu"
              >
                {theme === "light" && (
                  <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                )}
                {theme === "dark" && (
                  <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
                {theme === "system" && (
                  <svg className="w-4 h-4 text-slate-500 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                )}
                <span className="hidden sm:inline capitalize text-[11px] font-semibold">
                  {theme}
                </span>
                <svg
                  className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${
                    themeDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {themeDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 py-1.5 rounded-xl bg-white dark:bg-[#121724] border border-slate-200 dark:border-white/10 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-white/5 mb-1">
                    Theme Preference
                  </div>
                  {themeOptions.map((opt) => {
                    const isSelected = theme === opt.key;
                    return (
                      <button
                        key={opt.key}
                        onClick={() => {
                          setTheme(opt.key);
                          setThemeDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                          isSelected
                            ? "bg-red-50 text-red-600 dark:bg-red-600/20 dark:text-red-400 font-semibold"
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {opt.icon}
                          {opt.label}
                        </span>
                        {isSelected && (
                          <svg className="w-3.5 h-3.5 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-down Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c1018] px-4 pt-3 pb-5 space-y-3 shadow-2xl">
          <div className="space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? "text-red-600 bg-red-50 dark:text-white dark:bg-red-600/20 border-l-4 border-red-600 font-semibold"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Theme Selector Switch */}
          <div className="pt-3 border-t border-slate-200 dark:border-white/10">
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 px-1">
              Color Theme:
            </div>
            <div className="grid grid-cols-3 gap-2 bg-slate-100 dark:bg-white/5 p-1 rounded-xl">
              {themeOptions.map((opt) => {
                const isSelected = theme === opt.key;
                return (
                  <button
                    key={opt.key}
                    onClick={() => setTheme(opt.key)}
                    className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isSelected
                        ? "bg-white dark:bg-[#1a2133] text-red-600 dark:text-white shadow-sm"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {opt.icon}
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}