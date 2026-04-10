"use client";

import { useAuthStore } from "@/store/useAuthStore";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="bg-white shadow-[0px_8.5px_10px_3px_rgb(209 209 209)] py-6 px-4">
      <div className="container mx-auto flex items-center justify-between gap-2">
        {/* Left Side - Logo */}
        <Image src="/logo.png" alt="Logo" width={132} height={32} />

        {/* Right Side */}
        <div className="flex items-center gap-8">
          {isAuthenticated && user ? (
            <>
              {/* Logged in state */}
              <div className="text-sm">
                Welcome,{" "}
                <span className="font-semibold text-text-primary">
                  {user.name}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="px-5 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Not logged in (Login Page) */}
              <div className="text-sm font-medium text-text-secondary">
                Mock Login System
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
