"use client";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/lib/ThemeProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Quote,
  Target,
  Heart,
  Award,
  Laptop,
  Wifi,
  BookOpen,
  Microscope,
  Wrench,
  Palette,
  GraduationCap,
  CheckCircle,
} from "lucide-react";

// Mock data - akan diganti dengan API calls
const principalMessage = {
  name: "Dr. Ahmad Syahrial, M.Pd.",
  position: "Kepala Sekolah SMK Nusantara Tech",
  // Using picsum.photos - more reliable than Unsplash
  image: "https://picsum.photos/400/400?random=1",
  message:
    "Selamat datang di SMK Nusantara Tech, sebuah institusi pendidikan yang berkomitmen untuk menghasilkan lulusan yang tidak hanya kompeten secara teknis, tetapi juga berkarakter mulia. Dengan visi menjadi sekolah teknologi terdepan, kami terus berinovasi dalam metode pembelajaran dan pengembangan kurikulum yang selaras dengan kebutuhan industri 4.0. Mari bersama-sama kita wujudkan generasi digital Indonesia yang unggul, kreatif, dan berintegritas tinggi.",
  achievements: [
    "15+ tahun pengalaman di bidang pendidikan",
    "Meraih penghargaan Kepala Sekolah Terbaik 2023",
    "Lulusan S3 Teknologi Pendidikan",
  ],
};

const visionMission = {
  vision:
    "Menjadi Sekolah Menengah Kejuruan terdepan dalam teknologi informasi dan komunikasi yang menghasilkan lulusan berkarakter, kompeten, dan siap bersaing di era digital global.",
  mission: [
    "Menyelenggarakan pendidikan kejuruan berbasis teknologi terkini dengan standar internasional",
    "Mengembangkan kurikulum yang responsif terhadap kebutuhan industri dan perkembangan teknologi",
    "Membangun karakter siswa yang berintegritas, kreatif, dan memiliki jiwa entrepreneurship",
    "Menjalin kerjasama strategis dengan industri, universitas, dan lembaga pendidikan internasional",
    "Menciptakan lingkungan belajar yang kondusif dengan fasilitas dan teknologi pembelajaran modern",
  ],
  values: [
    {
      title: "INTEGRITY",
      description: "Kejujuran dan konsistensi dalam setiap tindakan",
    },
    {
      title: "INNOVATION",
      description: "Kreativitas dan adaptasi terhadap perkembangan teknologi",
    },
    {
      title: "COLLABORATION",
      description: "Kerjasama dan komunikasi yang efektif",
    },
    {
      title: "EXCELLENCE",
      description: "Keunggulan dalam setiap hasil karya dan prestasi",
    },
  ],
  motto: "Excellence in Technology, Character in Life",
};

const facilities = [
  {
    name: "Laboratorium Komputer",
    description:
      "Lab komputer modern dengan 40 unit PC terbaru, koneksi internet high-speed, dan software programming terkini.",
    image: "https://picsum.photos/400/250?random=2",
    icon: Laptop,
    specs: [
      "40 Unit PC Core i5",
      "Software Development Tools",
      "High-Speed Internet",
    ],
  },
  {
    name: "Lab Jaringan & Server",
    description:
      "Fasilitas lengkap untuk pembelajaran administrasi jaringan, konfigurasi server, dan cybersecurity.",
    image: "https://picsum.photos/400/250?random=3",
    icon: Wifi,
    specs: ["Cisco Equipment", "Server Rack", "Network Simulator"],
  },
  {
    name: "Perpustakaan Digital",
    description:
      "Perpustakaan modern dengan koleksi buku digital, jurnal teknologi, dan ruang baca yang nyaman.",
    image: "https://picsum.photos/400/250?random=4",
    icon: BookOpen,
    specs: ["5000+ E-Books", "Digital Library System", "Study Area"],
  },
  {
    name: "Lab Multimedia",
    description:
      "Studio produksi konten dengan peralatan editing video, audio recording, dan desain grafis profesional.",
    image: "https://picsum.photos/400/250?random=5",
    icon: Palette,
    specs: ["Video Editing Suite", "Audio Studio", "Graphics Workstation"],
  },
  {
    name: "Workshop Teknik",
    description:
      "Bengkel lengkap untuk praktik hardware, maintenance komputer, dan assembly sistem.",
    image: "https://picsum.photos/400/250?random=6",
    icon: Wrench,
    specs: ["Hardware Tools", "Component Testing", "Assembly Station"],
  },
  {
    name: "Laboratorium Robotika",
    description:
      "Lab modern untuk pengembangan robotika, IoT, dan artificial intelligence dengan equipment terdepan.",
    image: "https://picsum.photos/400/250?random=7",
    icon: Microscope,
    specs: ["Arduino & Raspberry Pi", "IoT Sensors", "AI Development Kit"],
  },
];

