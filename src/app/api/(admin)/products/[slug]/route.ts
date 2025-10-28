import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma=new PrismaClient();

export async function GET(req:Request,context: { params: Promise<{ slug: string }> }) {
  try {
    const {slug}=await context.params;
    if(!slug){
      return NextResponse.json({error:"Slug is missing"},{status:400})
    }
    const product = await prisma.products.findUnique({
      where: { slug },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error in adding Product", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}