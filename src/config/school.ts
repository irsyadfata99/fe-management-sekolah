// ============================================================================
// 2. CREATE: src/config/school.ts
// Configuration yang mudah diubah client untuk customization
// ============================================================================

import { ThemeKey } from "./themes";

export const schoolConfig = {
  // BASIC INFO - Client ganti semua ini untuk sekolah mereka
  name: "SMK NUSANTARA TECH",
  tagline: "Membangun Generasi Digital Indonesia",
  description: "Sekolah Menengah Kejuruan terdepan yang menghasilkan lulusan berkualitas dan siap kerja di era digital.",

  // THEME SELECTION - Client pilih salah satu theme
  selectedTheme: "blue_professional" as ThemeKey,

  // ASSETS - Client upload logo dan images mereka
  assets: {
    logo: "/images/logo.png",
    favicon: "/images/favicon.ico",
    heroSlides: ["/images/hero-1.jpg", "/images/hero-2.jpg", "/images/hero-3.jpg", "/images/hero-4.jpg"],
  },

  // CONTACT INFO - Client edit sesuai sekolah mereka
  contact: {
    address: "Jl. Teknologi No. 123, Jakarta Selatan 12345",
    phone: "(021) 1234-5678",
    email: "info@smknusantara.sch.id",
    website: "www.smknusantara.sch.id",
    maps: "https://goo.gl/maps/example",
    social: {
      facebook: "https://facebook.com/smknusantara",
      instagram: "https://instagram.com/smknusantara",
      youtube: "https://youtube.com/smknusantara",
      tiktok: "https://tiktok.com/@smknusantara",
    },
  },

  // HOMEPAGE CONTENT - Client customization content
  homepage: {
    hero: {
      title: "Selamat Datang di SMK Nusantara Tech",
      subtitle: "Membangun Generasi Digital Indonesia yang Unggul dan Berkarakter",
      slideInterval: 5000, // 5 seconds
    },

    stats: [
      { label: "Siswa Aktif", value: "1,200+" },
      { label: "Guru & Staff", value: "80+" },
      { label: "Alumni Sukses", value: "2,500+" },
      { label: "Program Studi", value: "6" },
    ],

    programs: [
      {
        name: "Teknik Komputer & Jaringan",
        code: "TKJ",
        description: "Ahli jaringan komputer dan sistem informasi",
      },
      {
        name: "Rekayasa Perangkat Lunak",
        code: "RPL",
        description: "Developer aplikasi dan website profesional",
      },
      {
        name: "Multimedia",
        code: "MM",
        description: "Desainer grafis dan video creator",
      },
    ],
  },
};
