"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import {
  Eye,
  EyeOff,
  User,
  Lock,
  Loader2,
  AlertCircle,
  Shield,
  School,
} from "lucide-react";

interface LoginFormData {
  username: string;
  password: string;
  remember_me: boolean;
}

interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
    user: {
      id: number;
      name: string;
      email: string;
      role: string;
    };
  };
}

interface ApiErrorResponse {
  message: string;
  success: boolean;
}

export default function AdminLoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
    remember_me: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    field: keyof LoginFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear field-specific error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }

    // Clear general error
    if (error) {
      setError("");
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Username validation
    if (!formData.username) {
      newErrors.username = "Username harus diisi";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username minimal 3 karakter";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password harus diisi";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await api.post("/api/admin/login", {
        username: formData.username,
        password: formData.password,
        remember_me: formData.remember_me,
      });

      const result = response.data as LoginResponse;

      if (result.success && result.data) {
        // Store auth token
        if (formData.remember_me) {
          localStorage.setItem("admin_token", result.data.token);
          localStorage.setItem("admin_user", JSON.stringify(result.data.user));
        } else {
          sessionStorage.setItem("admin_token", result.data.token);
          sessionStorage.setItem(
            "admin_user",
            JSON.stringify(result.data.user)
          );
        }

        // Redirect to admin dashboard
        router.push("/admin/dashboard");
      } else {
        setError(result.message || "Login gagal");
      }
    } catch (err) {
      const apiError = err as { response?: { data?: ApiErrorResponse } };
      const errorMessage =
        apiError.response?.data?.message || "Terjadi kesalahan saat login";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-4">
            <Shield className="w-8 h-8 text-theme-primary" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Admin Portal
          </h1>
          <p className="text-gray-600">Masuk ke dashboard administrasi</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-8">
          <div className="flex items-center justify-center mb-6">
            <School className="w-6 h-6 text-theme-primary mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">
              Login Administrator
            </h2>
          </div>

          {/* General Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) =>
                    handleInputChange("username", e.target.value)
                  }
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-transparent transition-colors ${
                    errors.username
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  placeholder="Masukkan username"
                  disabled={isLoading}
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-transparent transition-colors ${
                    errors.password
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  placeholder="Masukkan password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={formData.remember_me}
                  onChange={(e) =>
                    handleInputChange("remember_me", e.target.checked)
                  }
                  className="h-4 w-4 text-theme-primary focus:ring-theme-primary border-gray-300 rounded"
                  disabled={isLoading}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 text-sm text-gray-700"
                >
                  Ingat saya
                </label>
              </div>

              <button
                type="button"
                className="text-sm text-theme-primary hover:text-theme-secondary transition-colors"
                disabled={isLoading}
              >
                Lupa password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white transition-colors ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-theme-primary hover:bg-theme-secondary focus:ring-2 focus:ring-offset-2 focus:ring-theme-primary"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  Memproses...
                </>
              ) : (
                "Masuk"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">
              Halaman khusus administrator sistem
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Hubungi IT Support jika mengalami masalah login
            </p>
          </div>
        </div>

        {/* Back to Main Site */}
        <div className="text-center mt-6">
          <button
            onClick={() => router.push("/")}
            className="text-sm text-gray-600 hover:text-theme-primary transition-colors"
          >
            ← Kembali ke halaman utama
          </button>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-theme-primary opacity-5 rounded-full"></div>
        <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-theme-secondary opacity-5 rounded-full"></div>
      </div>
    </div>
  );
}
