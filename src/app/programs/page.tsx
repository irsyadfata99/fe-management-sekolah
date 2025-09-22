"use client";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Code,
  Network,
  Palette,
  Users,
  Trophy,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Camera,
  Music,
  Dumbbell,
  Globe,
  Lightbulb,
  Target,
  UserCheck,
  Calendar,
  Award,
  Wrench,
} from "lucide-react";

// Mock data - akan diganti dengan API calls
const studyPrograms = [
  {
    id: "tkj",
    code: "TKJ",
    name: "Teknik Komputer dan Jaringan",
    shortDesc:
      "Instalasi, konfigurasi, dan maintenance sistem komputer serta jaringan.",
    image: "https://picsum.photos/400/250?random=20",
    icon: Network,
    duration: "3 Tahun",
    capacity: "32 Siswa",
    keySkills: ["Network Admin", "System Admin", "Cybersecurity"],
    careerHighlight: "Network Engineer",
  },
  {
    id: "rpl",
    code: "RPL",
    name: "Rekayasa Perangkat Lunak",
    shortDesc:
      "Pengembangan software, aplikasi web, mobile app, dan sistem informasi.",
    image: "https://picsum.photos/400/250?random=21",
    icon: Code,
    duration: "3 Tahun",
    capacity: "32 Siswa",
    keySkills: ["Web Development", "Mobile Apps", "Database"],
    careerHighlight: "Software Developer",
  },
  {
    id: "multimedia",
    code: "MM",
    name: "Multimedia",
    shortDesc:
      "Produksi konten digital, desain grafis, video editing, dan animasi.",
    image: "https://picsum.photos/400/250?random=22",
    icon: Palette,
    duration: "3 Tahun",
    capacity: "32 Siswa",
    keySkills: ["Graphic Design", "Video Editing", "3D Animation"],
    careerHighlight: "Content Creator",
  },
  {
    id: "tkro",
    code: "TKRO",
    name: "Teknik Kendaraan Ringan Otomotif",
    shortDesc:
      "Perawatan, perbaikan, dan modifikasi kendaraan bermotor roda empat.",
    image: "https://picsum.photos/400/250?random=23",
    icon: Wrench,
    duration: "3 Tahun",
    capacity: "28 Siswa",
    keySkills: ["Engine Repair", "Auto Electric", "Diagnostic"],
    careerHighlight: "Automotive Technician",
  },
  {
    id: "tsm",
    code: "TSM",
    name: "Teknik Sepeda Motor",
    shortDesc:
      "Perawatan, perbaikan, dan tune-up sepeda motor dan kendaraan roda dua.",
    image: "https://picsum.photos/400/250?random=24",
    icon: Dumbbell,
    duration: "3 Tahun",
    capacity: "28 Siswa",
    keySkills: ["Motor Repair", "Injection System", "Bodywork"],
    careerHighlight: "Motorcycle Technician",
  },
  {
    id: "akl",
    code: "AKL",
    name: "Akuntansi dan Keuangan Lembaga",
    shortDesc:
      "Pengelolaan keuangan, akuntansi, dan administrasi keuangan lembaga.",
    image: "https://picsum.photos/400/250?random=25",
    icon: BookOpen,
    duration: "3 Tahun",
    capacity: "36 Siswa",
    keySkills: ["Financial Analysis", "Tax Management", "Auditing"],
    careerHighlight: "Financial Analyst",
  },
  {
    id: "otkp",
    code: "OTKP",
    name: "Otomatisasi dan Tata Kelola Perkantoran",
    shortDesc: "Manajemen perkantoran modern dengan teknologi otomatisasi.",
    image: "https://picsum.photos/400/250?random=26",
    icon: Users,
    duration: "3 Tahun",
    capacity: "36 Siswa",
    keySkills: ["Office Management", "Digital Archive", "Admin System"],
    careerHighlight: "Office Manager",
  },
  {
    id: "bdp",
    code: "BDP",
    name: "Bisnis Daring dan Pemasaran",
    shortDesc: "E-commerce, digital marketing, dan manajemen bisnis online.",
    image: "https://picsum.photos/400/250?random=27",
    icon: Globe,
    duration: "3 Tahun",
    capacity: "32 Siswa",
    keySkills: ["Digital Marketing", "E-commerce", "Social Media"],
    careerHighlight: "Digital Marketer",
  },
];