const staff = [
  {
    name: "Ir. Budi Prasetyo, M.T.",
    position: "Wakil Kepala Sekolah Kurikulum",
    specialization: "Sistem Informasi & Manajemen Data",
    image: "https://picsum.photos/200/200?random=8",
    experience: "12 tahun",
    education: "S2 Teknik Informatika ITB",
  },
  {
    name: "Dra. Siti Nurhaliza, M.Pd.",
    position: "Wakil Kepala Sekolah Kesiswaan",
    specialization: "Pengembangan Karakter & Leadership",
    image: "https://picsum.photos/200/200?random=9",
    experience: "10 tahun",
    education: "S2 Manajemen Pendidikan",
  },
  {
    name: "Ahmad Fauzi, S.Kom., M.T.",
    position: "Ketua Jurusan TKJ",
    specialization: "Network Security & Cloud Computing",
    image: "https://picsum.photos/200/200?random=10",
    experience: "8 tahun",
    education: "S2 Teknik Komputer",
  },
  {
    name: "Maya Anggraini, S.T., M.Kom.",
    position: "Ketua Jurusan RPL",
    specialization: "Software Engineering & Mobile Development",
    image: "https://picsum.photos/200/200?random=11",
    experience: "7 tahun",
    education: "S2 Ilmu Komputer",
  },
  {
    name: "Rian Hidayat, S.Sn., M.Ds.",
    position: "Ketua Jurusan Multimedia",
    specialization: "Digital Design & Content Creation",
    image: "https://picsum.photos/200/200?random=12",
    experience: "6 tahun",
    education: "S2 Desain Komunikasi Visual",
  },
  {
    name: "Dr. Lisa Permata, M.Pd.",
    position: "Koordinator Bimbingan Konseling",
    specialization: "Psikologi Pendidikan & Career Counseling",
    image: "https://picsum.photos/200/200?random=13",
    experience: "9 tahun",
    education: "S3 Psikologi Pendidikan",
  },
];

