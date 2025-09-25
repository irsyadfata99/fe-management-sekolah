"use client";

import { useState, useEffect } from "react";
import { Search, Download, Eye, Edit, Trash2, Filter, FileText, CheckCircle, XCircle, Clock, ChevronLeft, ChevronRight } from "lucide-react";

interface SPMBStudent {
  id: number;
  no_pendaftaran: string;
  nama_lengkap: string;
  nomor_whatsapp_aktif: string;
  asal_sekolah: string;
  pilihan_jurusan_id: number;
  nama_jurusan?: string; // ✅ Fixed: was jurusan_nama
  status_pendaftaran: "pending" | "diterima" | "ditolak" | "cadangan";
  tanggal_daftar: string;
  bukti_pdf_path?: string;
}

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<SPMBStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchStudents();
  }, [currentPage, statusFilter]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("admin_token") || sessionStorage.getItem("admin_token");

      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        ...(statusFilter !== "all" && { status: statusFilter }),
        ...(searchTerm && { search: searchTerm }),
      });

      const response = await fetch(`http://localhost:5000/api/admin/spmb/registrations?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch students");

      const result = await response.json();
      setStudents(result.data || []);
      setTotalPages(result.pagination?.total_pages || 1);
    } catch (error) {
      console.error("Error fetching students:", error);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchStudents();
  };

  const handleDownloadPackage = async (studentId: number, noPendaftaran: string) => {
    try {
      const token = localStorage.getItem("admin_token") || sessionStorage.getItem("admin_token");

      const response = await fetch(`http://localhost:5000/api/admin/spmb/download-package/${studentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `SPMB-${noPendaftaran}.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading package:", error);
      alert("Gagal mengunduh berkas");
    }
  };

  const handleUpdateStatus = async (studentId: number, newStatus: string) => {
    try {
      const token = localStorage.getItem("admin_token") || sessionStorage.getItem("admin_token");

      const response = await fetch(`http://localhost:5000/api/admin/spmb/registrations/${studentId}/status`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status_pendaftaran: newStatus }),
      });

      if (!response.ok) throw new Error("Update failed");

      alert("Status berhasil diupdate");
      fetchStudents();
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Gagal update status");
    }
  };

  const handleDelete = async (studentId: number) => {
    if (!confirm("Yakin ingin menghapus data pendaftar ini?")) return;

    try {
      const token = localStorage.getItem("admin_token") || sessionStorage.getItem("admin_token");

      const response = await fetch(`http://localhost:5000/api/admin/spmb/registrations/${studentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Delete failed");

      alert("Data berhasil dihapus");
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Gagal menghapus data");
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { bg: "bg-yellow-100", text: "text-yellow-800", icon: Clock },
      diterima: { bg: "bg-green-100", text: "text-green-800", icon: CheckCircle },
      ditolak: { bg: "bg-red-100", text: "text-red-800", icon: XCircle },
      cadangan: { bg: "bg-blue-100", text: "text-blue-800", icon: Clock },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <Icon className="h-3 w-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manajemen Pendaftar SPMB</h1>
        <p className="text-gray-600">Kelola data pendaftaran siswa baru</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari nama, no pendaftaran, atau asal sekolah..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button onClick={handleSearch} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Cari
              </button>
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="all">Semua Status</option>
                <option value="pending">Pending</option>
                <option value="diterima">Diterima</option>
                <option value="ditolak">Ditolak</option>
                <option value="cadangan">Cadangan</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No Pendaftaran</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Lengkap</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asal Sekolah</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jurusan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Daftar</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    Memuat data...
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    Tidak ada data pendaftar
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.no_pendaftaran}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.nama_lengkap}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{student.asal_sekolah}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.nama_jurusan || "-"}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(student.status_pendaftaran)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(student.tanggal_daftar).toLocaleDateString("id-ID")}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleDownloadPackage(student.id, student.no_pendaftaran)} className="text-blue-600 hover:text-blue-900" title="Download Berkas">
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900" title="Lihat Detail">
                          <Eye className="h-4 w-4" />
                        </button>
                        <select value={student.status_pendaftaran} onChange={(e) => handleUpdateStatus(student.id, e.target.value)} className="text-sm border border-gray-300 rounded px-2 py-1" title="Update Status">
                          <option value="pending">Pending</option>
                          <option value="diterima">Diterima</option>
                          <option value="ditolak">Ditolak</option>
                          <option value="cadangan">Cadangan</option>
                        </select>
                        <button onClick={() => handleDelete(student.id)} className="text-red-600 hover:text-red-900" title="Hapus">
                          <Trash2 className="h-4 w-4" />
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
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
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
  );
}
