// ============================================================================
// 8. CREATE: src/components/ui/HeroSlideshow.tsx
// Modern slideshow component
// ============================================================================

"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "@/lib/ThemeProvider";

export default function HeroSlideshow() {
  const { school } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const slides = school.assets.heroSlides;
  const slideInterval = school.homepage.hero.slideInterval;

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, slideInterval);

    return () => clearInterval(interval);
  }, [isPlaying, slides.length, slideInterval]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="relative h-[600px] lg:h-[700px] overflow-hidden">
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}>
            <Image src={slide} alt={`${school.name} - Slide ${index + 1}`} fill className="object-cover" priority={index === 0} />
            {/* Overlay untuk readability */}
            <div className="absolute inset-0 bg-black/20" />
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container-custom text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">{school.homepage.hero.title}</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">{school.homepage.hero.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">Jelajahi Program Studi</button>
            <button className="btn-secondary bg-white/20 border-white text-white hover:bg-white hover:text-gray-900">Download Brosur</button>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button key={index} onClick={() => goToSlide(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-white scale-110" : "bg-white/50 hover:bg-white/75"}`} />
        ))}
      </div>

      {/* Play/Pause Button */}
      <button onClick={togglePlayPause} className="absolute bottom-6 right-6 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200">
        {isPlaying ? "⏸" : "▶"}
      </button>
    </section>
  );
}
