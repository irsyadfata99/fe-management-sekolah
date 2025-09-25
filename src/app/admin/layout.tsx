"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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

    // CRITICAL FIX: Add delay to ensure storage is ready after login
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Check if user has valid token with retry mechanism
    let token = localStorage.getItem("admin_token") || sessionStorage.getItem("admin_token");
    let userData = localStorage.getItem("admin_user") || sessionStorage.getItem("admin_user");

    // Retry once if no token found (handle race condition)
    if (!token || !userData) {
      console.log("🔄 No token found, retrying in 300ms...");
      await new Promise((resolve) => setTimeout(resolve, 300));

      token = localStorage.getItem("admin_token") || sessionStorage.getItem("admin_token");
      userData = localStorage.getItem("admin_user") || sessionStorage.getItem("admin_user");
    }

    if (!token || !userData) {
      console.log("❌ No authentication data found, redirecting to login");
      // Redirect to login if no token
      router.replace("/admin/login");
      return;
    }

    try {
      // Parse user data to verify it's valid
      const user = JSON.parse(userData);
      console.log("✅ Authentication verified for:", user.username);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("❌ Invalid user data:", error);
      // Invalid user data, redirect to login
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
      sessionStorage.removeItem("admin_token");
      sessionStorage.removeItem("admin_user");
      router.replace("/admin/login");
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
