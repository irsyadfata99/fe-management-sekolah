"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/lib/ThemeProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import api from "@/lib/api";
import {
  User,
  School,
  Users,
  Upload,
  CheckCircle,
  AlertCircle,
  Loader2,
  Download,
  GraduationCap,
  Send,
  CreditCard,
} from "lucide-react";

// Types matching backend structure
interface SchoolInfo {
  school_name: string;
  school_address: string;
  school_phone: string;
  school_email: string;
  school_website: string;
  school_logo: string;
  primary_color: string;
  secondary_color: string;
  registration_status: string;
  academic_year: string;
  contact_person: string;
  contact_whatsapp: string;
}

interface Jurusan {
  id: number;
  nama_jurusan: string;
  kode_jurusan: string;
  deskripsi: string;
  kuota_siswa: number;
}

interface PaymentOption {
  id: number;
  nama_pembayaran: string;
  jumlah_pembayaran: number;
  uang_pendaftaran: number;
  total_pembayaran: number;
  description: string;
  is_recommended: boolean;
}

interface FormConfig {
  jurusan: Jurusan[];
  payment_options: PaymentOption[];
  form_structure: Record<string, unknown>;
}

interface FormData {
  // Data Pribadi
  nisn: string;
  nama_lengkap: string;
  nomor_whatsapp_aktif: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jenis_kelamin: string;
  golongan_darah: string;
  agama: string;
  status_sekarang: string;
  alamat_siswa: string;

  // Latar Belakang Sekolah
  asal_sekolah: string;
  alamat_sekolah: string;
  tahun_lulus: string;

  // Data Orang Tua
  nama_orang_tua: string;
  nomor_whatsapp_ortu: string;
  pendidikan_orang_tua: string;
  pekerjaan_orang_tua: string;
  instansi_orang_tua: string;
  penghasilan_orang_tua: string;
  alamat_orang_tua: string;

  // Pilihan
  pilihan_jurusan_id: string;
  pilihan_pembayaran_id: string;
}

interface FileData {
  bukti_pembayaran: File | null;
  ijazah: File | null;
  akta_kelahiran: File | null;
  kartu_keluarga: File | null;
  pas_foto: File | null;
  surat_keterangan_lulus: File | null;
}

interface ApiErrorResponse {
  message: string;
  success: boolean;
}

interface SubmitResult {
  success: boolean;
  data: {
    no_pendaftaran: string;
    pin_login: string;
    nama_lengkap: string;
    pilihan_jurusan: string;
    jenis_pembayaran: string;
    total_pembayaran: number;
    download_pdf_url: string;
  };
}

