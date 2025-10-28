"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    inventory: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/crud-products", form);
      alert("✅ Product added successfully!");
      router.push("/admin/allproducts");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("❌ Failed to add product. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-100 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-xl border border-gray-200 rounded-2xl p-10">
        {/* ===== Page Header ===== */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            🛍️ Add New Product
          </h1>
          <p className="text-gray-600 mt-2 text-sm">
            Fill in the details below to add a product to your inventory.
          </p>
        </div>

        {/* ===== Product Form ===== */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full text-gray-800 placeholder-gray-400 rounded-lg px-4 py-2.5 bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="e.g. Shoes, Electronics"
              className="w-full text-gray-800 placeholder-gray-400 rounded-lg px-4 py-2.5 bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              required
            />
          </div>

          {/* Price & Inventory */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Enter price"
                min="0"
                step="0.01"
                className="w-full text-gray-800 placeholder-gray-400 rounded-lg px-4 py-2.5 bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Inventory
              </label>
              <input
                type="number"
                name="inventory"
                value={form.inventory}
                onChange={handleChange}
                placeholder="Enter stock quantity"
                min="0"
                className="w-full text-gray-800 placeholder-gray-400 rounded-lg px-4 py-2.5 bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Write a short product description..."
              rows={4}
              className="w-full text-gray-800 placeholder-gray-400 rounded-lg px-4 py-2.5 bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg shadow-md transition-all disabled:opacity-60 hover:shadow-lg"
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
