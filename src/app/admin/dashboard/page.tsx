"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Settings, Users, GraduationCap, FileText, Calendar, BarChart3, LogOut, Shield, Clock, CheckCircle, AlertTriangle, Activity, Menu, X, Home, Database } from "lucide-react";

interface AdminUser {
  id: number;
  username: string;
  full_name: string;
  role: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    checkAuthAndLoadData();
  }, []);

  const checkAuthAndLoadData = async () => {
    try {
      const token = localStorage.getItem("admin_token") || sessionStorage.getItem("admin_token");
      const userData = localStorage.getItem("admin_user") || sessionStorage.getItem("admin_user");

      if (!token || !userData) {
        router.push("/admin/login");
        return;
      }

      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (error) {
      console.error("Auth check failed:", error);
      handleLogout();
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    sessionStorage.removeItem("admin_token");
    sessionStorage.removeItem("admin_user");
    router.push("/admin/login");
  };

  const sidebarItems = [
    {
      name: "Dashboard",
      icon: Home,
      href: "/admin/dashboard",
      current: true,
    },
    {
      name: "Kelola Siswa",
      icon: GraduationCap,
      href: "/admin/students",
      current: false,
    },
    {
      name: "Kelola Artikel",
      icon: FileText,
      href: "/admin/articles",
      current: false,
    },
    {
      name: "Kelola Guru/Staff",
      icon: Users,
      href: "/admin/personnel",
      current: false,
    },
    {
      name: "Kalender",
      icon: Calendar,
      href: "/admin/calendar",
      current: false,
    },
    {
      name: "Laporan",
      icon: BarChart3,
      href: "/admin/reports",
      current: false,
    },
    {
      name: "Pengaturan",
      icon: Settings,
      href: "/admin/settings",
      current: false,
    },
  ];

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
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? "w-64" : "w-16"} bg-white shadow-lg transition-all duration-300 flex-shrink-0`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className={`flex items-center ${!sidebarOpen && "justify-center"}`}>
              <Shield className="h-8 w-8 text-blue-600" />
              {sidebarOpen && (
                <div className="ml-3">
                  <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
                  <p className="text-xs text-gray-500">Web Sekolah</p>
                </div>
              )}
            </div>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 rounded-md hover:bg-gray-100">
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* User Info */}
          <div className="p-4 border-b">
            <div className={`flex items-center ${!sidebarOpen && "justify-center"}`}>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              {sidebarOpen && (
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{user.full_name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-2">
            {sidebarItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => router.push(item.href)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${item.current ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"} ${
                    !sidebarOpen && "justify-center"
                  }`}
                  title={!sidebarOpen ? item.name : ""}
                >
                  <IconComponent className="h-5 w-5 flex-shrink-0" />
                  {sidebarOpen && <span className="ml-3">{item.name}</span>}
                </button>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors ${!sidebarOpen && "justify-center"}`}
              title={!sidebarOpen ? "Logout" : ""}
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              {sidebarOpen && <span className="ml-3">Logout</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-600">Selamat datang di sistem manajemen sekolah</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Online
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Welcome Section */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Selamat Datang, {user.full_name}!</h2>
                <p className="text-gray-600">
                  Anda berhasil login sebagai <span className="font-medium capitalize">{user.role}</span>
                </p>
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  Login: {new Date().toLocaleString("id-ID")}
                </div>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Active Session
                </div>
              </div>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Status Sistem</p>
                  <p className="text-2xl font-bold text-green-600">Online</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Database</p>
                  <p className="text-2xl font-bold text-blue-600">Connected</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">User Role</p>
                  <p className="text-2xl font-bold text-purple-600 capitalize">{user.role}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Last Login</p>
                  <p className="text-2xl font-bold text-orange-600">Just now</p>
                </div>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Sistem</h3>
            <div className="space-y-4">
              <StatusItem label="Database Server" status="online" />
              <StatusItem label="API Service" status="online" />
              <StatusItem label="File Upload System" status="online" />
              <StatusItem label="Email Service" status="warning" message="Konfigurasi diperlukan" />
              <StatusItem label="Backup System" status="online" />
            </div>
          </div>

          {/* Debug Info (Development Only) */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-6 bg-gray-100 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Debug Info (Development)</h4>
              <pre className="text-xs text-gray-600 bg-white p-3 rounded overflow-x-auto">
                {JSON.stringify(
                  {
                    user: user.username,
                    role: user.role,
                    loginTime: new Date().toISOString(),
                    sidebarOpen,
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          )}
        </main>
      </div>
    </div>
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
    <div className="flex items-center justify-between py-2">
      <span className="text-sm font-medium text-gray-900">{label}</span>
      <div className="flex items-center">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
          <Activity className="h-3 w-3 mr-1" />
          {config.text}
        </span>
        {message && <span className="text-xs text-gray-500 ml-3">{message}</span>}
      </div>
    </div>
  );
}
