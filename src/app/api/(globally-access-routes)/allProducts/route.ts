import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma=new PrismaClient();

// Example: Fetch all products from database
export async function GET() {
  try {
    const products = await prisma.products.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        category: true,
        inventory: true,
        slug: true,
      },
      orderBy: { lastUpdated: "desc" },
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
