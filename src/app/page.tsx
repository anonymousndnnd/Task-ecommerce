import HomeClient from "./homeClient/page";

HomeClient

// app/page.tsx
export const revalidate = 60; // Regenerate every 60 seconds


interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  inventory: string;
  slug: string;
}
//some changes done
//fixing connection issues
//  Server-side ISR fetching
async function getProducts(): Promise<Product[]> {
  const baseUrl =
      process.env.NODE_ENV === "production"
        ? `https://${process.env.VERCEL_URL || process.env.NEXT_PUBLIC_API_URL}`
        : "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/allProducts`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return [];
  const data = await res.json();
  return data.products || [];
}

export default async function HomePage() {
  const products = await getProducts();

  return <HomeClient products={products} />;
}
