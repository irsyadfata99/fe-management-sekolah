"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import api from "@/lib/api";
import { useAuth } from "@/hooks/use-auth";

interface TestResult {
  name: string;
  status: "pending" | "success" | "error";
  message: string;
}

export default function TestAPIPage() {
  const [tests, setTests] = useState<TestResult[]>([
    { name: "Backend Health Check", status: "pending", message: "" },
    { name: "Authentication Test", status: "pending", message: "" },
    { name: "Protected Endpoint", status: "pending", message: "" },
  ]);

  // FIXED: Menggunakan ref untuk mencegah multiple runs
  const hasRunInitialTest = useRef(false);
  const isTestRunning = useRef(false);

  const { user, login, logout, isAuth, loading } = useAuth();

  const updateTest = (
    index: number,
    status: TestResult["status"],
    message: string
  ) => {
    setTests((prev) =>
      prev.map((test, i) => (i === index ? { ...test, status, message } : test))
    );
  };

  // FIXED: Menghapus login dari dependency untuk mencegah loop
  const runTests = useCallback(async () => {
    // Prevent multiple simultaneous test runs
    if (isTestRunning.current) {
      console.log("Tests already running, skipping...");
      return;
    }

    isTestRunning.current = true;
    console.log("🧪 Starting API tests...");

    // Reset tests
    setTests((prev) =>
      prev.map((test) => ({ ...test, status: "pending", message: "" }))
    );

    // Test 1: Backend Health Check
    try {
      console.log("🔍 Testing backend health...");
      const response = await api.get("/api/health");
      if (response.data.success) {
        updateTest(0, "success", "Backend server is healthy");
        console.log("✅ Backend health check passed");
      } else {
        updateTest(0, "error", "Backend returned unsuccessful response");
        console.log("❌ Backend health check failed - unsuccessful response");
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      updateTest(0, "error", `Backend connection failed: ${message}`);
      console.log("❌ Backend health check failed:", message);
      isTestRunning.current = false;
      return; // Stop if backend is not accessible
    }

    // Test 2: Authentication Test
    try {
      console.log("🔐 Testing authentication...");

      // FIXED: Direct API call instead of using login function to avoid loops
      const loginResponse = await api.post("/api/auth/login", {
        username: "admin",
        password: "admin123",
      });

      if (loginResponse.data.success) {
        updateTest(1, "success", "Login successful with admin credentials");
        console.log("✅ Authentication test passed");

        // Store token temporarily for next test
        const token = loginResponse.data.data.token;
        localStorage.setItem("temp_test_token", token);
      } else {
        updateTest(1, "error", "Login failed with admin credentials");
        console.log("❌ Authentication test failed - login unsuccessful");
        isTestRunning.current = false;
        return;
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      updateTest(1, "error", `Authentication error: ${message}`);
      console.log("❌ Authentication test failed:", message);
      isTestRunning.current = false;
      return;
    }

    // Test 3: Protected Endpoint
    try {
      console.log("🛡️ Testing protected endpoint...");

      // Use temporary token for testing
      const tempToken = localStorage.getItem("temp_test_token");
      const response = await api.get("/api/admin/dashboard-stats", {
        headers: {
          Authorization: `Bearer ${tempToken}`,
        },
      });

      if (response.data.success) {
        updateTest(2, "success", "Protected endpoint accessible with token");
        console.log("✅ Protected endpoint test passed");
      } else {
        updateTest(
          2,
          "error",
          "Protected endpoint returned unsuccessful response"
        );
        console.log(
          "❌ Protected endpoint test failed - unsuccessful response"
        );
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      updateTest(2, "error", `Protected endpoint failed: ${message}`);
      console.log("❌ Protected endpoint test failed:", message);
    } finally {
      // Clean up temporary token
      localStorage.removeItem("temp_test_token");
    }

    isTestRunning.current = false;
    console.log("🏁 API tests completed");
  }, []); // FIXED: Empty dependency array

  const testManualLogin = async () => {
    try {
      console.log("🔐 Manual login test started...");
      const success = await login("admin", "admin123");
      alert(success ? "Login successful!" : "Login failed!");
      console.log(
        success ? "✅ Manual login successful" : "❌ Manual login failed"
      );
    } catch (error) {
      console.error("❌ Manual login error:", error);
      alert("Login error occurred!");
    }
  };

  const handleRunTests = () => {
    console.log("🎯 Manual test run triggered");
    runTests();
  };

  // FIXED: Controlled useEffect with ref to prevent multiple runs
  useEffect(() => {
    if (!hasRunInitialTest.current && !loading) {
      hasRunInitialTest.current = true;
      console.log("🚀 Running initial tests (one time only)...");

      // Delay to ensure everything is loaded
      const timer = setTimeout(() => {
        runTests();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [loading]); // Only depend on loading state

  // FIXED: Reset flag when component unmounts
  useEffect(() => {
    return () => {
      hasRunInitialTest.current = false;
      isTestRunning.current = false;
      console.log("🧹 Test page cleanup");
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            🧪 Phase 1 - API Integration Tests
          </h1>

          {/* Test Status Indicator */}
          <div className="mb-6 p-4 bg-purple-50 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Test Status
            </h2>
            <p className="text-gray-700">
              <strong>Initial Test Run:</strong>{" "}
              {hasRunInitialTest.current ? "Completed" : "Pending"}
            </p>
            <p className="text-gray-700">
              <strong>Currently Running:</strong>{" "}
              {isTestRunning.current ? "Yes" : "No"}
            </p>
          </div>

          {/* Backend Status */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Backend Configuration
            </h2>
            <p className="text-gray-700">
              <strong>API URL:</strong>{" "}
              {process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}
            </p>
            <p className="text-gray-700">
              <strong>Expected Backend:</strong> http://localhost:5000
            </p>
          </div>

          {/* Authentication Status */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Authentication Status
            </h2>
            <p className="text-gray-700">
              <strong>Loading:</strong> {loading ? "Yes" : "No"}
            </p>
            <p className="text-gray-700">
              <strong>Authenticated:</strong> {isAuth ? "Yes" : "No"}
            </p>
            {user && (
              <div className="mt-2">
                <p className="text-gray-700">
                  <strong>User:</strong> {user.username}
                </p>
                <p className="text-gray-700">
                  <strong>Role:</strong> {user.role}
                </p>
              </div>
            )}
          </div>

          {/* Test Results */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Test Results
            </h2>
            <div className="space-y-3">
              {tests.map((test, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 border rounded-lg"
                >
                  <div
                    className={`w-4 h-4 rounded-full mr-3 ${
                      test.status === "success"
                        ? "bg-green-500"
                        : test.status === "error"
                        ? "bg-red-500"
                        : "bg-gray-300 animate-pulse"
                    }`}
                  ></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{test.name}</p>
                    <p
                      className={`text-sm ${
                        test.status === "success"
                          ? "text-green-600"
                          : test.status === "error"
                          ? "text-red-600"
                          : "text-gray-500"
                      }`}
                    >
                      {test.message || "Running..."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleRunTests}
              disabled={isTestRunning.current}
              className={`px-4 py-2 rounded-lg text-white ${
                isTestRunning.current
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isTestRunning.current ? "Running Tests..." : "Run All Tests"}
            </button>

            <button
              onClick={testManualLogin}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Test Manual Login
            </button>

            {isAuth && (
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            )}
          </div>

          {/* Instructions */}
          <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-400">
            <h3 className="font-semibold mb-2 text-gray-700">
              📋 Testing Instructions:
            </h3>
            <ol className="list-decimal text-gray-700 list-inside space-y-1 text-sm">
              <li>Ensure backend server is running on http://localhost:5000</li>
              <li>Check that all 3 tests show green status</li>
              <li>Test manual login/logout functionality</li>
              <li>Verify authentication persists across page refreshes</li>
              <li>Check browser console for clean, non-repeating logs</li>
            </ol>
          </div>

          {/* Debug Info */}
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-semibold mb-2 text-gray-700">Debug Info:</h3>
            <p className="text-xs text-gray-600">
              Component rendered at: {new Date().toLocaleTimeString()}
            </p>
            <p className="text-xs text-gray-600">
              Has run initial test: {hasRunInitialTest.current.toString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
