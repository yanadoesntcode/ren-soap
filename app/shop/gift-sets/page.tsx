import React from "react";
import { connectToDatabase } from "@/src/lib/mongodb";
import { Navigation } from "@/src/components/Navigation";
import { ProductCard } from "@/src/components/ProductCard";

export default async function GiftSetsPage() {
  let products: any[] = [];

  try {
    const { db } = await connectToDatabase();
    const result = await db
      .collection("products")
      .find({ category: "Gift Sets" })
      .toArray();

    products = result.map((product) => ({
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
    }));

    console.log("✅ Fetched gift sets:", products.length);
  } catch (error) {
    console.error("❌ Failed to fetch products:", error);
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#FDFDFD] overflow-x-hidden">
      <Navigation />

      <main className="w-full flex-1 py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-[#1F2937] mb-4">
              Gift Sets
            </h1>
            <p className="text-lg text-[#4B5563]">
              Perfect presents for your loved ones
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </main>

      <footer className="w-full bg-[#1F2937] text-[#FDFDFD] py-12 mt-16">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="text-sm">© 2026 Soap Haven. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
