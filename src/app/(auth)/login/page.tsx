"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"employer" | "candidate">("employer");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  // Auto-fill email & password when role changes
  useEffect(() => {
    if (role === "employer") {
      setEmail("employer@test.com");
      setPassword("123456");
    } else {
      setEmail("candidate@test.com");
      setPassword("123456");
    }
  }, [role]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const success = login(email, password);

    if (success) {
      if (role === "employer") {
        router.push("/employer/dashboard");
      } else {
        router.push("/candidate/dashboard");
      }
    } else {
      setError("Invalid email or password");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg-primary">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="">
          <h1 className="text-2xl font-semibold text-center mb-6">Sign In</h1>
          <div className="w-xl p-8 bg-white rounded-2xl border border-border-primary">
            {/* Role Toggle */}
            <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
              <button
                onClick={() => setRole("employer")}
                className={`flex-1 py-3 rounded-xl font-medium transition-all text-sm ${
                  role === "employer"
                    ? "bg-white shadow text-primary"
                    : "text-text-secondary"
                }`}
              >
                Employer
              </button>
              <button
                onClick={() => setRole("candidate")}
                className={`flex-1 py-3 rounded-xl font-medium transition-all text-sm ${
                  role === "candidate"
                    ? "bg-white shadow text-primary"
                    : "text-text-secondary"
                }`}
              >
                Candidate
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Email / User ID
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email/User ID"
                    className="w-full p-3 border border-border-primary rounded-lg focus:outline-none focus:border-primary text-sm"
                    required
                  />
                </div>

                {/* Password Field with Eye Icon */}
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full p-3 border border-border-primary rounded-lg focus:outline-none focus:border-primary text-sm pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="cursor-pointer"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                          <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                          <path d="M3 3l18 18" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="cursor-pointer"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                          <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Link href="#" className="text-sm hover:underline">
                  Forget Password?
                </Link>
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center mt-4">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary mt-8"
              >
                {loading
                  ? "Logging in..."
                  : `Login as ${role === "employer" ? "Employer" : "Candidate"}`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