const extracurriculars = [
  {
    name: "Robotika",
    description:
      "Klub untuk mengembangkan kemampuan dalam bidang robotika, IoT, dan artificial intelligence.",
    image: "https://picsum.photos/300/200?random=30",
    icon: Lightbulb,
    category: "STEM",
    achievements: [
      "Juara 1 Kompetisi Robotika Nasional 2023",
      "Best Innovation Award",
    ],
    activities: ["Workshop Programming", "Kompetisi Robotika", "Project IoT"],
  },
  {
    name: "Programming Club",
    description:
      "Komunitas programmer yang fokus pada pengembangan software dan competitive programming.",
    image: "https://picsum.photos/300/200?random=31",
    icon: Code,
    category: "Technology",
    achievements: ["Juara 2 Olimpiade Informatika", "Best Team Hackathon 2023"],
    activities: ["Coding Competition", "Software Development", "Tech Talks"],
  },
  {
    name: "Multimedia Production",
    description:
      "Klub yang mengembangkan kemampuan produksi konten video, fotografi, dan desain grafis.",
    image: "https://picsum.photos/300/200?random=32",
    icon: Camera,
    category: "Creative",
    achievements: ["Best Short Film Festival", "Photography Contest Winner"],
    activities: ["Film Making", "Photography Workshop", "Content Creation"],
  },
  {
    name: "English Club",
    description:
      "Klub untuk meningkatkan kemampuan bahasa Inggris dan komunikasi internasional.",
    image: "https://picsum.photos/300/200?random=33",
    icon: Globe,
    category: "Language",
    achievements: [
      "English Speech Contest Champion",
      "International Exchange Program",
    ],
    activities: ["English Debate", "Speech Contest", "Cultural Exchange"],
  },
  {
    name: "Musik & Band",
    description:
      "Wadah untuk mengembangkan bakat musik dan seni pertunjukan siswa.",
    image: "https://picsum.photos/300/200?random=34",
    icon: Music,
    category: "Arts",
    achievements: [
      "Best Performance School Festival",
      "Regional Band Competition",
    ],
    activities: ["Band Practice", "Music Recording", "Live Performance"],
  },
  {
    name: "Olahraga & Fitness",
    description:
      "Klub olahraga yang membina kesehatan fisik dan mental siswa melalui berbagai cabang olahraga.",
    image: "https://picsum.photos/300/200?random=35",
    icon: Dumbbell,
    category: "Sports",
    achievements: ["Juara Futsal Antar SMK", "Best Team Basketball"],
    activities: ["Futsal Training", "Basketball", "Fitness Program"],
  },
];

const osisStructure = [
  {
    position: "Ketua OSIS",
    name: "Ahmad Rizki Pratama",
    class: "XII TKJ 1",
    image: "https://picsum.photos/150/150?random=40",
    responsibilities: [
      "Memimpin organisasi siswa",
      "Koordinasi dengan pihak sekolah",
      "Representasi siswa",
    ],
  },
  {
    position: "Wakil Ketua OSIS",
    name: "Sari Dewi Lestari",
    class: "XII RPL 2",
    image: "https://picsum.photos/150/150?random=41",
    responsibilities: [
      "Membantu ketua OSIS",
      "Koordinasi internal",
      "Backup leadership",
    ],
  },
  {
    position: "Sekretaris",
    name: "Budi Santoso",
    class: "XII MM 1",
    image: "https://picsum.photos/150/150?random=42",
    responsibilities: [
      "Administrasi organisasi",
      "Notulen rapat",
      "Surat menyurat",
    ],
  },
  {
    position: "Bendahara",
    name: "Maya Putri Indah",
    class: "XI TKJ 2",
    image: "https://picsum.photos/150/150?random=43",
    responsibilities: [
      "Pengelolaan keuangan",
      "Laporan keuangan",
      "Budgeting kegiatan",
    ],
  },
  {
    position: "Koordinator Akademik",
    name: "Faris Rahman",
    class: "XI RPL 1",
    image: "https://picsum.photos/150/150?random=44",
    responsibilities: [
      "Program akademik siswa",
      "Kompetisi & olimpiade",
      "Study group",
    ],
  },
  {
    position: "Koordinator Non-Akademik",
    name: "Lina Safitri",
    class: "XI MM 2",
    image: "https://picsum.photos/150/150?random=45",
    responsibilities: [
      "Event & festival",
      "Ekstrakurikuler",
      "Kegiatan sosial",
    ],
  },
];

