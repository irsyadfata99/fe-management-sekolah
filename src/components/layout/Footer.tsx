// ============================================================================
// 7. CREATE: src/components/layout/Footer.tsx
// Footer dengan contact info integration
// ============================================================================

"use client";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/lib/ThemeProvider";

export default function Footer() {
  const { school } = useTheme();

  const quickLinks = [
    { name: "Tentang Sekolah", href: "/about" },
    { name: "Program Studi", href: "/programs" },
    { name: "Berita", href: "/news" },
    { name: "Akademik", href: "/academic" },
  ];

  const resources = [
    { name: "Download Brosur", href: "/downloads" },
    { name: "Galeri Foto", href: "/gallery" },
    { name: "Kalender Akademik", href: "/academic" },
  ];

  return (
    <footer className="theme-surface border-t theme-border">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image src={school.assets.logo} alt={`${school.name} Logo`} width={40} height={40} className="w-auto h-8" />
              <span className="font-semibold text-lg theme-text-primary">{school.name}</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">{school.description}</p>
            <p className="text-xs text-gray-500">{school.tagline}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 theme-text-primary">Menu Utama</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-600 hover:theme-text-primary transition-colors duration-200 text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4 theme-text-primary">Resources</h3>
            <ul className="space-y-2">
              {resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-600 hover:theme-text-primary transition-colors duration-200 text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4 theme-text-primary">Kontak</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium text-gray-700">Alamat</p>
                <p className="text-gray-600">{school.contact.address}</p>
              </div>

              <div>
                <p className="font-medium text-gray-700">Telepon</p>
                <a href={`tel:${school.contact.phone}`} className="text-gray-600 hover:theme-text-primary transition-colors duration-200">
                  {school.contact.phone}
                </a>
              </div>

              <div>
                <p className="font-medium text-gray-700">Email</p>
                <a href={`mailto:${school.contact.email}`} className="text-gray-600 hover:theme-text-primary transition-colors duration-200">
                  {school.contact.email}
                </a>
              </div>

              {/* Social Media */}
              <div className="mt-6">
                <p className="font-medium text-gray-700 mb-3">Follow Us</p>
                <div className="flex space-x-4">
                  {school.contact.social.facebook && (
                    <a href={school.contact.social.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:theme-text-primary transition-colors duration-200">
                      Facebook
                    </a>
                  )}
                  {school.contact.social.instagram && (
                    <a href={school.contact.social.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:theme-text-primary transition-colors duration-200">
                      Instagram
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t theme-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© 2024 {school.name}. All rights reserved.</p>
            <p className="text-gray-500 text-sm mt-2 md:mt-0">Developed with ❤️ for Indonesian Education</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
