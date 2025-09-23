// ============================================================================
// BERITA/ARTICLES PAGE - src/app/news/page.tsx
// Fully integrated with backend API, responsive design
// ============================================================================

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "@/lib/ThemeProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import api from "@/lib/api";
import { Calendar as CalendarIcon, User, Tag, Search, Filter, Grid3X3, List, ChevronLeft, ChevronRight, X, Eye, Clock, Share2, Star, RefreshCw } from "lucide-react";

// Types - Sesuai dengan database structure yang sebenarnya
interface Article {
  id: number;
  judul: string;
  slug: string;
  konten_singkat?: string;
  konten_lengkap: string;
  gambar_utama?: string;
  kategori_id?: number;
  nama_kategori?: string; // From JOIN with categories table
  slug_kategori?: string; // From JOIN with categories table
  warna_kategori?: string; // From JOIN with categories table
  penulis?: string;
  is_published: number | boolean; // tinyint(1) - 0 or 1, converted to boolean
  tanggal_publish?: string;
  is_featured: number | boolean; // tinyint(1) - 0 or 1, converted to boolean
  meta_description?: string;
  tags?: string[] | string;
  views: number;
  created_at: string;
  updated_at: string;
}

interface Category {
  id: number;
  nama_kategori: string;
  slug: string;
  deskripsi?: string;
  warna: string;
  total_artikel: number;
}

interface ArticleFilters {
  search: string;
  kategori: string;
  featured: string;
  sort: "latest" | "popular" | "oldest";
}

interface PaginationMeta {
  current_page: number;
  total_pages: number;
  total_articles: number;
  per_page: number;
  has_next: boolean;
  has_prev: boolean;
}

// Articles Hook
function useArticlesData() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);

  const fetchArticles = async (filters?: Partial<ArticleFilters>, page: number = 1, limit: number = 9) => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams();
      queryParams.append("page", page.toString());
      queryParams.append("limit", limit.toString());

      if (filters?.search) queryParams.append("search", filters.search);
      if (filters?.kategori) queryParams.append("kategori", filters.kategori);
      if (filters?.featured) queryParams.append("featured", filters.featured);
      if (filters?.sort) {
        switch (filters.sort) {
          case "latest":
            queryParams.append("sort", "tanggal_publish");
            queryParams.append("order", "desc");
            break;
          case "popular":
            queryParams.append("sort", "views");
            queryParams.append("order", "desc");
            break;
          case "oldest":
            queryParams.append("sort", "tanggal_publish");
            queryParams.append("order", "asc");
            break;
        }
      }

      console.log("🔍 Making API call to:", `/api/public/articles?${queryParams.toString()}`);
      const response = await api.get(`/api/public/articles?${queryParams.toString()}`);

      console.log("🔍 API Response:", response.data);

      if (response.data.success && Array.isArray(response.data.data)) {
        setArticles(response.data.data);
        if (response.data.pagination) {
          setPagination(response.data.pagination);
        }
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error: unknown) {
      console.error("❌ Articles API Error:", error);
      const errorMessage = error instanceof Error ? error.message : (error as { response?: { data?: { message?: string } } })?.response?.data?.message || "Gagal memuat artikel";
      setError(errorMessage);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get("/api/public/articles/categories");
      if (response.data.success && response.data.data?.categories) {
        setCategories(response.data.data.categories);
      }
    } catch (error) {
      console.warn("Categories API not ready:", error);
    }
  };

  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  return {
    articles,
    categories,
    loading,
    error,
    pagination,
    refetch: fetchArticles,
  };
}

