import React from "react";
import { connectToDatabase } from "@/src/lib/mongodb";
import { Navigation } from "@/src/components/Navigation";
import { ProductCard } from "@/src/components/ProductCard";

export default async function SalePage() {
  let products: any[] = [];

  try {
    const { db } = await connectToDatabase();
    const result = await db
      .collection("products")
      .find({})
      .limit(8)
      .toArray();

    products = result.map((product) => ({
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
    }));

    console.log("✅ Fetched sale items:", products.length);
  } catch (error) {
    console.error("❌ Failed to fetch products:", error);
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#FDFDFD] overflow-x-hidden">
      <Navigation />

      <main className="w-full flex-1 py-12">
        <div className="max-w-7xl mx-auto px-8">
          {/* Sale Banner */}
          <div className="bg-linear-to-r from-[#C084FC] to-[#A855F7] text-white rounded-2xl p-12 text-center mb-12">
            <h1 className="text-6xl font-bold mb-4">
              Up to 50% Off
            </h1>
            <p className="text-xl">
              Limited time only • While supplies last
            </p>
          </div>

          <div className="text-center mb-12">
            <p className="text-lg text-[#4B5563]">
              Don't miss out on these amazing deals
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div key={product.id} className="relative">
                <div className="absolute -top-2 -right-2 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  SALE
                </div>
                <ProductCard product={product} index={index} />
              </div>
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
