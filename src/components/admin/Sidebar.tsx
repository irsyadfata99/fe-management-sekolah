"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Settings, Users, GraduationCap, FileText, Calendar, BarChart3, LogOut, Shield, Menu, X, Home, User } from "lucide-react";

interface SidebarProps {
  user: {
    id: number;
    username: string;
    full_name: string;
    role: string;
  };
  onLogout: () => void;
}

export default function Sidebar({ user, onLogout }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const sidebarItems = [
    {
      name: "Dashboard",
      icon: Home,
      href: "/admin/dashboard",
    },
    {
      name: "Kelola Siswa",
      icon: GraduationCap,
      href: "/admin/students",
    },
    {
      name: "Kelola Artikel",
      icon: FileText,
      href: "/admin/articles",
    },
    {
      name: "Kelola Guru/Staff",
      icon: Users,
      href: "/admin/personnel",
    },
    {
      name: "Kalender",
      icon: Calendar,
      href: "/admin/calendar",
    },
    {
      name: "Laporan",
      icon: BarChart3,
      href: "/admin/reports",
    },
    {
      name: "Pengaturan",
      icon: Settings,
      href: "/admin/settings",
    },
  ];

  return (
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
            const isActive = pathname === item.href;

            return (
              <button
                key={item.name}
                onClick={() => router.push(item.href)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"} ${
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
          <button onClick={onLogout} className={`w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors ${!sidebarOpen && "justify-center"}`} title={!sidebarOpen ? "Logout" : ""}>
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {sidebarOpen && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
}
