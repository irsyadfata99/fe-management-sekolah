"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthentication();
  }, [pathname]);

  const checkAuthentication = () => {
    // Skip auth check for login page
    if (pathname === "/admin/login") {
      setIsLoading(false);
      return;
    }

    // Check if user has valid token
    const token =
      localStorage.getItem("admin_token") ||
      sessionStorage.getItem("admin_token");

    const userData =
      localStorage.getItem("admin_user") ||
      sessionStorage.getItem("admin_user");

    if (!token || !userData) {
      // Redirect to login if no token
      router.push("/admin/login");
      return;
    }

    try {
      // Parse user data to verify it's valid
      JSON.parse(userData);
      setIsAuthenticated(true);
    } catch (error) {
      // Invalid user data, redirect to login
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
      sessionStorage.removeItem("admin_token");
      sessionStorage.removeItem("admin_user");
      router.push("/admin/login");
      return;
    }

    setIsLoading(false);
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

  return <>{children}</>;
}