// Article Filters Component
function ArticleFilters({ filters, categories, onFilterChange, onReset }: { filters: ArticleFilters; categories: Category[]; onFilterChange: (filters: ArticleFilters) => void; onReset: () => void }) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Filter size={20} className="text-theme-primary mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Filter Berita</h3>
        </div>
        <button onClick={onReset} className="text-sm text-gray-500 hover:text-theme-primary transition-colors flex items-center gap-1">
          <RefreshCw size={14} />
          Reset Filter
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari berita..."
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-primary/20 focus:border-theme-primary"
          />
        </div>

        {/* Category */}
        <select
          value={filters.kategori}
          onChange={(e) => onFilterChange({ ...filters, kategori: e.target.value })}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-primary/20 focus:border-theme-primary"
        >
          <option value="">Semua Kategori</option>
          {categories.map((category) => (
            <option key={category.id} value={category.slug}>
              {category.nama_kategori} ({category.total_artikel})
            </option>
          ))}
        </select>

        {/* Featured */}
        <select
          value={filters.featured}
          onChange={(e) => onFilterChange({ ...filters, featured: e.target.value })}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-primary/20 focus:border-theme-primary"
        >
          <option value="">Semua Berita</option>
          <option value="1">Berita Utama</option>
          <option value="0">Berita Biasa</option>
        </select>

        {/* Sort */}
        <select
          value={filters.sort}
          onChange={(e) => onFilterChange({ ...filters, sort: e.target.value as "latest" | "popular" | "oldest" })}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-primary/20 focus:border-theme-primary"
        >
          <option value="latest">Terbaru</option>
          <option value="popular">Terpopuler</option>
          <option value="oldest">Terlama</option>
        </select>
      </div>
    </div>
  );
}

// Article Card Component
function ArticleCard({ article, isGrid }: { article: Article; isGrid: boolean }) {
  const [showDetails, setShowDetails] = useState(false);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const truncateText = (text: string, limit: number) => {
    if (text.length <= limit) return text;
    return text.substring(0, limit) + "...";
  };

  // Process tags - handle both string and array
  const processTags = (tags: string[] | string | undefined) => {
    if (!tags) return [];
    if (Array.isArray(tags)) return tags;
    if (typeof tags === "string") {
      return tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
    }
    return [];
  };

  if (!isGrid) {
    // List View
    return (
      <>
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-200 cursor-pointer group">
          <div className="flex gap-6">
            {/* Image */}
            <div className="w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden">
              <Image src={article.gambar_utama || "/images/default-article.jpg"} alt={article.judul} width={200} height={130} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {article.nama_kategori && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: article.warna_kategori || "#3B82F6" }}>
                    <Tag size={10} className="mr-1" />
                    {article.nama_kategori}
                  </span>
                )}
                {article.is_featured && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <Star size={10} className="mr-1" />
                    Featured
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-gray-900 group-hover:text-theme-primary transition-colors mb-2 line-clamp-2">{article.judul}</h3>

              <p className="text-gray-600 mb-3 line-clamp-2">{article.konten_singkat || article.konten_lengkap.substring(0, 150) + "..."}</p>

              <div className="flex items-center text-sm text-gray-500 space-x-4">
                <div className="flex items-center">
                  <User size={14} className="mr-1" />
                  {article.penulis || "Admin"}
                </div>
                <div className="flex items-center">
                  <CalendarIcon size={14} className="mr-1" />
                  {formatDate(article.tanggal_publish || article.created_at)}
                </div>
                <div className="flex items-center">
                  <Eye size={14} className="mr-1" />
                  {article.views.toLocaleString()} views
                </div>
              </div>
            </div>

            <button onClick={() => setShowDetails(true)} className="self-start px-4 py-2 bg-theme-primary text-white rounded-lg hover:bg-theme-secondary transition-colors text-sm font-medium">
              Baca Selengkapnya
            </button>
          </div>
        </div>

        {/* Article Detail Modal */}
        <ArticleModal article={article} isOpen={showDetails} onClose={() => setShowDetails(false)} />
      </>
    );
  }

  // Process tags for this component
  const articleTags = processTags(article.tags);

  // Grid View
  return (
    <>
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-200 cursor-pointer group" onClick={() => setShowDetails(true)}>
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image src={article.gambar_utama || "/images/default-article.jpg"} alt={article.judul} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
          {article.is_featured && (
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-400 text-yellow-900">
                <Star size={10} className="mr-1" />
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Category */}
          {article.nama_kategori && (
            <div className="mb-3">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: article.warna_kategori || "#3B82F6" }}>
                <Tag size={10} className="mr-1" />
                {article.nama_kategori}
              </span>
            </div>
          )}

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-theme-primary transition-colors mb-2 line-clamp-2">{article.judul}</h3>

          {/* Excerpt */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.konten_singkat || article.konten_lengkap.substring(0, 150) + "..."}</p>

          {/* Tags Preview */}
          {articleTags.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {articleTags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                    #{tag}
                  </span>
                ))}
                {articleTags.length > 3 && <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-full text-xs">+{articleTags.length - 3} more</span>}
              </div>
            </div>
          )}

          {/* Meta */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <User size={12} className="mr-1" />
                {truncateText(article.penulis || "Admin", 15)}
              </div>
              <div className="flex items-center">
                <Eye size={12} className="mr-1" />
                {article.views}
              </div>
            </div>
            <div className="flex items-center">
              <Clock size={12} className="mr-1" />
              {formatDate(article.tanggal_publish || article.created_at)}
            </div>
          </div>
        </div>
      </div>

      {/* Article Detail Modal */}
      <ArticleModal article={article} isOpen={showDetails} onClose={() => setShowDetails(false)} />
    </>
  );
}

