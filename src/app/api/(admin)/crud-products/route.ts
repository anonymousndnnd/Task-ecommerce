// Basically in this route an admin can perform all type of crud operations with the products inside inventory
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const prisma=new PrismaClient();


//Function to check whether it is an admin or not
async function isAdmin(req: NextRequest): Promise<boolean> {
  try {
    // ✅ Use cookies from the request object
    const session = req.cookies.get("admin_session")?.value;
    if (!session) return false;

    // ✅ Await DB query inside async function
    const admin = await prisma.admin.findUnique({
      where: { id: session },
    });

    return !!admin; // true if admin exists
  } catch (error) {
    console.error("Error verifying admin session:", error);
    return false;
  }
}

//Request to list all products in an Inventory of user 
export async function GET(req:NextRequest){
  if(!isAdmin(req)){
    return NextResponse.json({error:"Unauthorized Request"},{status:404});
  }
  try {
    const products=await prisma.products.findMany({
      orderBy:{lastUpdated:"desc"}
    })
    return NextResponse.json({products,message:"All products fetched successfully"},{status:201});
  } catch (error) {
    console.error("Error in adding Product", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

//Request to add a product in inventory
export async function POST(req:NextRequest) {
  if(!isAdmin(req)){
    return NextResponse.json({error:"Unauthorized Request"},{status:404});
  }
  try {
    const {name,inventory,price,category,description}=await req.json();

    //Making an unique slug for routing in frontend
    let initialSlug = name.toLowerCase().replace(/\s+/g, "-");
    let slug = initialSlug;

    let count = 1;
    while (await prisma.products.findUnique({ where: { slug } })) {
      slug = `${initialSlug}-${count}`;
      count++;
    }


    const newProduct=await prisma.products.create({
      data:{
        name,price,inventory,description,slug,category
      }
    })
    return NextResponse.json({newProduct,message:"Product added to inventory Successfully"},{status:201});
  } catch (error) {
    console.error("Error in adding Product", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}


//Request to update an existing product in an inventory
export async function PUT(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, ...updates } = await req.json();
    const updated = await prisma.products.update({
      where: { id },
      data: {
        ...updates,
        lastUpdated: new Date(),
      },
    });
  
    return NextResponse.json({ message: "Updated successfully", updated },{status:201});
  } catch (error) {
    console.error("Error Updating Product", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

//Request to delete an existing product in an inventory
export async function DELETE(req:NextRequest) {
  if(!isAdmin(req)){
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const {id}=await req.json();

    await prisma.products.delete({
      where:{id}
    })
    return NextResponse.json({message:"Product Deleted Successfully"},{status:201});
  } catch (error) {
    console.error("Error Deleting Product", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}