export default function AboutPage() {
  // Removed unused 'school' variable from destructuring

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-16">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-theme-primary to-theme-secondary text-white py-16">
          <div className="container-custom">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Tentang Kami
              </h1>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Mengenal lebih dekat SMK Nusantara Tech - institusi pendidikan
                teknologi terdepan di Indonesia
              </p>
            </div>
          </div>
        </section>

        {/* Sambutan Kepala Sekolah */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Sambutan Kepala Sekolah
              </h2>
              <div className="w-24 h-1 bg-theme-primary mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="relative">
                  <Quote
                    size={48}
                    className="text-theme-primary/20 absolute -top-4 -left-4"
                  />
                  <blockquote className="text-lg leading-relaxed text-gray-700 italic mb-6 pl-8">
                    {principalMessage.message}
                  </blockquote>
                </div>

                <div className="border-l-4 border-theme-primary pl-6 mb-6">
                  <h3 className="font-bold text-xl text-gray-800">
                    {principalMessage.name}
                  </h3>
                  <p className="text-theme-primary font-semibold">
                    {principalMessage.position}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Pencapaian & Kualifikasi:
                  </h4>
                  <ul className="space-y-2">
                    {principalMessage.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle
                          size={16}
                          className="text-green-500 mr-2 mt-1 flex-shrink-0"
                        />
                        <span className="text-gray-600">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="relative">
                  <div className="w-80 h-80 mx-auto relative">
                    <Image
                      src={principalMessage.image}
                      alt={principalMessage.name}
                      fill
                      className="rounded-full object-cover shadow-2xl"
                    />
                    <div className="absolute inset-0 rounded-full ring-4 ring-theme-primary/20"></div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-theme-primary text-white p-4 rounded-full">
                    <GraduationCap size={32} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visi, Misi & Nilai */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Visi & Misi */}
              <div>
                <div className="mb-12">
                  <div className="flex items-center mb-6">
                    <div className="bg-theme-primary p-3 rounded-full mr-4">
                      <Target size={24} className="text-white" />
                    </div>
                    <h2 className="text-3xl font-bold">Visi Kami</h2>
                  </div>
                  <div className="pl-16">
                    <p className="text-lg text-gray-700 leading-relaxed text-justify">
                      {visionMission.vision}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-6">
                    <div className="bg-theme-secondary p-3 rounded-full mr-4">
                      <Award size={24} className="text-white" />
                    </div>
                    <h2 className="text-3xl font-bold">Misi Kami</h2>
                  </div>
                  <div className="pl-16">
                    <ul className="space-y-4">
                      {visionMission.mission.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-3 h-3 bg-theme-primary rounded-full mr-4 mt-2 flex-shrink-0"></div>
                          <p className="text-gray-700 leading-relaxed">
                            {item}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Values & Motto */}
              <div>
                <div className="mb-12">
                  <div className="flex items-center mb-6">
                    <div className="bg-theme-accent p-3 rounded-full mr-4">
                      <Heart size={24} className="text-white" />
                    </div>
                    <h2 className="text-3xl font-bold">Nilai-Nilai Kami</h2>
                  </div>
                  <div className="space-y-6">
                    {visionMission.values.map((value, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-theme-primary pl-6"
                      >
                        <h3 className="font-bold text-xl text-theme-primary mb-2">
                          {value.title}
                        </h3>
                        <p className="text-gray-600">{value.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-theme-primary to-theme-secondary p-8 rounded-xl text-center text-white">
                  <h3 className="text-2xl font-bold mb-4">Motto Kami</h3>
                  <p className="text-3xl font-bold italic">
                    &ldquo;{visionMission.motto}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fasilitas */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Fasilitas Unggulan
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Fasilitas pembelajaran modern dan lengkap untuk mendukung
                pengembangan kompetensi siswa di bidang teknologi
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {facilities.map((facility, index) => {
                const IconComponent = facility.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden group"
                  >
                    <div className="relative h-48">
                      <Image
                        src={facility.image}
                        alt={facility.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      <div className="absolute top-4 left-4 bg-theme-primary text-white p-2 rounded-full">
                        <IconComponent size={20} />
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-bold text-xl mb-3">
                        {facility.name}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {facility.description}
                      </p>

                      <div>
                        <h4 className="font-semibold text-sm text-gray-800 mb-2">
                          Spesifikasi:
                        </h4>
                        <div className="space-y-1">
                          {facility.specs.map((spec, idx) => (
                            <div
                              key={idx}
                              className="flex items-center text-xs text-gray-600"
                            >
                              <CheckCircle
                                size={12}
                                className="text-green-500 mr-2 flex-shrink-0"
                              />
                              {spec}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Guru & Staff */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Tim Pengajar & Staff
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Tenaga pengajar profesional dan berpengalaman yang berkomitmen
                menghasilkan lulusan terbaik
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {staff.map((person, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>

                  <h3 className="font-bold text-lg mb-1">{person.name}</h3>
                  <p className="text-theme-primary font-semibold mb-2">
                    {person.position}
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    {person.specialization}
                  </p>

                  <div className="space-y-1 text-xs text-gray-500">
                    <div className="flex items-center justify-center">
                      <Award size={12} className="mr-1" />
                      {person.experience} pengalaman
                    </div>
                    <div className="flex items-center justify-center">
                      <GraduationCap size={12} className="mr-1" />
                      {person.education}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
