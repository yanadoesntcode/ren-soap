import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/src/lib/mongodb";
import { ObjectId } from "mongodb";
import { writeFile, unlink, mkdir } from "fs/promises";
import path from "path";

async function checkAuth() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("admin_auth");
  return authCookie?.value === "authenticated";
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const formData = await request.formData();
    
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const category = formData.get("category") as string;
    const stock = parseInt(formData.get("stock") as string);
    const imageFile = formData.get("image") as File | null;

    const updateData: any = {
      name,
      description,
      price,
      category,
      stock,
      updatedAt: new Date(),
    };

    // Handle image upload if new image provided
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filename = name.toLowerCase().replace(/\s+/g, "-") + path.extname(imageFile.name);
      const filepath = path.join(process.cwd(), "public", "soaps", filename);

      await mkdir(path.join(process.cwd(), "public", "soaps"), { recursive: true });
      await writeFile(filepath, buffer);
      updateData.image = `/soaps/${filename}`;
    }

    // Update in database
    const { db } = await connectToDatabase();
    const result = await db.collection("products").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const { db } = await connectToDatabase();
    
    // Get product to delete image
    const product = await db.collection("products").findOne({ _id: new ObjectId(id) });
    
    if (product?.image) {
      try {
        const imagePath = path.join(process.cwd(), "public", product.image);
        await unlink(imagePath);
      } catch (err) {
        console.error("Error deleting image:", err);
      }
    }

    // Delete from database
    const result = await db.collection("products").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
