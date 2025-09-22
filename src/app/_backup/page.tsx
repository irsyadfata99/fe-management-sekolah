// ============================================================================
// 4. FIXED: src/app/(public)/page.tsx
// Fix all TypeScript errors dan remove unused variables
// ============================================================================

"use client";

import { useState, useEffect } from "react";
import HeroSlideshow from "@/components/ui/HeroSlideshow";
import { AlumniCard, TestimoniCard, StatsCard, ProgramCard } from "@/components/ui/Cards";
import { useTheme } from "@/lib/ThemeProvider";
import api from "@/lib/api";
import { Alumni, Testimoni } from "@/lib/types";

// FIXED: Custom hooks dengan proper typing dan error handling
function useAlumniData() {
  const [alumni, setAlumni] = useState<Alumni[]>([]);

  useEffect(() => {
    api
      .get("/api/public/alumni?limit=2")
      .then((response) => {
        if (response.data.success) {
          setAlumni(response.data.data);
        }
      })
      .catch(() => {
        // FIXED: Removed unused error parameter
        console.log("Alumni API not ready yet, using mock data");
        // Mock data fallback dengan proper typing
        setAlumni([
          {
            nama_lengkap: "Budi Santoso",
            tahun_lulus: 2020,
            pekerjaan_sekarang: "Full Stack Developer di Tokopedia",
            deskripsi: "Berkarir sebagai developer di unicorn Indonesia berkat ilmu yang didapat di SMK Nusantara Tech.",
          },
          {
            nama_lengkap: "Sari Dewi",
            tahun_lulus: 2019,
            pekerjaan_sekarang: "UI/UX Designer di Gojek",
            deskripsi: "Mengembangkan karir sebagai designer profesional dengan foundation yang kuat dari jurusan Multimedia.",
          },
        ]);
      });
  }, []);

  return alumni;
}

function useTestimoniData() {
  const [testimoni, setTestimoni] = useState<Testimoni[]>([]);

  useEffect(() => {
    api
      .get("/api/public/testimoni?limit=3")
      .then((response) => {
        if (response.data.success) {
          setTestimoni(response.data.data);
        }
      })
      .catch(() => {
        // FIXED: Removed unused error parameter
        console.log("Testimoni API not ready yet, using mock data");
        // Mock data fallback dengan proper typing
        setTestimoni([
          {
            nama_lengkap: "Ahmad Rizki",
            status: "Alumni",
            deskripsi: "SMK Nusantara Tech memberikan bekal yang sangat baik untuk karir saya di dunia teknologi. Guru-gurunya sangat kompeten dan fasilitas pembelajarannya lengkap.",
          },
          {
            nama_lengkap: "Maya Sari",
            status: "Orang Tua Siswa",
            deskripsi: "Saya sangat puas dengan pendidikan yang diberikan di SMK Nusantara Tech. Anak saya berkembang pesat dan mendapat banyak pengalaman praktis.",
          },
          {
            nama_lengkap: "Doni Kurniawan",
            status: "Siswa Aktif",
            deskripsi: "Belajar di sini sangat menyenangkan! Praktik-praktiknya banyak dan guru-gurunya sabar mengajar. Saya merasa siap untuk dunia kerja nanti.",
          },
        ]);
      });
  }, []);

  return testimoni;
}

export default function HomePage() {
  const { school } = useTheme();
  const alumni = useAlumniData();
  const testimoni = useTestimoniData();

  return (
    <>
      {/* Hero Slideshow */}
      <HeroSlideshow />

      {/* Stats Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {school.homepage.stats.map((stat, index) => (
              <StatsCard key={index} stat={stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Programs Highlight */}
      <section className="section-padding theme-surface">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Program Studi Unggulan</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Pilih program studi yang sesuai dengan minat dan bakatmu untuk masa depan yang cerah</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {school.homepage.programs.map((program, index) => (
              <ProgramCard key={index} program={program} />
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Success Stories */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Alumni Sukses</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Lulusan SMK Nusantara Tech yang telah berkarir di berbagai perusahaan ternama</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* FIXED: Proper typing untuk map function */}
            {alumni.map((alum: Alumni, index: number) => (
              <AlumniCard key={index} alumni={alum} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding theme-surface">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Testimoni</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Dengarkan cerita dari alumni, siswa, dan orang tua tentang pengalaman di SMK Nusantara Tech</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* FIXED: Proper typing untuk map function */}
            {testimoni.map((test: Testimoni, index: number) => (
              <TestimoniCard key={index} testimoni={test} />
            ))}
          </div>
        </div>
      </section>

      {/* News Preview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Berita Terbaru</h2>
              <p className="text-xl text-gray-600">Update terkini dari {school.name}</p>
            </div>
            <a href="/news" className="btn-secondary hidden md:inline-block">
              Lihat Semua Berita
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Placeholder news cards - will be replaced with real API data in Phase 2 */}
            <div className="card">
              <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
              <h3 className="font-semibold text-lg mb-2">Prestasi Siswa di Kompetisi Nasional</h3>
              <p className="text-gray-600 text-sm mb-3">15 November 2024</p>
              <p className="text-gray-600">Siswa {school.name} meraih juara 1 dalam kompetisi programming tingkat nasional...</p>
            </div>
            <div className="card">
              <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
              <h3 className="font-semibold text-lg mb-2">Kerjasama dengan Industri Tech</h3>
              <p className="text-gray-600 text-sm mb-3">10 November 2024</p>
              <p className="text-gray-600">{school.name} menjalin kerjasama dengan beberapa perusahaan teknologi terkemuka...</p>
            </div>
            <div className="card">
              <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
              <h3 className="font-semibold text-lg mb-2">Workshop AI dan Machine Learning</h3>
              <p className="text-gray-600 text-sm mb-3">5 November 2024</p>
              <p className="text-gray-600">Siswa mengikuti workshop intensif tentang artificial intelligence dan machine learning...</p>
            </div>
          </div>
          <div className="text-center mt-8 md:hidden">
            <a href="/news" className="btn-secondary">
              Lihat Semua Berita
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
