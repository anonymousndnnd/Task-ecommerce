"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import axios from "axios";

export default function NavHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navLinks = [
    { name: "Dashboard", href: "/admin/allproducts" },
    { name: "About Us", href: "/admin/allproducts" },
  ];

  //  Check cookie session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get("/api/check-admin-session", {
          withCredentials: true, 
        });
        setIsLoggedIn(res.data.loggedIn);
      } catch (err) {
        console.error("Error checking session:", err);
      }
    };
    checkSession();
  }, []);

  // Logout: clear cookie on server
  const handleLogout = async () => {
    try {
      await axios.post("/api/logout", {}, { withCredentials: true });
      setIsLoggedIn(false);
      router.push("/admin");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* ===== Logo ===== */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            TE
          </div>
          <span className="font-semibold text-gray-900 text-lg">Talanton Ecommerce</span>
        </Link>

        {/* ===== Desktop Links ===== */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* ===== Right Side: Login/Logout ===== */}
        <div className="hidden md:flex">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-md transition"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/admin/sign-in"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* ===== Mobile Menu Toggle ===== */}
        <button
          className="md:hidden text-gray-700 hover:text-gray-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ===== Mobile Dropdown ===== */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-6 py-3">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-sm font-medium ${
                  pathname === link.href
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <hr className="my-2" />

            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-md transition"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/admin/sign-in"
                onClick={() => setIsOpen(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md text-center transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