// Utility function for Indonesian currency formatting
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Hooks
function useSchoolInfo() {
  const [schoolInfo, setSchoolInfo] = useState<SchoolInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchoolInfo = async () => {
      try {
        const response = await api.get("/api/spmb/school-info");
        if (response.data.success) {
          setSchoolInfo(response.data.data);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Gagal memuat informasi sekolah";
        setError(errorMessage);
        console.error("School info fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchoolInfo();
  }, []);

  return { schoolInfo, loading, error };
}

function useFormConfig() {
  const [formConfig, setFormConfig] = useState<FormConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFormConfig = async () => {
      try {
        const response = await api.get("/api/spmb/form-config");
        if (response.data.success) {
          setFormConfig(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        const apiError = err as { response?: { data?: ApiErrorResponse } };
        const errorMessage =
          apiError.response?.data?.message || "Gagal memuat konfigurasi form";
        setError(errorMessage);
        console.error("Form config fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFormConfig();
  }, []);

  return { formConfig, loading, error };
}

// Components
function FileUpload({
  label,
  accept,
  required,
  file,
  onChange,
  error,
}: {
  label: string;
  accept: string;
  required: boolean;
  file: File | null;
  onChange: (file: File | null) => void;
  error?: string;
}) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    onChange(selectedFile);
  };

  const getAcceptText = () => {
    if (accept.includes("image") && accept.includes(".pdf")) {
      return "JPG, PNG, PDF (Max 5MB)";
    } else if (accept.includes("image")) {
      return "JPG, PNG (Max 5MB)";
    } else {
      return "PDF (Max 5MB)";
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="flex items-center space-x-4">
        <label className="cursor-pointer">
          <div
            className={`
            border-2 border-dashed rounded-lg p-4 text-center transition-colors
            ${
              file
                ? "border-green-300 bg-green-50"
                : "border-gray-300 hover:border-gray-400"
            }
            ${error ? "border-red-300 bg-red-50" : ""}
          `}
          >
            <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600">
              {file ? file.name : "Klik untuk upload file"}
            </p>
            <p className="text-xs text-gray-500 mt-1">{getAcceptText()}</p>
          </div>
          <input
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {file && (
          <button
            onClick={() => onChange(null)}
            className="text-red-500 text-sm hover:text-red-700"
          >
            Hapus
          </button>
        )}
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

function PaymentOptionCard({
  option,
  selected,
  onSelect,
}: {
  option: PaymentOption;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      className={`
        border-2 rounded-lg p-4 cursor-pointer transition-all
        ${
          selected
            ? "border-theme-primary bg-blue-50"
            : "border-gray-200 hover:border-gray-300"
        }
        ${option.is_recommended ? "ring-2 ring-yellow-200" : ""}
      `}
      onClick={onSelect}
    >
      {option.is_recommended && (
        <div className="bg-yellow-400 text-yellow-900 text-xs font-medium px-2 py-1 rounded-full inline-block mb-2">
          Direkomendasikan
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">
            {option.nama_pembayaran}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{option.description}</p>

          <div className="mt-3 space-y-1">
            <div className="flex justify-between text-sm">
              <span>Biaya Program:</span>
              <span>{formatCurrency(option.jumlah_pembayaran)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Uang Pendaftaran:</span>
              <span>{formatCurrency(option.uang_pendaftaran)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-2">
              <span>Total:</span>
              <span>{formatCurrency(option.total_pembayaran)}</span>
            </div>
          </div>
        </div>

        <div className="ml-4">
          <input
            type="radio"
            checked={selected}
            onChange={() => {}}
            className="h-4 w-4 text-theme-primary"
          />
        </div>
      </div>
    </div>
  );
}

// Main Registration Form Component
export default function SPMBRegistrationPage() {
  const { schoolInfo, loading: schoolLoading } = useSchoolInfo();
  const {
    formConfig,
    loading: configLoading,
    error: configError,
  } = useFormConfig();

  const [formData, setFormData] = useState<FormData>({
    nisn: "",
    nama_lengkap: "",
    nomor_whatsapp_aktif: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    jenis_kelamin: "",
    golongan_darah: "",
    agama: "",
    status_sekarang: "",
    alamat_siswa: "",
    asal_sekolah: "",
    alamat_sekolah: "",
    tahun_lulus: "",
    nama_orang_tua: "",
    nomor_whatsapp_ortu: "",
    pendidikan_orang_tua: "",
    pekerjaan_orang_tua: "",
    instansi_orang_tua: "",
    penghasilan_orang_tua: "",
    alamat_orang_tua: "",
    pilihan_jurusan_id: "",
    pilihan_pembayaran_id: "",
  });

  const [fileData, setFileData] = useState<FileData>({
    bukti_pembayaran: null,
    ijazah: null,
    akta_kelahiran: null,
    kartu_keluarga: null,
    pas_foto: null,
    surat_keterangan_lulus: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<SubmitResult | null>(null);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleFileChange = (field: keyof FileData, file: File | null) => {
    setFileData((prev) => ({ ...prev, [field]: file }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Data Pribadi
    if (!formData.nama_lengkap)
      newErrors.nama_lengkap = "Nama lengkap harus diisi";
    if (!formData.nomor_whatsapp_aktif)
      newErrors.nomor_whatsapp_aktif = "Nomor WhatsApp harus diisi";
    if (!formData.tempat_lahir)
      newErrors.tempat_lahir = "Tempat lahir harus diisi";
    if (!formData.tanggal_lahir)
      newErrors.tanggal_lahir = "Tanggal lahir harus diisi";
    if (!formData.jenis_kelamin)
      newErrors.jenis_kelamin = "Jenis kelamin harus dipilih";
    if (!formData.agama) newErrors.agama = "Agama harus dipilih";
    if (!formData.alamat_siswa) newErrors.alamat_siswa = "Alamat harus diisi";

    // Latar Belakang Sekolah
    if (!formData.asal_sekolah)
      newErrors.asal_sekolah = "Asal sekolah harus diisi";
    if (!formData.tahun_lulus)
      newErrors.tahun_lulus = "Tahun lulus harus diisi";

    // Data Orang Tua
    if (!formData.nama_orang_tua)
      newErrors.nama_orang_tua = "Nama orang tua harus diisi";
    if (!formData.pekerjaan_orang_tua)
      newErrors.pekerjaan_orang_tua = "Pekerjaan orang tua harus diisi";

    // Pilihan
    if (!formData.pilihan_jurusan_id)
      newErrors.pilihan_jurusan_id = "Pilihan jurusan harus dipilih";
    if (!formData.pilihan_pembayaran_id)
      newErrors.pilihan_pembayaran_id = "Jenis pembayaran harus dipilih";

    // Upload Dokumen
    if (!fileData.bukti_pembayaran)
      newErrors.bukti_pembayaran = "Bukti pembayaran harus diupload";
    if (!fileData.akta_kelahiran)
      newErrors.akta_kelahiran = "Akta kelahiran harus diupload";
    if (!fileData.kartu_keluarga)
      newErrors.kartu_keluarga = "Kartu keluarga harus diupload";
    if (!fileData.pas_foto) newErrors.pas_foto = "Pas foto harus diupload";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to first error
      const firstErrorElement = document.querySelector(".border-red-500");
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      return;
    }

    setIsSubmitting(true);
    try {
      const formDataToSubmit = new FormData();

      // Add form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value) formDataToSubmit.append(key, value);
      });

      // Add files
      Object.entries(fileData).forEach(([key, file]) => {
        if (file) formDataToSubmit.append(key, file);
      });

      const response = await api.post("/api/spmb/register", formDataToSubmit, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        setSubmitResult(response.data as SubmitResult);
      }
    } catch (err) {
      const apiError = err as { response?: { data?: ApiErrorResponse } };
      const errorMessage =
        apiError.response?.data?.message || "Gagal mendaftar";
      setErrors({ submit: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (schoolLoading || configLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="animate-spin h-12 w-12 text-theme-primary mx-auto mb-4" />
            <p className="text-gray-500">Memuat formulir pendaftaran...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (configError) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16 flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Pendaftaran Tidak Tersedia
            </h2>
            <p className="text-gray-500 max-w-md">{configError}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Show success result
  if (submitResult) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16">
          <section className="py-12">
            <div className="container mx-auto max-w-4xl px-4">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 text-center">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Pendaftaran Berhasil!
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Terima kasih telah mendaftar di {schoolInfo?.school_name}
                </p>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                  <h3 className="font-semibold text-green-900 mb-4">
                    Informasi Pendaftaran Anda:
                  </h3>
                  <div className="space-y-2 text-left">
                    <div className="flex justify-between">
                      <span>Nomor Pendaftaran:</span>
                      <span className="font-mono font-bold">
                        {submitResult.data.no_pendaftaran}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>PIN:</span>
                      <span className="font-mono font-bold">
                        {submitResult.data.pin_login}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Nama:</span>
                      <span className="font-semibold">
                        {submitResult.data.nama_lengkap}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Jurusan:</span>
                      <span>{submitResult.data.pilihan_jurusan}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Jenis Pembayaran:</span>
                      <span>{submitResult.data.jenis_pembayaran}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Pembayaran:</span>
                      <span className="font-bold">
                        {formatCurrency(submitResult.data.total_pembayaran)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <a
                    href={submitResult.data.download_pdf_url}
                    className="inline-flex items-center bg-theme-primary text-white px-6 py-3 rounded-lg hover:bg-theme-secondary transition-colors"
                  >
                    <Download className="mr-2" size={20} />
                    Download Bukti Pendaftaran PDF
                  </a>

                  <div className="text-sm text-gray-600">
                    <p className="mb-2">
                      Simpan nomor pendaftaran dan PIN untuk mengecek status.
                    </p>
                    <p>
                      Hubungi {schoolInfo?.contact_person} di{" "}
                      {schoolInfo?.contact_whatsapp} jika ada pertanyaan.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
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
        <section className="py-12 bg-gradient-to-br from-theme-primary to-theme-secondary text-white">
          <div className="container-custom">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Pendaftaran Siswa Baru
              </h1>
              <p className="text-xl opacity-90 mb-6">
                {schoolInfo?.school_name} - Tahun Ajaran{" "}
                {schoolInfo?.academic_year}
              </p>
            </div>
          </div>
        </section>

        {/* Registration Form */}
        <section className="py-12">
          <div className="container mx-auto max-w-6xl px-4">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Data Pribadi */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
                <div className="flex items-center mb-6">
                  <User className="text-theme-primary mr-3" size={24} />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Data Pribadi
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      NISN (opsional)
                    </label>
                    <input
                      type="text"
                      value={formData.nisn}
                      onChange={(e) =>
                        handleInputChange("nisn", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-transparent"
                      placeholder="Nomor Induk Siswa Nasional"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      value={formData.nama_lengkap}
                      onChange={(e) =>
                        handleInputChange("nama_lengkap", e.target.value)
                      }
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-transparent ${
                        errors.nama_lengkap
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Nama lengkap sesuai ijazah"
                    />
                    {errors.nama_lengkap && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.nama_lengkap}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nomor WhatsApp Aktif *
                    </label>
                    <input
                      type="tel"
                      value={formData.nomor_whatsapp_aktif}
                      onChange={(e) =>
                        handleInputChange(
                          "nomor_whatsapp_aktif",
                          e.target.value
                        )
                      }
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-transparent ${
                        errors.nomor_whatsapp_aktif
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="08XXXXXXXXXX"
                    />
                    {errors.nomor_whatsapp_aktif && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.nomor_whatsapp_aktif}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tempat Lahir *
                    </label>
                    <input
                      type="text"
                      value={formData.tempat_lahir}
                      onChange={(e) =>
                        handleInputChange("tempat_lahir", e.target.value)
                      }
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-transparent ${
                        errors.tempat_lahir
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Kota tempat lahir"
                    />
                    {errors.tempat_lahir && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.tempat_lahir}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tanggal Lahir *
                    </label>
                    <input
                      type="date"
                      value={formData.tanggal_lahir}
                      onChange={(e) =>
                        handleInputChange("tanggal_lahir", e.target.value)
                      }
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-transparent ${
                        errors.tanggal_lahir
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.tanggal_lahir && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.tanggal_lahir}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Jenis Kelamin *
                    </label>
                    <select
                      value={formData.jenis_kelamin}
                      onChange={(e) =>
                        handleInputChange("jenis_kelamin", e.target.value)
                      }
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-transparent ${
                        errors.jenis_kelamin
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      <option value="">Pilih jenis kelamin</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                    {errors.jenis_kelamin && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.jenis_kelamin}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Golongan Darah (opsional)
                    </label>
                    <select
                      value={formData.golongan_darah}
                      onChange={(e) =>
                        handleInputChange("golongan_darah", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-transparent"
                    >
                      <option value="">Pilih golongan darah</option>
                      <option value="O">O</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="AB">AB</option>
                      <option value="Tidak Tahu">Tidak Tahu</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Agama *
                    </label>
                    <select
                      value={formData.agama}
                      onChange={(e) =>
                        handleInputChange("agama", e.target.value)
                      }
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-transparent ${
                        errors.agama ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Pilih agama</option>
                      <option value="Islam">Islam</option>
                      <option value="Kristen">Kristen</option>
                      <option value="Katolik">Katolik</option>
                      <option value="Hindu">Hindu</option>
                      <option value="Buddha">Buddha</option>
                      <option value="Konghucu">Konghucu</option>
                    </select>
                    {errors.agama && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.agama}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status Sekarang (opsional)
                    </label>
                    <select
                      value={formData.status_sekarang}
                      onChange={(e) =>
                        handleInputChange("status_sekarang", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-transparent"
                    >
                      <option value="">Pilih status</option>
                      <option value="Ikut orang tua">Ikut orang tua</option>
                      <option value="Kost">Kost</option>
                      <option value="Rumah sendiri">Rumah sendiri</option>
                      <option value="Ikut saudara">Ikut saudara</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alamat Siswa *
                    </label>
                    <textarea
                      value={formData.alamat_siswa}
                      onChange={(e) =>
                        handleInputChange("alamat_siswa", e.target.value)
                      }
                      rows={3}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-transparent resize-none ${
                        errors.alamat_siswa
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Alamat lengkap tempat tinggal"
                    />
                    {errors.alamat_siswa && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.alamat_siswa}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Latar Belakang Sekolah */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
                <div className="flex items-center mb-6">
                  <School className="text-theme-primary mr-3" size={24} />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Latar Belakang Sekolah
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Asal Sekolah *
                    </label>
                    <input
                      type="text"
                      value={formData.asal_sekolah}
                      onChange={(e) =>
                        handleInputChange("asal_sekolah", e.target.value)
                      }
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-transparent ${
                        errors.asal_sekolah
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Nama sekolah asal"
                    />
                    {errors.asal_sekolah && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.asal_sekolah}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tahun Lulus *
                    </label>
                    <input
                      type="number"
                      value={formData.tahun_lulus}
                      onChange={(e) =>
                        handleInputChange("tahun_lulus", e.target.value)
                      }
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-transparent ${
                        errors.tahun_lulus
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="2024"
                      min="2020"
                      max="2025"
                    />
                    {errors.tahun_lulus && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.tahun_lulus}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alamat Sekolah (opsional)
                    </label>
                    <textarea
                      value={formData.alamat_sekolah}
                      onChange={(e) =>
                        handleInputChange("alamat_sekolah", e.target.value)
                      }
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-transparent resize-none"
                      placeholder="Alamat lengkap sekolah asal"
                    />
                  </div>
                </div>
              </div>

              {/* Data Orang Tua */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
                <div className="flex items-center mb-6">
                  <Users className="text-theme-primary mr-3" size={24} />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Data Orang Tua
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Orang Tua/Wali *
                    </label>
                    <input
                      type="text"
                      value={formData.nama_orang_tua}
                      onChange={(e) =>
                        handleInputChange("nama_orang_tua", e.target.value)
                      }
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-transparent ${
                        errors.nama_orang_tua
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Nama lengkap orang tua/wali"
                    />
                    {errors.nama_orang_tua && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.nama_orang_tua}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nomor WhatsApp Orang Tua (opsional)
                    </label>
                    <input
                      type="tel"
                      value={formData.nomor_whatsapp_ortu}
                      onChange={(e) =>
                        handleInputChange("nomor_whatsapp_ortu", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-transparent"
                      placeholder="08XXXXXXXXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pendidikan Orang Tua (opsional)
                    </label>
                    <input
                      type="text"
                      value={formData.pendidikan_orang_tua}
                      onChange={(e) =>
                        handleInputChange(
                          "pendidikan_orang_tua",
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-transparent"
                      placeholder="S1, SMA, dll"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pekerjaan Orang Tua *
                    </label>
                    <input
                      type="text"
                      value={formData.pekerjaan_orang_tua}
                      onChange={(e) =>
                        handleInputChange("pekerjaan_orang_tua", e.target.value)
                      }
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-transparent ${
                        errors.pekerjaan_orang_tua
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Pekerjaan orang tua"
                    />
                    {errors.pekerjaan_orang_tua && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.pekerjaan_orang_tua}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Instansi/Perusahaan (opsional)
                    </label>
                    <input
                      type="text"
                      value={formData.instansi_orang_tua}
                      onChange={(e) =>
                        handleInputChange("instansi_orang_tua", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-transparent"
                      placeholder="Nama tempat kerja"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Penghasilan Orang Tua (opsional)
                    </label>
                    <select
                      value={formData.penghasilan_orang_tua}
                      onChange={(e) =>
                        handleInputChange(
                          "penghasilan_orang_tua",
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-transparent"
                    >
                      <option value="">Pilih range penghasilan</option>
                      <option value="0 S.D 1.000.000">0 S.D 1.000.000</option>
                      <option value="1.000.000 S.D 2.000.000">
                        1.000.000 S.D 2.000.000
                      </option>
                      <option value="2.000.000 S.D 5.000.000">
                        2.000.000 S.D 5.000.000
                      </option>
                      <option value="5.000.000 ke atas">
                        5.000.000 ke atas
                      </option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alamat Orang Tua (opsional)
                    </label>
                    <textarea
                      value={formData.alamat_orang_tua}
                      onChange={(e) =>
                        handleInputChange("alamat_orang_tua", e.target.value)
                      }
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-transparent resize-none"
                      placeholder="Alamat lengkap orang tua (jika berbeda dengan alamat siswa)"
                    />
                  </div>
                </div>
              </div>

              {/* Pilihan Jurusan */}
              {formConfig && (
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center mb-6">
                    <GraduationCap
                      className="text-theme-primary mr-3"
                      size={24}
                    />
                    <h2 className="text-2xl font-bold text-gray-900">
                      Pilihan Jurusan
                    </h2>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pilihan Jurusan *
                    </label>
                    <select
                      value={formData.pilihan_jurusan_id}
                      onChange={(e) =>
                        handleInputChange("pilihan_jurusan_id", e.target.value)
                      }
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-transparent ${
                        errors.pilihan_jurusan_id
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      <option value="">Pilih Jurusan</option>
                      {formConfig.jurusan.map((jurusan) => (
                        <option key={jurusan.id} value={jurusan.id.toString()}>
                          {jurusan.nama_jurusan} ({jurusan.kode_jurusan}) -
                          Kuota: {jurusan.kuota_siswa}
                        </option>
                      ))}
                    </select>
                    {errors.pilihan_jurusan_id && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.pilihan_jurusan_id}
                      </p>
                    )}

                    {formData.pilihan_jurusan_id && (
                      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        {(() => {
                          const selectedJurusan = formConfig.jurusan.find(
                            (j) =>
                              j.id.toString() === formData.pilihan_jurusan_id
                          );
                          return selectedJurusan ? (
                            <div>
                              <h4 className="font-semibold text-blue-900">
                                {selectedJurusan.nama_jurusan}
                              </h4>
                              <p className="text-sm text-blue-800 mt-1">
                                {selectedJurusan.deskripsi}
                              </p>
                              <p className="text-sm text-blue-700 mt-2">
                                <strong>Kuota:</strong>{" "}
                                {selectedJurusan.kuota_siswa} siswa
                              </p>
                            </div>
                          ) : null;
                        })()}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Pilihan Pembayaran */}
              {formConfig && (
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
                  <div className="flex items-center mb-6">
                    <CreditCard className="text-theme-primary mr-3" size={24} />
                    <h2 className="text-2xl font-bold text-gray-900">
                      Pilihan Pembayaran
                    </h2>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Jenis Pembayaran *
                    </label>
                    <div className="grid grid-cols-1 gap-4">
                      {formConfig.payment_options.map((option) => (
                        <PaymentOptionCard
                          key={option.id}
                          option={option}
                          selected={
                            formData.pilihan_pembayaran_id ===
                            option.id.toString()
                          }
                          onSelect={() =>
                            handleInputChange(
                              "pilihan_pembayaran_id",
                              option.id.toString()
                            )
                          }
                        />
                      ))}
                    </div>
                    {errors.pilihan_pembayaran_id && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.pilihan_pembayaran_id}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Upload Dokumen */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
                <div className="flex items-center mb-6">
                  <Upload className="text-theme-primary mr-3" size={24} />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Upload Dokumen
                  </h2>
                </div>

                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">
                      Petunjuk Upload Dokumen:
                    </h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>
                        • Dokumen bisa dalam format PDF atau gambar (JPG/PNG)
                        untuk bukti pembayaran
                      </li>
                      <li>• Untuk dokumen resmi lainnya, gunakan format PDF</li>
                      <li>• Ukuran maksimal file 5MB</li>
                      <li>• Pastikan dokumen terbaca dengan jelas</li>
                      <li>
                        • Dokumen yang wajib upload ditandai dengan tanda *
                      </li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FileUpload
                      label="Bukti Pembayaran"
                      accept=".pdf,.jpg,.jpeg,.png"
                      required={true}
                      file={fileData.bukti_pembayaran}
                      onChange={(file) =>
                        handleFileChange("bukti_pembayaran", file)
                      }
                      error={errors.bukti_pembayaran}
                    />

                    <FileUpload
                      label="Akta Kelahiran"
                      accept=".pdf"
                      required={true}
                      file={fileData.akta_kelahiran}
                      onChange={(file) =>
                        handleFileChange("akta_kelahiran", file)
                      }
                      error={errors.akta_kelahiran}
                    />

                    <FileUpload
                      label="Kartu Keluarga"
                      accept=".pdf"
                      required={true}
                      file={fileData.kartu_keluarga}
                      onChange={(file) =>
                        handleFileChange("kartu_keluarga", file)
                      }
                      error={errors.kartu_keluarga}
                    />

                    <FileUpload
                      label="Pas Foto"
                      accept=".jpg,.jpeg,.png"
                      required={true}
                      file={fileData.pas_foto}
                      onChange={(file) => handleFileChange("pas_foto", file)}
                      error={errors.pas_foto}
                    />

                    <FileUpload
                      label="Ijazah/STTB (opsional)"
                      accept=".pdf"
                      required={false}
                      file={fileData.ijazah}
                      onChange={(file) => handleFileChange("ijazah", file)}
                    />

                    <FileUpload
                      label="Surat Keterangan Lulus (opsional)"
                      accept=".pdf"
                      required={false}
                      file={fileData.surat_keterangan_lulus}
                      onChange={(file) =>
                        handleFileChange("surat_keterangan_lulus", file)
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
                {errors.submit && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-red-800">{errors.submit}</p>
                  </div>
                )}

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center px-8 py-4 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin mr-3" size={24} />
                        Mengirim Pendaftaran...
                      </>
                    ) : (
                      <>
                        <Send className="mr-3" size={24} />
                        Kirim Pendaftaran
                      </>
                    )}
                  </button>

                  <p className="text-sm text-gray-600 mt-4">
                    Pastikan semua data yang diisi sudah benar sebelum mengirim
                    pendaftaran.
                  </p>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
