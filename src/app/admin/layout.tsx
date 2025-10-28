import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import NavHeader from "@/components/navbar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen flex flex-col`}
    >
      {/* ===== Navbar ===== */}

      <NavHeader/>

      {/* ===== Main Content ===== */}
      <main className="flex-grow container mx-auto px-6 py-10">
        <div className="bg-white rounded-xl shadow-md p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
