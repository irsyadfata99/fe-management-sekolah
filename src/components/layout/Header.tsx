"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "@/lib/ThemeProvider";
import { User, LogIn, Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { school } = useTheme();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Updated navigation - Alumni replaced with Kalender Akademik
  const navigation = [
    { name: "Tentang", href: "/about" },
    { name: "Program Studi", href: "/programs" },
    { name: "Kalender Akademik", href: "/calendar" },
    { name: "Berita", href: "/news" },
    { name: "SPMB", href: "/spmb" },
    { name: "Kontak", href: "/contact" },
  ];

  const handleLoginClick = () => {
    router.push("/admin/login");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
          : "bg-white shadow-sm"
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Image
                src={school.assets.logo}
                alt={`${school.name} Logo`}
                width={40}
                height={40}
                className="w-auto h-10 transition-transform duration-200 group-hover:scale-105"
              />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-lg text-theme-primary transition-colors">
                {school.name}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-theme-primary hover:bg-gray-50 transition-all duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Login Button & Mobile Menu Button */}
          <div className="flex items-center space-x-3">
            {/* Login Button - Desktop */}
            <button
              onClick={handleLoginClick}
              className="hidden md:flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-theme-primary border border-gray-300 rounded-lg hover:border-theme-primary transition-all duration-200 hover:shadow-md"
            >
              <User size={16} />
              <span>Login</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X size={24} className="text-gray-600" />
              ) : (
                <Menu size={24} className="text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? "max-h-96 pb-4 border-t border-gray-100" : "max-h-0"
          }`}
        >
          <div className="pt-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:text-theme-primary hover:bg-gray-50 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Login Button */}
            <button
              onClick={handleLoginClick}
              className="w-full flex items-center justify-center space-x-2 mx-2 mt-4 px-4 py-3 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
            >
              <LogIn size={16} />
              <span>Login Admin</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
