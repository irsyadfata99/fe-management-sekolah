"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "@/lib/ThemeProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import api from "@/lib/api";
import { Calendar as CalendarIcon, Clock, MapPin, Users, Tag, Filter, Grid3X3, List, Search, X } from "lucide-react";

// Types - Sesuai dengan database structure
interface AcademicEvent {
  id: number;
  judul_kegiatan: string;
  deskripsi?: string;
  tanggal_mulai: string;
  tanggal_selesai?: string;
  waktu_mulai?: string;
  waktu_selesai?: string;
  lokasi?: string;
  jenis_kegiatan: "akademik" | "ekstrakurikuler" | "ujian" | "libur" | "acara_khusus";
  tingkat: "sekolah" | "kelas" | "individu";
  status: "draft" | "published" | "completed" | "cancelled";
  tahun_ajaran: string;
  semester: "1" | "2";
  created_at: string;
}

interface CalendarFilters {
  tahun_ajaran: string;
  semester: string;
  jenis_kegiatan: string;
  bulan: string;
  search: string;
}

// Calendar Hook
function useCalendarData() {
  const [events, setEvents] = useState<AcademicEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async (filters?: Partial<CalendarFilters>) => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams();
      if (filters?.tahun_ajaran) queryParams.append("tahun_ajaran", filters.tahun_ajaran);
      if (filters?.semester) queryParams.append("semester", filters.semester);
      if (filters?.jenis_kegiatan) queryParams.append("jenis_kegiatan", filters.jenis_kegiatan);
      if (filters?.bulan) queryParams.append("bulan", filters.bulan);
      if (filters?.search) queryParams.append("search", filters.search);

      console.log("🔍 Making API call to:", `/api/public/calendar/events`);
      const response = await api.get(`/api/public/calendar/events?${queryParams.toString()}`);

      console.log("🔍 API Response:", response.data);

      if (response.data.success && Array.isArray(response.data.data)) {
        console.log("✅ Events found:", response.data.data.length);
        setEvents(response.data.data);
      } else {
        throw new Error("No calendar data available");
      }
    } catch (error) {
      console.log("❌ Calendar API Error:", error);
      setError("API not connected");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return { events, loading, error, refetch: fetchEvents };
}

// Event Type Colors
const getEventTypeColor = (type: string) => {
  const colors = {
    akademik: "bg-blue-100 text-blue-800 border-blue-200",
    ekstrakurikuler: "bg-green-100 text-green-800 border-green-200",
    ujian: "bg-red-100 text-red-800 border-red-200",
    libur: "bg-purple-100 text-purple-800 border-purple-200",
    acara_khusus: "bg-orange-100 text-orange-800 border-orange-200",
  };
  return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200";
};

// Event Card Component
function EventCard({ event }: { event: AcademicEvent }) {
  const [showDetails, setShowDetails] = useState(false);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (timeStr?: string) => {
    if (!timeStr) return "";
    return timeStr.substring(0, 5);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-200 cursor-pointer group" onClick={() => setShowDetails(true)}>
        {/* Event Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-theme-primary transition-colors mb-2">{event.judul_kegiatan}</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getEventTypeColor(event.jenis_kegiatan)}`}>
                <Tag size={12} className="mr-1" />
                {event.jenis_kegiatan.replace("_", " ")}
              </span>
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <CalendarIcon size={16} className="mr-2 text-theme-primary flex-shrink-0" />
            <span>
              {formatDate(event.tanggal_mulai)}
              {event.tanggal_selesai !== event.tanggal_mulai && ` - ${formatDate(event.tanggal_selesai || "")}`}
            </span>
          </div>

          {(event.waktu_mulai || event.waktu_selesai) && (
            <div className="flex items-center">
              <Clock size={16} className="mr-2 text-theme-primary flex-shrink-0" />
              <span>
                {formatTime(event.waktu_mulai)}
                {event.waktu_selesai && ` - ${formatTime(event.waktu_selesai)}`}
              </span>
            </div>
          )}

          {event.lokasi && (
            <div className="flex items-center">
              <MapPin size={16} className="mr-2 text-theme-primary flex-shrink-0" />
              <span>{event.lokasi}</span>
            </div>
          )}
        </div>

        {/* Description Preview */}
        {event.deskripsi && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600 line-clamp-2">{event.deskripsi}</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">{event.judul_kegiatan}</h2>
              <button onClick={() => setShowDetails(false)} className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
                <X size={16} />
              </button>
            </div>
            <div className="p-6">{event.deskripsi && <p className="text-gray-600 leading-relaxed">{event.deskripsi}</p>}</div>
          </div>
        </div>
      )}
    </>
  );
}

// Main Calendar Page Component - PASTIKAN INI ADA EXPORT DEFAULT
export default function CalendarPage() {
  const { school } = useTheme();
  const { events, loading, error, refetch } = useCalendarData();

  const [filters, setFilters] = useState<CalendarFilters>({
    tahun_ajaran: "",
    semester: "",
    jenis_kegiatan: "",
    bulan: "",
    search: "",
  });

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="py-16 bg-gray-900 relative overflow-hidden">
          <div className="relative z-10 container-custom">
            <div className="text-center text-white">
              <span className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">Informasi Akademik</span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Kalender Akademik</h1>
              <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-8">Temukan jadwal kegiatan akademik, ujian, libur, dan acara penting lainnya di {school.name}</p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold mb-1">{events.length}</div>
                  <div className="text-sm opacity-90">Total Kegiatan</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold mb-1">{events.filter((e) => e.jenis_kegiatan === "akademik").length}</div>
                  <div className="text-sm opacity-90">Akademik</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold mb-1">{events.filter((e) => e.jenis_kegiatan === "ujian").length}</div>
                  <div className="text-sm opacity-90">Ujian</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold mb-1">{events.filter((e) => e.jenis_kegiatan === "libur").length}</div>
                  <div className="text-sm opacity-90">Libur</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Calendar Content */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            {/* View Controls */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Kegiatan Akademik
                  {events.length > 0 && <span className="text-lg font-normal text-gray-500 ml-2">({events.length} kegiatan)</span>}
                </h2>
              </div>

              <div className="flex items-center space-x-2">
                <button onClick={() => setViewMode("grid")} className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-theme-primary text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}>
                  <Grid3X3 size={20} />
                </button>
                <button onClick={() => setViewMode("list")} className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-theme-primary text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}>
                  <List size={20} />
                </button>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="text-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-theme-primary mx-auto mb-4"></div>
                <p className="text-gray-500">Memuat kalender akademik...</p>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="text-center py-16">
                <CalendarIcon size={48} className="mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Kalender Tidak Tersedia</h3>
                <p className="text-gray-500 mb-4">API backend belum tersedia. Silakan coba lagi nanti.</p>
                <button onClick={() => refetch()} className="inline-flex items-center bg-theme-primary text-white px-4 py-2 rounded-lg hover:bg-theme-secondary transition-colors">
                  Coba Lagi
                </button>
              </div>
            )}

            {/* Events Display */}
            {!loading && !error && events.length === 0 && (
              <div className="text-center py-16">
                <CalendarIcon size={48} className="mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak Ada Kegiatan</h3>
                <p className="text-gray-500">Tidak ada kegiatan yang sesuai dengan filter yang dipilih.</p>
              </div>
            )}

            {!loading && !error && events.length > 0 && (
              <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                {events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
