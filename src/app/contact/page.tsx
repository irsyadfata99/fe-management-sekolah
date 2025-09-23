"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/lib/ThemeProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import api from "@/lib/api";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  MessageSquare,
  Instagram,
  Facebook,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  Building2,
  Users,
  GraduationCap,
  BookOpen,
} from "lucide-react";

// Types
interface ContactInfo {
  school_name: string;
  school_address: string;
  school_phone: string;
  school_email: string;
  school_website: string;
  maps_latitude: number;
  maps_longitude: number;
  maps_embed_url: string;
  office_hours: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  departments: Department[];
}

interface Department {
  name: string;
  phone: string;
  email: string;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  category: "general" | "admission" | "academic" | "technical";
}

// Contact Info Hook
function useContactInfo() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/contact/info");
        if (response.data.success) {
          setContactInfo(response.data.data);
        } else {
          throw new Error("Failed to load contact info");
        }
      } catch (error: unknown) {
        console.error("Contact info error:", error);
        setError("Gagal memuat informasi kontak");
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  return { contactInfo, loading, error };
}

// Contact Form Component
function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    category: "general",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await api.post("/api/contact/message", formData);

      if (response.data.success) {
        setSubmitStatus("success");
        setSubmitMessage(response.data.message);
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          category: "general",
        });
      } else {
        throw new Error(response.data.message || "Gagal mengirim pesan");
      }
    } catch (error: unknown) {
      setSubmitStatus("error");
      const errorMessage =
        error instanceof Error
          ? error.message
          : (error as { response?: { data?: { message?: string } } })?.response
              ?.data?.message || "Gagal mengirim pesan";
      setSubmitMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const categoryOptions = [
    { value: "general", label: "Pertanyaan Umum" },
    { value: "admission", label: "Pendaftaran Siswa" },
    { value: "academic", label: "Akademik & Kurikulum" },
    { value: "technical", label: "Teknis Website" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Kirim Pesan</h2>
        <p className="text-gray-600">
          Silakan isi form di bawah ini untuk menghubungi kami. Kami akan
          merespon secepatnya.
        </p>
      </div>

      {/* Status Messages */}
      {submitStatus === "success" && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
          <CheckCircle className="text-green-500 mr-3" size={20} />
          <p className="text-green-700">{submitMessage}</p>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
          <AlertCircle className="text-red-500 mr-3" size={20} />
          <p className="text-red-700">{submitMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name & Email Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nama Lengkap *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-transparent"
              placeholder="Masukkan nama lengkap"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-transparent"
              placeholder="nama@email.com"
            />
          </div>
        </div>

        {/* Phone & Category Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              No. Telepon
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-transparent"
              placeholder="08XX-XXXX-XXXX"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Kategori *
            </label>
            <select
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-transparent"
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Subject */}
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-transparent"
            placeholder="Ringkasan topik/pertanyaan"
          />
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Pesan *
          </label>
          <textarea
            id="message"
            name="message"
            required
            value={formData.message}
            onChange={handleInputChange}
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-transparent resize-none"
            placeholder="Tulis pesan atau pertanyaan Anda di sini..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-theme-primary text-white py-3 px-6 rounded-lg font-semibold 
                   hover:bg-theme-secondary transition-colors duration-200 
                   disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin mr-2" size={20} />
              Mengirim...
            </>
          ) : (
            <>
              <Send className="mr-2" size={20} />
              Kirim Pesan
            </>
          )}
        </button>
      </form>
    </div>
  );
}

// Google Maps Component - Fixed (No API Key Required)
function GoogleMaps({
  latitude,
  longitude,
  embedUrl,
}: {
  latitude: number;
  longitude: number;
  embedUrl: string;
}) {
  // Use custom embed URL if provided
  if (embedUrl && embedUrl.trim()) {
    return (
      <div className="w-full h-96 rounded-2xl overflow-hidden shadow-lg">
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Lokasi Sekolah"
        />
      </div>
    );
  }

  // Generate public embed URL (no API key required)
  const publicEmbedUrl = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15865.334057833227!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sid!4v${Date.now()}`;

  return (
    <div className="w-full h-96 rounded-2xl overflow-hidden shadow-lg bg-gray-100">
      <iframe
        src={publicEmbedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Lokasi Sekolah"
        onError={() => {
          console.warn("Google Maps embed failed, showing fallback");
        }}
      />
    </div>
  );
}

// Contact Info Cards Component
function ContactInfoCards({ contactInfo }: { contactInfo: ContactInfo }) {
  const contactCards = [
    {
      icon: MapPin,
      title: "Alamat",
      content: contactInfo.school_address,
      color: "text-blue-600 bg-blue-50",
    },
    {
      icon: Phone,
      title: "Telepon",
      content: contactInfo.school_phone,
      color: "text-green-600 bg-green-50",
      link: `tel:${contactInfo.school_phone.replace(/[^\d+]/g, "")}`,
    },
    {
      icon: Mail,
      title: "Email",
      content: contactInfo.school_email,
      color: "text-purple-600 bg-purple-50",
      link: `mailto:${contactInfo.school_email}`,
    },
    {
      icon: Clock,
      title: "Jam Operasional",
      content: contactInfo.office_hours,
      color: "text-orange-600 bg-orange-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {contactCards.map((card, index) => {
        const IconComponent = card.icon;
        const CardContent = (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-start">
              <div className={`p-3 rounded-lg ${card.color} mr-4`}>
                <IconComponent size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{card.content}</p>
              </div>
            </div>
          </div>
        );

        if (card.link) {
          return (
            <a key={index} href={card.link} className="block">
              {CardContent}
            </a>
          );
        }

        return <div key={index}>{CardContent}</div>;
      })}
    </div>
  );
}

// Departments Component
function DepartmentsList({ departments }: { departments: Department[] }) {
  const departmentIcons = {
    "Tata Usaha": Building2,
    Kesiswaan: Users,
    Kurikulum: GraduationCap,
    Perpustakaan: BookOpen,
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Kontak Departemen
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {departments.map((dept, index) => {
          const IconComponent =
            departmentIcons[dept.name as keyof typeof departmentIcons] ||
            Building2;

          return (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 hover:border-theme-primary transition-colors"
            >
              <div className="flex items-center mb-3">
                <div className="p-2 bg-theme-primary/10 rounded-lg mr-3">
                  <IconComponent className="text-theme-primary" size={20} />
                </div>
                <h3 className="font-semibold text-gray-900">{dept.name}</h3>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Phone size={14} className="mr-2" />
                  <a
                    href={`tel:${dept.phone.replace(/[^\d+]/g, "")}`}
                    className="hover:text-theme-primary"
                  >
                    {dept.phone}
                  </a>
                </div>
                <div className="flex items-center">
                  <Mail size={14} className="mr-2" />
                  <a
                    href={`mailto:${dept.email}`}
                    className="hover:text-theme-primary"
                  >
                    {dept.email}
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Main Contact Page Component
export default function ContactPage() {
  const { contactInfo, loading, error } = useContactInfo();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="animate-spin h-12 w-12 text-theme-primary mx-auto mb-4" />
            <p className="text-gray-500">Memuat informasi kontak...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !contactInfo) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16 flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-gray-500">
              {error || "Gagal memuat informasi kontak"}
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-theme-primary to-theme-secondary relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 border border-white/20 rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 border border-white/20 rounded-full"></div>
            <div className="absolute top-1/3 right-1/3 w-32 h-32 border border-white/20 rounded-full"></div>
          </div>

          <div className="relative z-10 container-custom">
            <div className="text-center text-white">
              <span className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                Hubungi Kami
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Kontak & Lokasi
              </h1>
              <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-8">
                Kami siap membantu menjawab pertanyaan Anda seputar{" "}
                {contactInfo.school_name}
              </p>

              {/* Quick Contact Buttons */}
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={`tel:${contactInfo.school_phone.replace(
                    /[^\d+]/g,
                    ""
                  )}`}
                  className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full hover:bg-white/30 transition-colors flex items-center"
                >
                  <Phone size={18} className="mr-2" />
                  Telepon
                </a>
                <a
                  href={`mailto:${contactInfo.school_email}`}
                  className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full hover:bg-white/30 transition-colors flex items-center"
                >
                  <Mail size={18} className="mr-2" />
                  Email
                </a>
                {contactInfo.whatsapp && (
                  <a
                    href={`https://wa.me/${contactInfo.whatsapp.replace(
                      /[^\d]/g,
                      ""
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500/80 backdrop-blur-sm text-white px-6 py-3 rounded-full hover:bg-green-500 transition-colors flex items-center"
                  >
                    <MessageSquare size={18} className="mr-2" />
                    WhatsApp
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information Cards */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Informasi Kontak
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Berikut adalah informasi kontak lengkap sekolah kami
              </p>
            </div>

            <ContactInfoCards contactInfo={contactInfo} />
          </div>
        </section>

        {/* Maps & Contact Form */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Google Maps */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Lokasi Sekolah
                </h2>
                <GoogleMaps
                  latitude={contactInfo.maps_latitude}
                  longitude={contactInfo.maps_longitude}
                  embedUrl={contactInfo.maps_embed_url}
                />

                <div className="mt-6 text-center">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${contactInfo.maps_latitude},${contactInfo.maps_longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-theme-primary text-white px-6 py-3 rounded-lg hover:bg-theme-secondary transition-colors"
                  >
                    <MapPin className="mr-2" size={18} />
                    Buka di Google Maps
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* Departments */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <DepartmentsList departments={contactInfo.departments} />
          </div>
        </section>

        {/* Social Media & Additional Info */}
        <section className="py-16">
          <div className="container-custom">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Ikuti Kami
              </h2>
              <p className="text-gray-600 mb-8">
                Dapatkan update terbaru tentang kegiatan sekolah melalui media
                sosial kami
              </p>

              <div className="flex justify-center space-x-4">
                {contactInfo.instagram && (
                  <a
                    href={`https://instagram.com/${contactInfo.instagram.replace(
                      "@",
                      ""
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-full hover:shadow-lg transition-all"
                  >
                    <Instagram size={24} />
                  </a>
                )}

                {contactInfo.facebook && (
                  <a
                    href={`https://facebook.com/${contactInfo.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white p-4 rounded-full hover:shadow-lg transition-all"
                  >
                    <Facebook size={24} />
                  </a>
                )}

                {contactInfo.school_website && (
                  <a
                    href={`https://${contactInfo.school_website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 text-white p-4 rounded-full hover:shadow-lg transition-all"
                  >
                    <Globe size={24} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
