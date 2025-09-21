import "@testing-library/jest-dom";

// Mock environment variables
process.env.NEXT_PUBLIC_API_URL = "http://localhost:5000";
process.env.NEXT_PUBLIC_DEBUG_API = "false";

// Mock localStorage
Object.defineProperty(window, "localStorage", {
  value: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
  writable: true,
});
