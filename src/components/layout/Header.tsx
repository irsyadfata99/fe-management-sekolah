// ============================================================================
// 6. CREATE: src/components/layout/Header.tsx
// Navigation header component
// ============================================================================

"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/lib/ThemeProvider";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { school } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Beranda", href: "/" },
    { name: "Tentang", href: "/about" },
    { name: "Program Studi", href: "/programs" },
    { name: "Berita", href: "/news" },
    { name: "Akademik", href: "/academic" },
    { name: "Galeri", href: "/gallery" },
    { name: "Download", href: "/downloads" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"}`}>
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image src={school.assets.logo} alt={`${school.name} Logo`} width={40} height={40} className="w-auto h-8" />
            <span className="font-semibold text-lg theme-text-primary">{school.name}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className="text-gray-600 hover:theme-text-primary transition-colors duration-200">
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button type="button" className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className="sr-only">Open menu</span>
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`w-5 h-0.5 bg-gray-600 transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-0.5" : ""}`} />
              <span className={`w-5 h-0.5 bg-gray-600 mt-1 transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`} />
              <span className={`w-5 h-0.5 bg-gray-600 mt-1 transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? "max-h-96 pb-4" : "max-h-0"}`}>
          <div className="pt-4 space-y-2">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className="block px-4 py-2 text-gray-600 hover:theme-text-primary hover:theme-surface rounded-lg transition-all duration-200" onClick={() => setIsMenuOpen(false)}>
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
