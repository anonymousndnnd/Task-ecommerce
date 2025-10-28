"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  inventory: string;
  slug: string;
}

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${slug}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600">
        Loading product details...
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600">
        Product not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h1>
        <p className="text-gray-700 mb-2">Category: {product.category}</p>
        <p className="text-gray-700 mb-2">Price: ₹{product.price}</p>
        <p className="text-gray-700 mb-2">In stock: {product.inventory}</p>
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>

        <Link
          href="/admin/allproducts"
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          ← Back to all products
        </Link>
      </div>
    </div>
  );
}
