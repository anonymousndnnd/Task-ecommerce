"use client";

import { useState } from "react";

interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  inventory: string;
  slug: string;
}

export default function HomeClient({ products =[]}: { products?: Product[] }) {
  const [query, setQuery] = useState("");

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 text-gray-900">
      {/* Admin Info Bar */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 text-center">
        <p className="text-sm sm:text-base font-medium">
          Are you an admin?{" "}
          <a
            href="/admin"
            className="underline font-semibold hover:text-yellow-200 transition"
          >
            Visit your dashboard →
          </a>
        </p>
      </section>

      {/*  Hero Section */}
      <section className="text-center py-16 sm:py-20 bg-gradient-to-r from-indigo-50 via-white to-blue-50 border-b border-gray-200">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight">
          Welcome to <span className="text-indigo-600">TalantonCore Store</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Discover premium products crafted for quality, innovation, and
          everyday style — because you deserve the best.
        </p>
        <a
          href="#products"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-medium shadow-md transition"
        >
          Explore Products
        </a>
      </section>

      {/*  Product Grid */}
      <section id="products" className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-gray-800">
          🛒 Our Latest Products
        </h2>

        {/*  Search Input */}
        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="Search by name or category..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No matching products found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filtered.map((p) => (
              <a
                key={p.id}
                href={`/singleProduct/${p.slug}`}
                className="group bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-transform transform hover:-translate-y-1 p-6 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-700 transition">
                    {p.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{p.category}</p>
                </div>

                <div className="mt-4">
                  <p className="text-base font-semibold text-indigo-700">
                    ₹{p.price}
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      parseInt(p.inventory) > 0
                        ? "text-green-600"
                        : "text-red-600 font-medium"
                    }`}
                  >
                    {parseInt(p.inventory) > 0
                      ? `${p.inventory} in stock`
                      : "Out of stock"}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      {/*  Footer */}
      <footer className="py-8 text-center text-sm text-gray-500 border-t border-gray-200">
        © {new Date().getFullYear()} TalantonCore Store. All rights reserved.
      </footer>
    </main>
  );
}