// Article Detail Modal
function ArticleModal({ article, isOpen, onClose }: { article: Article; isOpen: boolean; onClose: () => void }) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const processTags = (tags: string[] | string | undefined) => {
    if (!tags) return [];
    if (Array.isArray(tags)) return tags;
    if (typeof tags === "string") {
      return tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
    }
    return [];
  };

  const articleTags = processTags(article.tags);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center space-x-3">
            {article.nama_kategori && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white" style={{ backgroundColor: article.warna_kategori || "#3B82F6" }}>
                <Tag size={12} className="mr-1" />
                {article.nama_kategori}
              </span>
            )}
            {article.is_featured && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                <Star size={12} className="mr-1" />
                Featured
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() =>
                navigator.share?.({
                  title: article.judul,
                  url: window.location.href,
                })
              }
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              <Share2 size={16} />
            </button>
            <button onClick={onClose} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Featured Image */}
        {article.gambar_utama && (
          <div className="relative h-64 md:h-80">
            <Image src={article.gambar_utama} alt={article.judul} fill className="object-cover" />
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{article.judul}</h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-100">
            <div className="flex items-center">
              <User size={16} className="mr-2" />
              <span>
                Oleh: <strong>{article.penulis || "Admin"}</strong>
              </span>
            </div>
            <div className="flex items-center">
              <CalendarIcon size={16} className="mr-2" />
              <span>{formatDate(article.tanggal_publish || article.created_at)}</span>
            </div>
            <div className="flex items-center">
              <Eye size={16} className="mr-2" />
              <span>{article.views.toLocaleString()} views</span>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {/* Excerpt/Summary */}
            {article.konten_singkat && (
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Ringkasan:</h4>
                <p className="text-gray-700 leading-relaxed">{article.konten_singkat}</p>
              </div>
            )}

            {/* Full Content */}
            <div className="text-gray-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: article.konten_lengkap }} />
          </div>

          {/* Tags */}
          {articleTags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h4 className="font-semibold text-gray-900 mb-3">Tags:</h4>
              <div className="flex flex-wrap gap-2">
                {articleTags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Pagination Component
function Pagination({ pagination, onPageChange }: { pagination: PaginationMeta; onPageChange: (page: number) => void }) {
  const getVisiblePages = () => {
    const { current_page, total_pages } = pagination;
    const pages = [];

    // Always show first page
    if (current_page > 3) {
      pages.push(1);
      if (current_page > 4) pages.push("...");
    }

    // Show pages around current page
    for (let i = Math.max(1, current_page - 2); i <= Math.min(total_pages, current_page + 2); i++) {
      pages.push(i);
    }

    // Always show last page
    if (current_page < total_pages - 2) {
      if (current_page < total_pages - 3) pages.push("...");
      pages.push(total_pages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <button onClick={() => onPageChange(pagination.current_page - 1)} disabled={!pagination.has_prev} className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
        <ChevronLeft size={20} />
      </button>

      {getVisiblePages().map((pageNum, index) => (
        <button
          key={index}
          onClick={() => typeof pageNum === "number" && onPageChange(pageNum)}
          disabled={pageNum === "..."}
          className={`px-3 py-2 rounded-lg ${pageNum === pagination.current_page ? "bg-theme-primary text-white" : "border border-gray-200 hover:bg-gray-50"} ${pageNum === "..." ? "cursor-default" : ""}`}
        >
          {pageNum}
        </button>
      ))}

      <button onClick={() => onPageChange(pagination.current_page + 1)} disabled={!pagination.has_next} className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

// Main News Page Component
export default function NewsPage() {
  const { school } = useTheme();
  const { articles, categories, loading, error, pagination, refetch } = useArticlesData();

  const [filters, setFilters] = useState<ArticleFilters>({
    search: "",
    kategori: "",
    featured: "",
    sort: "latest",
  });

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Handle filter changes
  const handleFilterChange = (newFilters: ArticleFilters) => {
    setFilters(newFilters);
    refetch(newFilters, 1);
  };

  const handlePageChange = (page: number) => {
    refetch(filters, page);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetFilters = () => {
    const emptyFilters = {
      search: "",
      kategori: "",
      featured: "",
      sort: "latest" as const,
    };
    setFilters(emptyFilters);
    refetch(emptyFilters, 1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-theme-primary to-theme-secondary relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 border border-white/20 rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 border border-white/20 rounded-full"></div>
            <div className="absolute top-1/3 right-1/3 w-32 h-32 border border-white/20 rounded-full"></div>
          </div>

          <div className="relative z-10 container-custom">
            <div className="text-center text-white">
              <span className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">Informasi Terkini</span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Berita & Artikel</h1>
              <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-8">Dapatkan informasi terbaru seputar kegiatan, prestasi, dan perkembangan {school.name}</p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold mb-1">{pagination?.total_articles || 0}</div>
                  <div className="text-sm opacity-90">Total Artikel</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold mb-1">{articles.filter((a) => a.is_featured).length}</div>
                  <div className="text-sm opacity-90">Featured</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold mb-1">{categories.length}</div>
                  <div className="text-sm opacity-90">Kategori</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold mb-1">{articles.reduce((total, article) => total + article.views, 0).toLocaleString()}</div>
                  <div className="text-sm opacity-90">Total Views</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* News Content */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            {/* Filters */}
            <ArticleFilters filters={filters} categories={categories} onFilterChange={handleFilterChange} onReset={resetFilters} />

            {/* View Controls */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Berita & Artikel
                  {pagination && <span className="text-lg font-normal text-gray-500 ml-2">({pagination.total_articles} artikel)</span>}
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
                <p className="text-gray-500">Memuat berita...</p>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📰</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Berita Tidak Tersedia</h3>
                <p className="text-gray-500 mb-4">{error}</p>
                <button onClick={() => refetch()} className="inline-flex items-center bg-theme-primary text-white px-4 py-2 rounded-lg hover:bg-theme-secondary transition-colors">
                  <RefreshCw size={16} className="mr-2" />
                  Coba Lagi
                </button>
              </div>
            )}

            {/* Articles Display */}
            {!loading && !error && articles.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📰</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak Ada Artikel</h3>
                <p className="text-gray-500">Tidak ada artikel yang sesuai dengan filter yang dipilih.</p>
              </div>
            )}

            {!loading && !error && articles.length > 0 && (
              <>
                <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}>
                  {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} isGrid={viewMode === "grid"} />
                  ))}
                </div>

                {/* Pagination */}
                {pagination && pagination.total_pages > 1 && <Pagination pagination={pagination} onPageChange={handlePageChange} />}
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
