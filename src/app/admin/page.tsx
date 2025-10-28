"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
      
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Welcome, Admin 👋
      </h1>
      <p className="text-gray-600 max-w-2xl text-base md:text-lg leading-relaxed mb-8">
        You’re logged into the <span className="font-medium text-blue-600">FlipKart Admin Panel</span>.
        Here you can manage products, track orders, and keep your store running smoothly.
      </p>

     
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/admin/allproducts"
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-md shadow-sm transition-all"
        >
          Go to Products
          <ArrowRight size={18} />
        </Link>

        <Link
          href="/admin/allProducts"
          className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-6 py-3 rounded-md shadow-sm transition-all"
        >
          View Orders
        </Link>
      </div>

      
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Products</h3>
          <p className="text-gray-600 text-sm">Add, edit, or remove products from inventory.</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Orders</h3>
          <p className="text-gray-600 text-sm">Monitor new and completed orders in real time.</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Analytics</h3>
          <p className="text-gray-600 text-sm">Track your business performance and growth metrics.</p>
        </div>
      </div>

      
      <p className="mt-16 text-gray-400 text-sm">
        © {new Date().getFullYear()} FlipKart Admin. All rights reserved.
      </p>
    </section>
  );
}
