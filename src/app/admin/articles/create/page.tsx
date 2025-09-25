"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Upload, X } from "lucide-react";
import TipTapEditor from "@/components/TipTapEditor";

interface Category {
  id: number;
  nama_kategori: string;
  slug: string;
}

export default function CreateArticlePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    judul: "",
    slug: "",
    konten_singkat: "",
    konten_lengkap: "",
    gambar_utama: "",
    kategori_id: "",
    penulis: "",
    is_published: false,
    tanggal_publish: "",
    is_featured: false,
    meta_description: "",
    tags: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/admin/articles/manage/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch categories");

      const result = await response.json();
      if (result.success) {
        setCategories(result.data.categories);
      }
    } catch (error) {
      console.error("Fetch categories error:", error);
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleJudulChange = (value: string) => {
    setFormData({
      ...formData,
      judul: value,
      slug: generateSlug(value),
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("File harus berupa gambar");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran file maksimal 5MB");
      return;
    }

    try {
      setUploadingImage(true);
      const token = localStorage.getItem("token");

      const uploadFormData = new FormData();
      uploadFormData.append("image", file);

      const response = await fetch("http://localhost:5000/api/admin/articles/upload-image", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: uploadFormData,
      });

      if (!response.ok) throw new Error("Failed to upload image");

      const result = await response.json();

      setFormData({
        ...formData,
        gambar_utama: result.data.url,
      });
      setImagePreview(`http://localhost:5000${result.data.url}`);
    } catch (error) {
      console.error("Upload image error:", error);
      alert("Gagal upload gambar");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, gambar_utama: "" });
    setImagePreview("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.judul.trim()) {
      alert("Judul artikel harus diisi");
      return;
    }

    if (!formData.slug.trim()) {
      alert("Slug artikel harus diisi");
      return;
    }

    if (!formData.konten_lengkap.trim()) {
      alert("Konten lengkap harus diisi");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/admin/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          kategori_id: formData.kategori_id ? parseInt(formData.kategori_id) : null,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create article");
      }

      alert("Artikel berhasil dibuat!");
      router.push("/admin/articles");
    } catch (error: any) {
      console.error("Create article error:", error);
      alert(error.message || "Gagal membuat artikel");
    } finally {
      setLoading(false);
    }
  };

  const quillModules = {
    toolbar: [[{ header: [1, 2, 3, 4, 5, 6, false] }], ["bold", "italic", "underline", "strike"], [{ list: "ordered" }, { list: "bullet" }], [{ align: [] }], ["link", "image"], ["clean"]],
  };

  const quillFormats = ["header", "bold", "italic", "underline", "strike", "list", "bullet", "align", "link", "image"];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center">
        <Link href="/admin/articles" className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Buat Artikel Baru</h1>
          <p className="text-gray-600">Tambahkan artikel baru untuk website</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Judul */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Judul Artikel *</label>
              <input
                type="text"
                value={formData.judul}
                onChange={(e) => handleJudulChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan judul artikel"
                required
              />
            </div>

            {/* Slug */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="artikel-slug"
                required
              />
              <p className="text-sm text-gray-500 mt-1">URL: /articles/{formData.slug || "artikel-slug"}</p>
            </div>

            {/* Konten Singkat */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Konten Singkat</label>
              <textarea
                value={formData.konten_singkat}
                onChange={(e) => setFormData({ ...formData, konten_singkat: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ringkasan artikel (untuk preview)"
              />
            </div>

            {/* Konten Lengkap */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Konten Lengkap *</label>
              <TipTapEditor content={formData.konten_lengkap} onChange={(value) => setFormData({ ...formData, konten_lengkap: value })} placeholder="Mulai menulis konten artikel..." />
            </div>

            {/* Meta Description */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description (SEO)</label>
              <textarea
                value={formData.meta_description}
                onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                rows={2}
                maxLength={160}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Deskripsi untuk search engine (maksimal 160 karakter)"
              />
              <p className="text-sm text-gray-500 mt-1">{formData.meta_description.length}/160 karakter</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Pengaturan Publikasi</h3>

              {/* Kategori */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                <select
                  value={formData.kategori_id}
                  onChange={(e) => setFormData({ ...formData, kategori_id: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Pilih Kategori</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nama_kategori}
                    </option>
                  ))}
                </select>
              </div>

              {/* Penulis */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Penulis</label>
                <input
                  type="text"
                  value={formData.penulis}
                  onChange={(e) => setFormData({ ...formData, penulis: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nama penulis"
                />
              </div>

              {/* Tags */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="pendidikan, teknologi, sains"
                />
                <p className="text-sm text-gray-500 mt-1">Pisahkan dengan koma</p>
              </div>

              {/* Tanggal Publish */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Publish</label>
                <input
                  type="date"
                  value={formData.tanggal_publish}
                  onChange={(e) => setFormData({ ...formData, tanggal_publish: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Checkboxes */}
              <div className="space-y-3">
                <label className="flex items-center">
                  <input type="checkbox" checked={formData.is_published} onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-gray-700">Publish artikel</span>
                </label>

                <label className="flex items-center">
                  <input type="checkbox" checked={formData.is_featured} onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-gray-700">Jadikan artikel unggulan</span>
                </label>
              </div>
            </div>

            {/* Gambar Utama */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Gambar Utama</h3>

              {imagePreview ? (
                <div className="relative">
                  <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                  <button type="button" onClick={handleRemoveImage} className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">{uploadingImage ? "Uploading..." : "Upload gambar"}</p>
                  <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} className="hidden" id="image-upload" />
                  <label htmlFor="image-upload" className="mt-2 inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                    Pilih File
                  </label>
                  <p className="mt-1 text-xs text-gray-500">PNG, JPG, WEBP up to 5MB</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <button type="submit" disabled={loading} className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
                {loading ? "Menyimpan..." : "Simpan Artikel"}
              </button>
              <Link href="/admin/articles" className="block w-full text-center px-4 py-2 mt-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                Batal
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
