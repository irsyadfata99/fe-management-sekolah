"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Settings,
  Users,
  GraduationCap,
  FileText,
  Calendar,
  BarChart3,
  LogOut,
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Activity,
  Database,
} from "lucide-react";

interface AdminUser {
  id: number;
  username: string;
  full_name: string;
  role: string;
}

interface DashboardStats {
  totalStudents: number;
  totalArticles: number;
  totalTestimoni: number;
  totalAlumni: number;
  totalCalendarEvents: number;
  pendingRegistrations: number;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    checkAuthAndLoadData();
  }, []);

  const checkAuthAndLoadData = async () => {
    try {
      // Get token from storage
      const token =
        localStorage.getItem("admin_token") ||
        sessionStorage.getItem("admin_token");

      const userData =
        localStorage.getItem("admin_user") ||
        sessionStorage.getItem("admin_user");

      if (!token || !userData) {
        router.push("/admin/login");
        return;
      }

      // Parse user data
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);

      // Verify token with backend
      await verifyToken(token);

      // Load dashboard stats
      await loadDashboardStats(token);
    } catch (error) {
      console.error("Auth check failed:", error);
      handleLogout();
    } finally {
      setLoading(false);
    }
  };

  const verifyToken = async (token: string) => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Token verification failed");
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error("Invalid token");
      }
    } catch (error) {
      console.error("Token verification error:", error);
      throw error;
    }
  };

  const loadDashboardStats = async (token: string) => {
    try {
      // Mock stats for now - you can replace with real API calls
      const mockStats: DashboardStats = {
        totalStudents: 150,
        totalArticles: 25,
        totalTestimoni: 8,
        totalAlumni: 45,
        totalCalendarEvents: 12,
        pendingRegistrations: 5,
      };

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      setStats(mockStats);
    } catch (error) {
      console.error("Failed to load dashboard stats:", error);
      setError("Gagal memuat statistik dashboard");
    }
  };

  const handleLogout = () => {
    // Clear storage
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    sessionStorage.removeItem("admin_token");
    sessionStorage.removeItem("admin_user");

    // Redirect to login
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">Unauthorized Access</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-500">
                  Sistem Manajemen Sekolah
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user.full_name}
                </p>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50 transition-colors"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Selamat Datang, {user.full_name}!
              </h2>
              <p className="text-gray-600">
                Anda berhasil login sebagai{" "}
                <span className="font-medium capitalize">{user.role}</span>
              </p>
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                Login: {new Date().toLocaleString("id-ID")}
              </div>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Online
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <StatCard
              title="Total Siswa"
              value={stats.totalStudents}
              icon={<GraduationCap className="h-8 w-8 text-blue-600" />}
              color="blue"
              change="+12%"
            />
            <StatCard
              title="Artikel"
              value={stats.totalArticles}
              icon={<FileText className="h-8 w-8 text-green-600" />}
              color="green"
              change="+5%"
            />
            <StatCard
              title="Testimoni"
              value={stats.totalTestimoni}
              icon={<Users className="h-8 w-8 text-purple-600" />}
              color="purple"
              change="+2"
            />
            <StatCard
              title="Alumni"
              value={stats.totalAlumni}
              icon={<User className="h-8 w-8 text-orange-600" />}
              color="orange"
              change="+8%"
            />
            <StatCard
              title="Event Kalender"
              value={stats.totalCalendarEvents}
              icon={<Calendar className="h-8 w-8 text-indigo-600" />}
              color="indigo"
              change="+3"
            />
            <StatCard
              title="Pendaftaran Pending"
              value={stats.pendingRegistrations}
              icon={<AlertTriangle className="h-8 w-8 text-red-600" />}
              color="red"
              urgent={true}
            />
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Menu Utama
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <QuickActionButton
              title="Kelola Siswa"
              icon={<GraduationCap className="h-6 w-6" />}
              onClick={() => router.push("/admin/students")}
            />
            <QuickActionButton
              title="Kelola Artikel"
              icon={<FileText className="h-6 w-6" />}
              onClick={() => router.push("/admin/articles")}
            />
            <QuickActionButton
              title="Kelola Guru/Staff"
              icon={<Users className="h-6 w-6" />}
              onClick={() => router.push("/admin/personnel")}
            />
            <QuickActionButton
              title="Pengaturan"
              icon={<Settings className="h-6 w-6" />}
              onClick={() => router.push("/admin/settings")}
            />
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Status Sistem
          </h3>
          <div className="space-y-3">
            <StatusItem label="Database" status="online" />
            <StatusItem label="API Server" status="online" />
            <StatusItem label="File Upload" status="online" />
            <StatusItem
              label="Email Service"
              status="warning"
              message="Konfigurasi diperlukan"
            />
          </div>
        </div>

        {/* Debug Info (Development Only) */}
        {process.env.NODE_ENV === "development" && (
          <div className="mt-6 bg-gray-100 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Debug Info (Development)
            </h4>
            <pre className="text-xs text-gray-600 bg-white p-3 rounded overflow-x-auto">
              {JSON.stringify(
                { user, loginTime: new Date().toISOString() },
                null,
                2
              )}
            </pre>
          </div>
        )}
      </main>
    </div>
  );
}

// Stat Card Component
interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  change?: string;
  urgent?: boolean;
}

function StatCard({
  title,
  value,
  icon,
  color,
  change,
  urgent,
}: StatCardProps) {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-200",
    green: "bg-green-50 border-green-200",
    purple: "bg-purple-50 border-purple-200",
    orange: "bg-orange-50 border-orange-200",
    indigo: "bg-indigo-50 border-indigo-200",
    red: "bg-red-50 border-red-200",
  };

  return (
    <div
      className={`p-6 rounded-lg border-2 ${
        colorClasses[color as keyof typeof colorClasses]
      } ${urgent ? "ring-2 ring-red-300" : ""}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">
            {value.toLocaleString()}
          </p>
          {change && (
            <p className="text-sm text-gray-500 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              {change}
            </p>
          )}
        </div>
        <div className="flex-shrink-0">{icon}</div>
      </div>
    </div>
  );
}

// Quick Action Button Component
interface QuickActionButtonProps {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
}

function QuickActionButton({ title, icon, onClick }: QuickActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors"
    >
      <div className="text-gray-600 mb-2">{icon}</div>
      <span className="text-sm font-medium text-gray-900">{title}</span>
    </button>
  );
}

// Status Item Component
interface StatusItemProps {
  label: string;
  status: "online" | "offline" | "warning";
  message?: string;
}

function StatusItem({ label, status, message }: StatusItemProps) {
  const statusConfig = {
    online: { color: "text-green-600", bg: "bg-green-100", text: "Online" },
    offline: { color: "text-red-600", bg: "bg-red-100", text: "Offline" },
    warning: { color: "text-yellow-600", bg: "bg-yellow-100", text: "Warning" },
  };

  const config = statusConfig[status];

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-gray-900">{label}</span>
      <div className="flex items-center">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.color}`}
        >
          <Activity className="h-3 w-3 mr-1" />
          {config.text}
        </span>
        {message && (
          <span className="text-xs text-gray-500 ml-2">{message}</span>
        )}
      </div>
    </div>
  );
}
