import React from "react";
import { connectToDatabase } from "@/src/lib/mongodb";
import { Navigation } from "@/src/components/Navigation";
import { ProductCard } from "@/src/components/ProductCard";

export default async function LuxuryPage() {
  let products: any[] = [];

  try {
    const { db } = await connectToDatabase();
    const result = await db
      .collection("products")
      .find({ category: "Luxury" })
      .toArray();

    products = result.map((product) => ({
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
    }));

    console.log("✅ Fetched luxury soaps:", products.length);
  } catch (error) {
    console.error("❌ Failed to fetch products:", error);
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#FDFDFD] overflow-x-hidden">
            {/* Top Banners */}
      <div className="w-full bg-linear-to-r from-[#C084FC] via-[#A855F7] to-[#C084FC] text-white text-center py-3 text-sm font-medium tracking-wide">
        <p>✨ Free Shipping on orders over $50 • Easy 30-Day Returns ✨</p>
      </div>
      <Navigation />

      <main className="w-full flex-1 py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
            <h1 className="text-5xl font-bold text-[#1F2937] mb-4">
              Luxury Collection ✨
            </h1>
            <p className="text-lg text-[#4B5563]">
              Indulge in our most premium handcrafted soaps
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div key={product.id} className="animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: `${index * 100 + 150}ms` }}>
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
