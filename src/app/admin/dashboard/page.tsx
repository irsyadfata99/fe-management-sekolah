"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Clock, CheckCircle, Activity } from "lucide-react";

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

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = localStorage.getItem("admin_user") || sessionStorage.getItem("admin_user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error("Failed to load user:", error);
    } finally {
      setLoading(false);
    }
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

  if (!user) return null;

  return (
    <div className="p-6">
      {/* Top Header */}
      <header className="bg-white rounded-lg shadow-sm border-b px-6 py-4 mb-6">
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
    </div>
  );
}

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
