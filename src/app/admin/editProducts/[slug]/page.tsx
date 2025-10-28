"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  description:string,
  inventory: string;
  slug: string;
};

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;
  console.log("slug is",slug)
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    inventory: "",
    description: "",
  });

  //Fetch the product details when page loads 
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${slug}`);
        console.log(res)
        const fetched=res.data;
        if(!fetched){
          alert("Product not found!");
          router.push("/admin/allproducts");
          return;
        }
        setProduct(fetched)
        console.log("Product is:",res.data)
        setForm({
          name: fetched.name,
          category: fetched.category,
          price: fetched.price.toString(),
          inventory: fetched.inventory.toString(),
          description: fetched.description || "",
        });
      } catch (error) {
        console.error("Error fetching product:", error);
        alert("Failed to load product details.");
        router.push("/admin/allproducts");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchProduct();
  }, [slug]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await axios.put(`/api/crud-products`,{
        id: product!.id,       
        ...form, 
      });
      alert("✅ Product updated successfully!");
      router.push("/admin/allproducts");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("❌ Failed to update product.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 text-gray-500 text-lg">
        Loading product details...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-100 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-xl border border-gray-200 rounded-2xl p-10">
        {/* ===== Page Header ===== */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            ✏️ Edit Product
          </h1>
          <p className="text-gray-600 mt-2 text-sm">
            Update product information and save your changes.
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
              rows={4}
              className="w-full text-gray-800 placeholder-gray-400 rounded-lg px-4 py-2.5 bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg shadow-md transition-all disabled:opacity-60 hover:shadow-lg"
            >
              {saving ? "Saving..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