const osisPrograms = [
  {
    title: "Tech Festival",
    description:
      "Festival tahunan yang menampilkan karya-karya teknologi siswa dari berbagai jurusan.",
    image: "https://picsum.photos/400/250?random=50",
    date: "Oktober 2024",
    participants: "500+ siswa",
  },
  {
    title: "Student Leadership Camp",
    description:
      "Program pengembangan kepemimpinan untuk pengurus OSIS dan ketua kelas.",
    image: "https://picsum.photos/400/250?random=51",
    date: "Agustus 2024",
    participants: "100+ siswa",
  },
  {
    title: "Social Impact Project",
    description:
      "Program pengabdian masyarakat dan pengembangan aplikasi untuk membantu UMKM lokal.",
    image: "https://picsum.photos/400/250?random=52",
    date: "Sepanjang Tahun",
    participants: "200+ siswa",
  },
];

export default function ProgramsPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-16">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-theme-primary to-theme-secondary text-white py-16">
          <div className="container-custom">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Program Studi
              </h1>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Pilihan jurusan berkualitas dengan kurikulum industri 4.0,
                didukung ekstrakurikuler dan organisasi siswa yang aktif
              </p>
            </div>
          </div>
        </section>

        {/* Study Programs Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Jurusan & Kompetensi Keahlian
              </h2>
              <div className="w-24 h-1 bg-theme-primary mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Delapan program studi unggulan dengan fokus teknologi, otomotif,
                dan bisnis digital
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {studyPrograms.map((program) => {
                const IconComponent = program.icon;

                return (
                  <div
                    key={program.id}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden border hover:border-theme-primary/30 group"
                  >
                    {/* Image Section */}
                    <div className="relative h-40">
                      <Image
                        src={program.image}
                        alt={program.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      <div className="absolute top-3 left-3 bg-theme-primary text-white p-2 rounded-full">
                        <IconComponent size={16} />
                      </div>
                      <div className="absolute top-3 right-3 bg-white/95 text-theme-primary px-2 py-1 rounded-full font-bold text-sm">
                        {program.code}
                      </div>
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>

                    {/* Content Section */}
                    <div className="p-5">
                      <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-theme-primary transition-colors duration-200">
                        {program.name}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {program.shortDesc}
                      </p>

                      {/* Program Info */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-gray-50 p-2 rounded-lg text-center">
                          <div className="flex items-center justify-center mb-1">
                            <Calendar
                              size={12}
                              className="text-theme-primary mr-1"
                            />
                            <span className="font-medium text-gray-800 text-xs">
                              Durasi
                            </span>
                          </div>
                          <p className="text-gray-600 text-xs">
                            {program.duration}
                          </p>
                        </div>
                        <div className="bg-gray-50 p-2 rounded-lg text-center">
                          <div className="flex items-center justify-center mb-1">
                            <Users
                              size={12}
                              className="text-theme-primary mr-1"
                            />
                            <span className="font-medium text-gray-800 text-xs">
                              Kapasitas
                            </span>
                          </div>
                          <p className="text-gray-600 text-xs">
                            {program.capacity}
                          </p>
                        </div>
                      </div>

                      {/* Key Skills */}
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-800 mb-2 text-xs flex items-center">
                          <Target
                            size={12}
                            className="text-theme-primary mr-1"
                          />
                          Keahlian Utama:
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {program.keySkills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="bg-theme-primary/10 text-theme-primary px-2 py-1 rounded text-xs font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Career Highlight */}
                      <div className="mb-4">
                        <div className="flex items-center mb-2">
                          <Award
                            size={12}
                            className="text-theme-primary mr-1"
                          />
                          <span className="font-medium text-gray-800 text-xs">
                            Prospek Karir Utama:
                          </span>
                        </div>
                        <span className="bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                          {program.careerHighlight}
                        </span>
                      </div>

                      {/* Action Button */}
                      <Link
                        href={`/programs/${program.id}`}
                        className="w-full inline-flex items-center justify-center bg-theme-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-theme-secondary transition-colors duration-200 text-sm"
                      >
                        Lihat Detail
                        <ArrowRight size={14} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Additional Info */}
            <div className="mt-12 text-center">
              <div className="bg-theme-primary/5 rounded-xl p-8 max-w-4xl mx-auto">
                <h3 className="text-xl font-bold text-theme-primary mb-4">
                  Keunggulan Program Studi Kami
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                  <div className="flex items-start">
                    <CheckCircle
                      size={16}
                      className="text-green-500 mr-2 mt-1 flex-shrink-0"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        Kurikulum Industry 4.0
                      </h4>
                      <p className="text-gray-600">
                        Materi pembelajaran yang selalu update dengan kebutuhan
                        industri terkini
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle
                      size={16}
                      className="text-green-500 mr-2 mt-1 flex-shrink-0"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        Praktik Industri
                      </h4>
                      <p className="text-gray-600">
                        Program magang dan kerja sama dengan perusahaan
                        terkemuka
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle
                      size={16}
                      className="text-green-500 mr-2 mt-1 flex-shrink-0"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        Sertifikasi Profesi
                      </h4>
                      <p className="text-gray-600">
                        Siswa dapat memperoleh sertifikat kompetensi yang diakui
                        industri
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Extracurricular Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ekstrakurikuler
              </h2>
              <div className="w-24 h-1 bg-theme-primary mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Beragam kegiatan ekstrakurikuler untuk mengembangkan bakat,
                minat, dan soft skills siswa
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {extracurriculars.map((activity, index) => {
                const IconComponent = activity.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden"
                  >
                    <div className="relative h-48">
                      <Image
                        src={activity.image}
                        alt={activity.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-theme-primary text-white p-2 rounded-full">
                        <IconComponent size={16} />
                      </div>
                      <div className="absolute top-4 right-4 bg-white/90 text-theme-primary px-2 py-1 rounded-full text-xs font-medium">
                        {activity.category}
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-bold text-xl mb-3">
                        {activity.name}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {activity.description}
                      </p>

                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                          Prestasi:
                        </h4>
                        <div className="space-y-1">
                          {activity.achievements.map((achievement, idx) => (
                            <div key={idx} className="flex items-start">
                              <Trophy
                                size={12}
                                className="text-yellow-500 mr-2 mt-1 flex-shrink-0"
                              />
                              <span className="text-gray-600 text-xs">
                                {achievement}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                          Aktivitas:
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {activity.activities.map((act, idx) => (
                            <span
                              key={idx}
                              className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                            >
                              {act}
                            </span>
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

        {/* OSIS Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Organisasi Siswa Intra Sekolah (OSIS)
              </h2>
              <div className="w-24 h-1 bg-theme-primary mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Wadah pengembangan kepemimpinan dan organisasi bagi siswa SMK
                Nusantara Tech
              </p>
            </div>

            {/* OSIS Structure */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-center mb-8">
                Struktur Pengurus OSIS
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {osisStructure.map((member, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <h4 className="font-bold text-lg mb-1">{member.name}</h4>
                    <p className="text-theme-primary font-semibold mb-1">
                      {member.position}
                    </p>
                    <p className="text-gray-500 text-sm mb-3">{member.class}</p>

                    <div>
                      <h5 className="font-medium text-gray-800 mb-2 text-sm">
                        Tanggung Jawab:
                      </h5>
                      <div className="space-y-1">
                        {member.responsibilities.map((resp, idx) => (
                          <div
                            key={idx}
                            className="flex items-start justify-center"
                          >
                            <UserCheck
                              size={10}
                              className="text-theme-primary mr-1 mt-1 flex-shrink-0"
                            />
                            <span className="text-gray-600 text-xs text-left">
                              {resp}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* OSIS Programs */}
            <div>
              <h3 className="text-2xl font-bold text-center mb-8">
                Program Kerja OSIS
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {osisPrograms.map((program, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden border"
                  >
                    <div className="relative h-48">
                      <Image
                        src={program.image}
                        alt={program.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="p-6">
                      <h4 className="font-bold text-xl mb-3">
                        {program.title}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {program.description}
                      </p>

                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center text-gray-500">
                          <Calendar size={14} className="mr-1" />
                          {program.date}
                        </div>
                        <div className="flex items-center text-gray-500">
                          <Users size={14} className="mr-1" />
                          {program.participants}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
