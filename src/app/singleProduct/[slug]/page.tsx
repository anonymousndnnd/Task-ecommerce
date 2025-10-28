export const revalidate = 60; // Rebuild every 60 seconds

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  inventory: string;
  slug: string;
}
//solving build errors

// Fetch product server-side (ISR)
async function getProduct(slug: string): Promise<Product | null> {
  try {
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? `https://${process.env.VERCEL_URL || process.env.NEXT_PUBLIC_API_URL}`
        : "http://localhost:3000";
    console.log("slug is:",slug)
    const res = await fetch(
      `${baseUrl}/api/products/${slug}`,
      { next: { revalidate: 60 } } // enables ISR
    );

    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("❌ Error fetching product:", err);
    return null;
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  console.log("Slug:", slug); 
  const product = await getProduct(slug);

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600">
        Product not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h1>
        <p className="text-gray-700 mb-2">Category: {product.category}</p>
        <p className="text-gray-700 mb-2">Price: ₹{product.price}</p>
        <p className="text-gray-700 mb-2">In stock: {product.inventory}</p>
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>

        <a
          href="/"
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          ← Back to all products
        </a>
      </div>
    </div>
  );
}
