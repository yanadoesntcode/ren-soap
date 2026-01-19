import React from "react";
import { connectToDatabase } from "@/src/lib/mongodb";
import { Navigation } from "@/src/components/Navigation";
import AllSoapsClient from "./AllSoapsClient";

export default async function AllSoapsPage() {
  let products: any[] = [];

  try {
    const { db } = await connectToDatabase();
    const result = await db
      .collection("products")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    products = result.map((product) => ({
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
    }));

    console.log("✅ Fetched all soaps:", products.length);
  } catch (error) {
    console.error("❌ Failed to fetch products:", error);
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#FDFDFD] overflow-x-hidden">
      <Navigation />
      <AllSoapsClient products={products} />
      <footer className="w-full bg-[#1F2937] text-[#FDFDFD] py-12 mt-16">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="text-sm">© 2026 Soap Haven. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
