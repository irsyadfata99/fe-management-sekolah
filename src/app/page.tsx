// ============================================================================
// HOMEPAGE TERINTEGRASI BACKEND - src/app/page.tsx
// Clean design dengan theme system, no gradients, real API integration
// FIXED: TypeScript errors dan ESLint warnings
// ============================================================================

"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/lib/ThemeProvider";
import { ProgramCard } from "@/components/ui/Cards";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import api from "@/lib/api";
import { Alumni, Testimoni } from "@/lib/types";
import { GraduationCap, ArrowRight, Trophy, Quote, User, ChevronLeft, ChevronRight, Play, Award, Target } from "lucide-react";

// Clean Hero Component dengan Slideshow - No gradients, solid theme colors
function CleanHero() {
  const { school } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Placeholder images - nanti akan diganti dengan images dari public folder
  const heroImages = [
    "https://images.unsplash.com/photo-1562774053-701939374585?w=1920&h=1080&fit=crop", // School building
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=1080&fit=crop", // Students in class
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&h=1080&fit=crop", // Computer lab
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop", // Students studying
  ];

  // Auto slide every 5 seconds
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [heroImages.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-[700px] lg:h-[800px] overflow-hidden">
      {/* Slideshow Background */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}>
            <Image src={image} alt={`${school.name} - Slide ${index + 1}`} fill className="object-cover" priority={index === 0} />
          </div>
        ))}
        {/* Dark overlay untuk readability */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Simple geometric background pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 border border-white/20 rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 border border-white/20 rounded-full"></div>
      </div>

      <div className="relative z-10 container-custom h-full flex items-center">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Main Content */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">{school.homepage.hero.title}</h1>

          <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-90 max-w-3xl mx-auto">{school.homepage.hero.subtitle}</p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {school.homepage.stats.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-white scale-110" : "bg-white/50 hover:bg-white/75"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => goToSlide(currentSlide === 0 ? heroImages.length - 1 : currentSlide - 1)}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={() => goToSlide((currentSlide + 1) % heroImages.length)}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 z-20"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>
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
              <span className="inline-block bg-theme-primary/10 text-theme-primary px-4 py-2 rounded-full text-sm font-medium mb-4">Tentang Sekolah</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{school.name}</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">{school.description}</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-theme-primary/10 rounded-lg flex items-center justify-center mr-4">
                  <Target size={20} className="text-theme-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Visi Kami</h3>
                  <p className="text-gray-600 text-sm">Menjadi sekolah teknologi terdepan yang menghasilkan lulusan berkarakter dan siap bersaing global.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-theme-primary/10 rounded-lg flex items-center justify-center mr-4">
                  <Award size={20} className="text-theme-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Keunggulan</h3>
                  <p className="text-gray-600 text-sm">Kurikulum industri 4.0, fasilitas modern, dan tenaga pengajar berpengalaman profesional.</p>
                </div>
              </div>
            </div>

            <Link href="/about" className="inline-flex items-center text-theme-primary font-semibold hover:text-theme-secondary transition-colors duration-200">
              Selengkapnya Tentang Kami
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>

          {/* School Image */}
          <div className="relative">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
              <Image src="https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop" alt="Gedung Sekolah" fill className="object-cover" />
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

        if (response.data.success && response.data.data && Array.isArray(response.data.data)) {
          setTestimoni(response.data.data);
        } else {
          throw new Error("No testimoni data available");
        }
      } catch {
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

        const response = await api.get("/api/public/alumni?limit=6");

        if (response.data.success && response.data.data && Array.isArray(response.data.data)) {
          setAlumni(response.data.data);
        } else {
          throw new Error("No alumni data available");
        }
      } catch {
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

// Auto-sliding Testimoni Component
function TestimoniSlider({ testimoni }: { testimoni: Testimoni[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto slide every 5 seconds
  useEffect(() => {
    if (testimoni.length > 3) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const maxIndex = Math.max(0, testimoni.length - 3);
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
    const maxIndex = Math.max(0, testimoni.length - 3);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    const maxIndex = Math.max(0, testimoni.length - 3);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  if (testimoni.length === 0) {
    return (
      <div className="text-center py-16">
        <Quote size={48} className="mx-auto mb-4 text-gray-400" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Belum Ada Testimoni</h3>
        <p className="text-gray-500">Testimoni akan ditampilkan ketika data tersedia.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      {testimoni.length > 3 && (
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
        <div className="flex transition-transform duration-500 ease-in-out gap-6" style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}>
          {testimoni.map((test, index) => (
            <div key={test.id || index} className="w-1/3 flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 h-full">
                {/* Profile Section */}
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                    <User size={20} className="text-gray-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-gray-900">{test.nama_lengkap}</h4>
                    <p className="text-theme-primary font-medium text-sm">{test.status}</p>
                  </div>
                </div>

                {/* Quote */}
                <div className="relative">
                  <Quote size={24} className="text-theme-primary/20 mb-3" />
                  <blockquote className="text-gray-700 leading-relaxed italic text-sm">&ldquo;{test.deskripsi}&rdquo;</blockquote>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      {testimoni.length > 3 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.max(1, testimoni.length - 2) }).map((_, index) => (
            <button key={index} onClick={() => setCurrentIndex(index)} className={`w-2 h-2 rounded-full transition-colors duration-200 ${index === currentIndex ? "bg-theme-primary" : "bg-gray-300"}`} />
          ))}
        </div>
      )}
    </div>
  );
}

// Auto-sliding Alumni Component dengan Glass Effect
function AlumniSlider({ alumni }: { alumni: Alumni[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto slide every 6 seconds (different from testimoni)
  useEffect(() => {
    if (alumni.length > 2) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const maxIndex = Math.max(0, alumni.length - 2);
          return prev >= maxIndex ? 0 : prev + 1;
        });
      }, 6000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [alumni.length]);

  const nextSlide = () => {
    const maxIndex = Math.max(0, alumni.length - 2);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    const maxIndex = Math.max(0, alumni.length - 2);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  if (alumni.length === 0) {
    return (
      <div className="text-center py-16">
        <Trophy size={48} className="mx-auto mb-4 text-gray-400" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Belum Ada Data Alumni</h3>
        <p className="text-gray-500">Data alumni akan ditampilkan ketika tersedia.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      {alumni.length > 2 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center shadow-lg hover:bg-white/30 transition-all duration-200"
          >
            <ChevronLeft size={20} className="text-white" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center shadow-lg hover:bg-white/30 transition-all duration-200"
          >
            <ChevronRight size={20} className="text-white" />
          </button>
        </>
      )}

      {/* Alumni Cards Container */}
      <div className="overflow-hidden">
        <div className="flex transition-transform duration-500 ease-in-out gap-8" style={{ transform: `translateX(-${currentIndex * 50}%)` }}>
          {alumni.map((alum, index) => (
            <div key={alum.id || index} className="w-1/2 flex-shrink-0">
              <div className="relative h-96 rounded-2xl overflow-hidden group">
                {/* Background Portrait Image */}
                <div className="absolute inset-0">
                  <Image
                    src={alum.photo_path ? `/uploads/alumni/${alum.photo_path}` : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face"}
                    alt={alum.nama_lengkap}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>

                {/* Glass Card Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-2xl">
                    {/* Name & Year */}
                    <div className="mb-3">
                      <h3 className="text-xl font-bold text-white mb-1">{alum.nama_lengkap}</h3>
                      <div className="flex items-center text-white/90">
                        <GraduationCap size={16} className="mr-2" />
                        <span className="font-medium">Alumni {alum.tahun_lulus}</span>
                      </div>
                    </div>

                    {/* Current Job */}
                    <div className="mb-4">
                      <p className="text-white/95 font-medium text-sm mb-1">{alum.pekerjaan_sekarang}</p>
                    </div>

                    {/* Description */}
                    <div className="text-white/90 text-sm leading-relaxed line-clamp-3">{alum.deskripsi}</div>

                    {/* Success Badge */}
                    <div className="mt-4 inline-flex items-center bg-theme-primary/20 backdrop-blur-sm border border-theme-primary/30 text-white px-3 py-1 rounded-full text-xs font-medium">
                      <Award size={12} className="mr-1" />
                      Success Story
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      {alumni.length > 2 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.max(1, alumni.length - 1) }).map((_, index) => (
            <button key={index} onClick={() => setCurrentIndex(index)} className={`w-2 h-2 rounded-full transition-colors duration-200 ${index === currentIndex ? "bg-theme-primary" : "bg-gray-300"}`} />
          ))}
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
  const { alumni, loading: alumniLoading } = useAlumniData();
  const { testimoni, loading: testimoniLoading } = useTestimoniData();

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
              <span className="inline-block bg-theme-primary/10 text-theme-primary px-4 py-2 rounded-full text-sm font-medium mb-4">Program Sekolah</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Program Unggulan Sekolah</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Berbagai program unggulan yang mendukung pengembangan karakter dan kompetensi siswa secara menyeluruh</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {school.homepage.programs.map((program, index) => (
                <div key={index} className="group">
                  <ProgramCard program={program} />
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/programs" className="inline-flex items-center bg-theme-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-theme-secondary transition-colors duration-200">
                Lihat Semua Program
                <ArrowRight size={20} className="ml-2" />
              </Link>
            </div>
          </div>
        </section>

        {/* Alumni Success Stories Section */}
        <section className="py-16 bg-gray-900 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 border border-white/20 rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 border border-white/20 rounded-full"></div>
            <div className="absolute top-1/3 right-1/3 w-32 h-32 border border-white/20 rounded-full"></div>
          </div>

          <div className="relative z-10 container-custom">
            <div className="text-center mb-12">
              <span className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">Alumni Success Stories</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Alumni Yang Telah Sukses</h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">Lulusan {school.name} yang telah berkarir di berbagai perusahaan ternama dan mencapai kesuksesan</p>
            </div>

            {alumniLoading ? (
              <div className="text-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-white/70">Memuat alumni...</p>
              </div>
            ) : (
              <AlumniSlider alumni={alumni} />
            )}
          </div>
        </section>

        {/* Testimoni Section dengan Auto-Slide */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="inline-block bg-theme-primary/10 text-theme-primary px-4 py-2 rounded-full text-sm font-medium mb-4">Testimoni</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Apa Kata Mereka</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Dengarkan cerita dari alumni, siswa, dan orang tua tentang pengalaman di {school.name}</p>
            </div>

            {testimoniLoading ? <LoadingSection title="testimoni" /> : <TestimoniSlider testimoni={testimoni} />}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
