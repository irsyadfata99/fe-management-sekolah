"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Plus, Edit, Trash2, Eye, EyeOff, Star, StarOff, ChevronLeft, ChevronRight, Filter } from "lucide-react";

interface Article {
  id: number;
  judul: string;
  slug: string;
  konten_singkat: string;
  gambar_utama: string;
  kategori_id: number;
  nama_kategori: string;
  slug_kategori: string;
  warna_kategori: string;
  penulis: string;
  is_published: number;
  is_featured: number;
  tanggal_publish: string;
  views: number;
  created_at: string;
  updated_at: string;
}

interface Category {
  id: number;
  nama_kategori: string;
  slug: string;
  warna: string;
}

export default function ArticlesPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [publishFilter, setPublishFilter] = useState("");
  const [featuredFilter, setFeaturedFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const [deleteModal, setDeleteModal] = useState<{
    show: boolean;
    id: number | null;
    judul: string;
  }>({ show: false, id: null, judul: "" });

  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, [currentPage, searchTerm, selectedCategory, publishFilter, featuredFilter]);

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

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
      });

      if (searchTerm) params.append("search", searchTerm);
      if (selectedCategory) params.append("kategori", selectedCategory);
      if (publishFilter) params.append("is_published", publishFilter);
      if (featuredFilter) params.append("is_featured", featuredFilter);

      const response = await fetch(`http://localhost:5000/api/admin/articles?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch articles");

      const data = await response.json();
      setArticles(data.data);
      setTotalPages(data.pagination.total_pages);
      setTotalArticles(data.pagination.total_articles);
    } catch (error) {
      console.error("Fetch articles error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (id: number, currentStatus: number) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/admin/articles/${id}/publish`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ is_published: currentStatus === 0 ? 1 : 0 }),
      });

      if (!response.ok) throw new Error("Failed to toggle publish");

      fetchArticles();
    } catch (error) {
      console.error("Toggle publish error:", error);
      alert("Gagal mengubah status publish artikel");
    }
  };

  const handleToggleFeatured = async (id: number, currentStatus: number) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/admin/articles/${id}/feature`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ is_featured: currentStatus === 0 ? 1 : 0 }),
      });

      if (!response.ok) throw new Error("Failed to toggle featured");

      fetchArticles();
    } catch (error) {
      console.error("Toggle featured error:", error);
      alert("Gagal mengubah status featured artikel");
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.id) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/admin/articles/${deleteModal.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete article");

      setDeleteModal({ show: false, id: null, judul: "" });
      fetchArticles();
    } catch (error) {
      console.error("Delete article error:", error);
      alert("Gagal menghapus artikel");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Manajemen Artikel</h1>
        <p className="text-gray-600">Kelola artikel dan konten website sekolah</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <p className="text-sm text-gray-600">Total Artikel</p>
          <p className="text-2xl font-bold text-gray-800">{totalArticles}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <p className="text-sm text-gray-600">Published</p>
          <p className="text-2xl font-bold text-gray-800">{articles.filter((a) => a.is_published === 1).length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
          <p className="text-sm text-gray-600">Draft</p>
          <p className="text-2xl font-bold text-gray-800">{articles.filter((a) => a.is_published === 0).length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-purple-500">
          <p className="text-sm text-gray-600">Featured</p>
          <p className="text-2xl font-bold text-gray-800">{articles.filter((a) => a.is_featured === 1).length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari artikel..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Semua Kategori</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nama_kategori}
              </option>
            ))}
          </select>

          {/* Publish Filter */}
          <select
            value={publishFilter}
            onChange={(e) => {
              setPublishFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Semua Status</option>
            <option value="1">Published</option>
            <option value="0">Draft</option>
          </select>

          {/* Featured Filter */}
          <select
            value={featuredFilter}
            onChange={(e) => {
              setFeaturedFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Featured Status</option>
            <option value="1">Featured</option>
            <option value="0">Not Featured</option>
          </select>
        </div>

        <div className="mt-4">
          <Link href="/admin/articles/create" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-5 h-5 mr-2" />
            Tambah Artikel
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Artikel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Penulis</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                  </td>
                </tr>
              ) : articles.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    Tidak ada artikel ditemukan
                  </td>
                </tr>
              ) : (
                articles.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {article.gambar_utama && <img src={`http://localhost:5000${article.gambar_utama}`} alt={article.judul} className="w-16 h-16 object-cover rounded mr-3" />}
                        <div>
                          <div className="text-sm font-medium text-gray-900">{article.judul}</div>
                          <div className="text-sm text-gray-500">{article.konten_singkat?.substring(0, 60)}...</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {article.nama_kategori && (
                        <span
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: `${article.warna_kategori}20`,
                            color: article.warna_kategori,
                          }}
                        >
                          {article.nama_kategori}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{article.penulis || "-"}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col space-y-1">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${article.is_published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                          {article.is_published ? "Published" : "Draft"}
                        </span>
                        {article.is_featured === 1 && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{article.views || 0}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{formatDate(article.created_at)}</td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex space-x-2">
                        <button onClick={() => handleTogglePublish(article.id, article.is_published)} className="text-blue-600 hover:text-blue-900" title={article.is_published ? "Unpublish" : "Publish"}>
                          {article.is_published ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                        <button onClick={() => handleToggleFeatured(article.id, article.is_featured)} className="text-yellow-600 hover:text-yellow-900" title={article.is_featured ? "Unfeature" : "Feature"}>
                          {article.is_featured ? <Star className="w-5 h-5 fill-current" /> : <StarOff className="w-5 h-5" />}
                        </button>
                        <Link href={`/admin/articles/edit/${article.id}`} className="text-indigo-600 hover:text-indigo-900">
                          <Edit className="w-5 h-5" />
                        </Link>
                        <button
                          onClick={() =>
                            setDeleteModal({
                              show: true,
                              id: article.id,
                              judul: article.judul,
                            })
                          }
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Halaman <span className="font-medium">{currentPage}</span> dari <span className="font-medium">{totalPages}</span>
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Konfirmasi Hapus</h3>
            <p className="text-gray-600 mb-6">
              Apakah Anda yakin ingin menghapus artikel "<span className="font-semibold">{deleteModal.judul}</span>"? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex justify-end space-x-3">
              <button onClick={() => setDeleteModal({ show: false, id: null, judul: "" })} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                Batal
              </button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
