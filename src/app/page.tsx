// ============================================================================
// HOMEPAGE TERINTEGRASI BACKEND - src/app/page.tsx
// Clean design dengan theme system, no gradients, real API integration
// ============================================================================

"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/lib/ThemeProvider";
import {
  AlumniCard,
  TestimoniCard,
  StatsCard,
  ProgramCard,
} from "@/components/ui/Cards";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import api from "@/lib/api";
import { Alumni, Testimoni, Article } from "@/lib/types";
import {
  GraduationCap,
  Users,
  BookOpen,
  ArrowRight,
  Trophy,
  Quote,
  Clock,
  User,
  ChevronLeft,
  ChevronRight,
  Play,
  MapPin,
  Award,
  Target,
} from "lucide-react";

// Clean Hero Component - No gradients, solid theme colors
function CleanHero() {
  const { school } = useTheme();

  return (
    <section className="relative bg-theme-primary text-white py-20 lg:py-28">
      {/* Simple geometric background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 border border-white/20 rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 border border-white/20 rounded-full"></div>
      </div>

      <div className="relative z-10 container-custom">
        <div className="max-w-4xl mx-auto text-center">
          {/* School Logo */}
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto mb-6 p-4 bg-white rounded-2xl">
              <Image
                src={school.assets.logo}
                alt={`${school.name} Logo`}
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Main Content */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {school.homepage.hero.title}
          </h1>

          <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-90 max-w-3xl mx-auto">
            {school.homepage.hero.subtitle}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/programs"
              className="inline-flex items-center bg-white text-theme-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
            >
              <GraduationCap size={20} className="mr-2" />
              Jelajahi Program Studi
            </Link>
            <Link
              href="/daftar"
              className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-theme-primary transition-colors duration-200"
            >
              <Users size={20} className="mr-2" />
              Daftar Sekarang
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {school.homepage.stats.map((stat, index) => (
              <div key={index} className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl md:text-3xl font-bold mb-1">
                  {stat.value}
                </div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// About School Section dengan foto
function AboutSchool() {
  const { school } = useTheme();

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="mb-6">
              <span className="inline-block bg-theme-primary/10 text-theme-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                Tentang Sekolah
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                {school.name}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {school.description}
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-theme-primary/10 rounded-lg flex items-center justify-center mr-4">
                  <Target size={20} className="text-theme-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Visi Kami
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Menjadi sekolah teknologi terdepan yang menghasilkan lulusan
                    berkarakter dan siap bersaing global.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-theme-primary/10 rounded-lg flex items-center justify-center mr-4">
                  <Award size={20} className="text-theme-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Keunggulan
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Kurikulum industri 4.0, fasilitas modern, dan tenaga
                    pengajar berpengalaman profesional.
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center text-theme-primary font-semibold hover:text-theme-secondary transition-colors duration-200"
            >
              Selengkapnya Tentang Kami
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>

          {/* School Image */}
          <div className="relative">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop"
                alt="Gedung Sekolah"
                fill
                className="object-cover"
              />
            </div>
            {/* Play button overlay for future video */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-16 h-16 bg-theme-primary text-white rounded-full flex items-center justify-center shadow-lg hover:bg-theme-secondary transition-colors duration-200">
                <Play size={24} fill="currentColor" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Enhanced Testimoni Hook - No mock data
function useTestimoniData() {
  const [testimoni, setTestimoni] = useState<Testimoni[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimoni = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get("/api/public/testimoni?limit=6");

        if (
          response.data.success &&
          response.data.data &&
          Array.isArray(response.data.data)
        ) {
          setTestimoni(response.data.data);
        } else {
          throw new Error("No testimoni data available");
        }
      } catch (err) {
        console.log("Testimoni API not ready");
        setError("API not connected");
        setTestimoni([]); // No mock data
      } finally {
        setLoading(false);
      }
    };

    fetchTestimoni();
  }, []);

  return { testimoni, loading, error };
}

// Enhanced Alumni Hook - No mock data
function useAlumniData() {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get("/api/public/alumni?limit=4");

        if (
          response.data.success &&
          response.data.data &&
          Array.isArray(response.data.data)
        ) {
          setAlumni(response.data.data);
        } else {
          throw new Error("No alumni data available");
        }
      } catch (err) {
        console.log("Alumni API not ready");
        setError("API not connected");
        setAlumni([]); // No mock data
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, []);

  return { alumni, loading, error };
}

// Articles Hook - No mock data
function useArticlesData() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get("/api/public/articles?limit=3");

        if (
          response.data.success &&
          response.data.data &&
          Array.isArray(response.data.data)
        ) {
          setArticles(response.data.data);
        } else {
          throw new Error("No articles data available");
        }
      } catch (err) {
        console.log("Articles API not ready");
        setError("API not connected");
        setArticles([]); // No mock data
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return { articles, loading, error };
}

// Auto-sliding Testimoni Component
function TestimoniSlider({ testimoni }: { testimoni: Testimoni[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto slide every 5 seconds
  useEffect(() => {
    if (testimoni.length > 2) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const maxIndex = Math.max(0, testimoni.length - 2);
          return prev >= maxIndex ? 0 : prev + 1;
        });
      }, 5000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [testimoni.length]);

  const nextSlide = () => {
    const maxIndex = Math.max(0, testimoni.length - 2);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    const maxIndex = Math.max(0, testimoni.length - 2);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  if (testimoni.length === 0) {
    return (
      <div className="text-center py-16">
        <Quote size={48} className="mx-auto mb-4 text-gray-400" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Belum Ada Testimoni
        </h3>
        <p className="text-gray-500">
          Testimoni akan ditampilkan ketika data tersedia.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      {testimoni.length > 2 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <ChevronRight size={20} className="text-gray-600" />
          </button>
        </>
      )}

      {/* Testimoni Cards Container */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out gap-8"
          style={{ transform: `translateX(-${currentIndex * 50}%)` }}
        >
          {testimoni.map((test, index) => (
            <div key={test.id || index} className="w-1/2 flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 h-full">
                {/* Profile Section */}
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                    <User size={24} className="text-gray-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">
                      {test.nama_lengkap}
                    </h4>
                    <p className="text-theme-primary font-medium">
                      {test.status}
                    </p>
                  </div>
                </div>

                {/* Quote */}
                <div className="relative">
                  <Quote size={32} className="text-theme-primary/20 mb-4" />
                  <blockquote className="text-gray-700 leading-relaxed italic">
                    "{test.deskripsi}"
                  </blockquote>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      {testimoni.length > 2 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.max(1, testimoni.length - 1) }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? "bg-theme-primary" : "bg-gray-300"
                }`}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}

// Loading Component
function LoadingSection({ title }: { title: string }) {
  return (
    <div className="text-center py-16">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-theme-primary mx-auto mb-4"></div>
      <p className="text-gray-500">Memuat {title}...</p>
    </div>
  );
}

export default function HomePage() {
  const { school } = useTheme();
  const {
    alumni,
    loading: alumniLoading,
    error: alumniError,
  } = useAlumniData();
  const {
    testimoni,
    loading: testimoniLoading,
    error: testimoniError,
  } = useTestimoniData();
  const {
    articles,
    loading: articlesLoading,
    error: articlesError,
  } = useArticlesData();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-16">
        {/* Clean Hero Section */}
        <CleanHero />

        {/* About School Section */}
        <AboutSchool />

        {/* Programs Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="inline-block bg-theme-primary/10 text-theme-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                Program Unggulan
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Program Studi Unggulan
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Pilih program studi yang sesuai dengan minat dan bakatmu untuk
                masa depan yang cerah
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {school.homepage.programs.map((program, index) => (
                <div key={index} className="group">
                  <ProgramCard program={program} />
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/programs"
                className="inline-flex items-center bg-theme-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-theme-secondary transition-colors duration-200"
              >
                Lihat Semua Program
                <ArrowRight size={20} className="ml-2" />
              </Link>
            </div>
          </div>
        </section>

        {/* Testimoni Section dengan Auto-Slide */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="inline-block bg-theme-primary/10 text-theme-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                Testimoni
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Apa Kata Mereka
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Dengarkan cerita dari alumni, siswa, dan orang tua tentang
                pengalaman di {school.name}
              </p>
            </div>

            {testimoniLoading ? (
              <LoadingSection title="testimoni" />
            ) : (
              <TestimoniSlider testimoni={testimoni} />
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
