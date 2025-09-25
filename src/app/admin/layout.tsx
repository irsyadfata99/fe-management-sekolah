"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";

interface AdminUser {
  id: number;
  username: string;
  full_name: string;
  role: string;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthentication();
  }, [pathname]);

  const checkAuthentication = async () => {
    // Skip auth check for login page
    if (pathname === "/admin/login") {
      setIsLoading(false);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 200));

    const token = localStorage.getItem("admin_token") || sessionStorage.getItem("admin_token");
    const userData = localStorage.getItem("admin_user") || sessionStorage.getItem("admin_user");

    if (!token || !userData) {
      router.replace("/admin/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (error) {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
      sessionStorage.removeItem("admin_token");
      sessionStorage.removeItem("admin_user");
      router.replace("/admin/login");
      return;
    }

    setIsLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    sessionStorage.removeItem("admin_token");
    sessionStorage.removeItem("admin_user");
    router.push("/admin/login");
  };

  // Show loading for protected routes
  if (isLoading && pathname !== "/admin/login") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memverifikasi akses...</p>
        </div>
      </div>
    );
  }

  // Login page - no sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Protected pages - with sidebar
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar user={user} onLogout={handleLogout} />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
