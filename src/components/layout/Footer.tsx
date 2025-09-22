"use client";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/lib/ThemeProvider";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Download,
  FileText,
  BookOpen,
  Calendar,
  Award,
} from "lucide-react";

export default function Footer() {
  const { school } = useTheme();

  const quickLinks = [
    { name: "Tentang Sekolah", href: "/about", icon: BookOpen },
    { name: "Program Studi", href: "/programs", icon: Award },
    { name: "Pendaftaran SPMB", href: "/daftar", icon: FileText },
  ];

  const newsLinks = [
    { name: "Berita Terbaru", href: "/news", icon: FileText },
    { name: "Kalender Akademik", href: "/calendar", icon: Calendar },
    { name: "Kontak Kami", href: "/contact", icon: Phone },
  ];

  const downloadLinks = [
    {
      name: "Formulir Pendaftaran",
      href: "/downloads/formulir-pendaftaran.pdf",
      description: "Form pendaftaran siswa baru",
    },
    {
      name: "Brosur Program Studi",
      href: "/downloads/brosur-program-studi.pdf",
      description: "Info lengkap TKJ, RPL, MM",
    },
    {
      name: "Panduan Akademik",
      href: "/downloads/panduan-akademik.pdf",
      description: "Panduan lengkap kegiatan akademik",
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-6">
      {/* Main Footer Content */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-theme-primary rounded-lg shrink-0">
                <Image
                  src={school.assets.logo}
                  alt={`${school.name} Logo`}
                  width={32}
                  height={32}
                  className="w-8 h-8 filter brightness-0 invert"
                />
              </div>
              <div className="min-w-0">
                <h2 className="font-bold text-lg text-white leading-tight">
                  {school.name}
                </h2>
                <p className="text-sm text-theme-primary font-medium">
                  {school.tagline}
                </p>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed">
              {school.description}
            </p>

            {/* Social Media */}
            <div className="flex space-x-3 pt-2">
              {school.contact.social.facebook && (
                <a
                  href={school.contact.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-theme-primary transition-all duration-200"
                  aria-label="Facebook"
                >
                  <span className="text-sm font-bold">f</span>
                </a>
              )}
              {school.contact.social.instagram && (
                <a
                  href={school.contact.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-theme-primary transition-all duration-200"
                  aria-label="Instagram"
                >
                  <span className="text-sm font-bold">ig</span>
                </a>
              )}
              {school.contact.social.youtube && (
                <a
                  href={school.contact.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-theme-primary transition-all duration-200"
                  aria-label="YouTube"
                >
                  <span className="text-sm font-bold">yt</span>
                </a>
              )}
            </div>
          </div>

          {/* Menu Utama */}
          <div className="space-y-4">
            <h3 className="font-bold text-white text-base mb-4 flex items-center">
              <BookOpen
                size={18}
                className="mr-2 text-theme-primary shrink-0"
              />
              Menu Utama
            </h3>

            <div className="space-y-4">
              <ul className="space-y-2">
                {quickLinks.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="flex items-center text-gray-400 hover:text-white transition-all duration-200 group text-sm"
                      >
                        <IconComponent
                          size={14}
                          className="mr-3 text-gray-500 group-hover:text-theme-primary shrink-0"
                        />
                        <span>{link.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Lainnya Section */}
              <div className="pt-2 border-t border-gray-800">
                <h4 className="font-medium mb-2 text-gray-200 text-sm">
                  Lainnya
                </h4>
                <ul className="space-y-2">
                  {newsLinks.map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="flex items-center text-gray-400 hover:text-white transition-all duration-200 group text-sm"
                        >
                          <IconComponent
                            size={14}
                            className="mr-3 text-gray-500 group-hover:text-theme-primary shrink-0"
                          />
                          <span>{link.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          {/* Download Section */}
          <div className="space-y-4">
            <h3 className="font-bold text-white text-base mb-4 flex items-center">
              <Download
                size={18}
                className="mr-2 text-theme-primary shrink-0"
              />
              Download
            </h3>

            <div className="space-y-3">
              {downloadLinks.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 bg-gray-800 rounded-lg hover:bg-gray-750 transition-all duration-200 group border border-gray-700 hover:border-theme-primary"
                >
                  <div className="flex items-start">
                    <FileText
                      size={16}
                      className="mr-3 mt-0.5 text-theme-primary shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-white text-xs font-medium group-hover:text-theme-primary transition-colors leading-tight">
                        {item.name}
                      </p>
                      <p className="text-gray-400 text-xs mt-1 leading-tight">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-white text-base mb-4 flex items-center">
              <Phone size={18} className="mr-2 text-theme-primary shrink-0" />
              Kontak Kami
            </h3>

            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start">
                <MapPin
                  size={16}
                  className="mr-3 mt-0.5 text-theme-primary shrink-0"
                />
                <div className="min-w-0">
                  <p className="font-medium text-gray-200 text-xs mb-1">
                    Alamat
                  </p>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {school.contact.address}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start">
                <Phone
                  size={16}
                  className="mr-3 mt-0.5 text-theme-primary shrink-0"
                />
                <div className="min-w-0">
                  <p className="font-medium text-gray-200 text-xs mb-1">
                    Telepon
                  </p>
                  <a
                    href={`tel:${school.contact.phone}`}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-xs"
                  >
                    {school.contact.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start">
                <Mail
                  size={16}
                  className="mr-3 mt-0.5 text-theme-primary shrink-0"
                />
                <div className="min-w-0">
                  <p className="font-medium text-gray-200 text-xs mb-1">
                    Email
                  </p>
                  <a
                    href={`mailto:${school.contact.email}`}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-xs break-all"
                  >
                    {school.contact.email}
                  </a>
                </div>
              </div>

              {/* Office Hours */}
              <div className="flex items-start">
                <Clock
                  size={16}
                  className="mr-3 mt-0.5 text-theme-primary shrink-0"
                />
                <div className="min-w-0">
                  <p className="font-medium text-gray-200 text-xs mb-1">
                    Jam Operasional
                  </p>
                  <div className="text-gray-400 text-xs space-y-1">
                    <p>Senin - Jumat: 07:00 - 16:00</p>
                    <p>Sabtu: 07:00 - 12:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-gray-950 pb-4 pt-4 mt-4">
        <div className="container-custom py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-xs">
                © {currentYear} {school.name}. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-0.5">
                Sistem Informasi Sekolah v2.0 - Dikembangkan dengan ❤️ untuk
                Pendidikan Indonesia
              </p>
            </div>

            <div className="flex items-center space-x-4 text-xs">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Kebijakan Privasi
              </Link>
              <span className="text-gray-600">•</span>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Syarat & Ketentuan
              </Link>
              <span className="text-gray-600">•</span>
              <Link
                href="/sitemap"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
