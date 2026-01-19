import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/src/lib/mongodb";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

async function checkAuth() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("admin_auth");
  return authCookie?.value === "authenticated";
}

export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const category = formData.get("category") as string;
    const stock = parseInt(formData.get("stock") as string);
    const imageFile = formData.get("image") as File | null;

    let imagePath = "";

    // Handle image upload
    if (imageFile) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Generate filename from product name
      const filename = name.toLowerCase().replace(/\s+/g, "-") + path.extname(imageFile.name);
      const filepath = path.join(process.cwd(), "public", "soaps", filename);

      // Ensure directory exists
      await mkdir(path.join(process.cwd(), "public", "soaps"), { recursive: true });
      
      // Save file
      await writeFile(filepath, buffer);
      imagePath = `/soaps/${filename}`;
    }

    // Save to database
    const { db } = await connectToDatabase();
    const result = await db.collection("products").insertOne({
      name,
      description,
      price,
      category,
      stock,
      image: imagePath,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      id: result.insertedId.toString(),
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
