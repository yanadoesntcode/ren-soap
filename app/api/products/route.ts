import { connectToDatabase } from "@/src/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { db } = await connectToDatabase();

    // Fetch all products from the database
    const products = await db
      .collection("products")
      .find({})
      .toArray();

    return NextResponse.json({
      status: "success",
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch products",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
