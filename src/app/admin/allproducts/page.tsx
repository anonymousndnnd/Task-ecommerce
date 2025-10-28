'use client'

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Edit, Trash2, PlusCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";


interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  description:string,
  inventory: string;
  slug: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router=useRouter();
  useEffect(() => {
    // Fetch all products using Axios
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/crud-products");

        setProducts(response.data.products || []);
      } catch (error: any) {
        console.error("Error fetching products:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

  try {
    setProducts((prev) => prev.filter((p) => p.id !== id));

    const res = await axios.delete("/api/crud-products", {
      data: { id },
    });
    console.log("Delete Response:", res);
    if (res.status === 201) {
      alert("🗑️ Product deleted successfully!");
    } else {
      throw new Error("Failed to delete");
    }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert(" Failed to delete product.");
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* ===== Header Section ===== */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Product Inventory
            </h1>
            <p className="text-gray-600 text-sm">
              Manage and monitor all products in your store
            </p>
          </div>

          <Link
            href="/admin/addNewProduct"
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-md shadow-sm transition-all"
          >
            <PlusCircle size={18} />
            Add New Product
          </Link>
        </div>

        {/* ===== Product Grid ===== */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No products found.</p>
            <Link
              href="/admin/addNewProduct"
              className="inline-flex items-center gap-2 mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              <PlusCircle size={16} />
              Add your first product
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 hover:shadow-md transition"
                onClick={() => router.push(`/admin/singleProduct/${product.slug}`)}
              >
                <h2 className="text-lg font-semibold text-gray-900 truncate">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Category: {product.category}
                </p>
                <p className="text-sm text-gray-700 font-medium mt-2">
                  ₹{product.price}
                </p>
                <p
                  className={`text-xs mt-2 ${
                    parseInt(product.inventory, 10) > 0
                      ? "text-green-600"
                      : "text-red-600 font-medium"
                  }`}
                >
                  {parseInt(product.inventory, 10) > 0
                    ? `${product.inventory} in stock`
                    : "Out of stock"}
                </p>

                <div className="flex justify-end gap-3 mt-4">
                  <button
                    title="Edit"
                    className="text-blue-600 hover:text-blue-800 transition"
                    
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/admin/editProducts/${product.slug}`)}}
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    title="Delete"
                    className="text-red-600 hover:text-red-800 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(product.id)}}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
