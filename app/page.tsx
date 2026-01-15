import React from "react";
import { connectToDatabase } from "@/src/lib/mongodb";
import { Navigation } from "@/src/components/Navigation";
import { ProductCard } from "@/src/components/ProductCard";

export default async function Home() {
  let products: any[] = [];

  try {
    const { db } = await connectToDatabase();
    const result = await db
      .collection("products")
      .find({})
      .toArray();
    
    console.log("✅ Fetched products from database:", result.length);
    
    products = result.map((p: any) => ({
      id: p._id.toString(),
      name: p.name,
      description: p.description,
      price: p.price,
    }));
  } catch (error) {
    console.error("❌ Failed to fetch products:", error);
  }
  return (
    <div className="flex min-h-screen flex-col bg-[#FDFDFD] font-sans">
      <Navigation />

      {/* Top Banners */}
      <div className="w-full bg-[#1F2937] text-[#FDFDFD] text-center py-3 text-sm">
        <p>✨ Free Shipping on orders over $50 • Easy 30-Day Returns ✨</p>
      </div>

      {/* Hero Section */}
      <header className="relative w-full bg-linear-to-r from-[#6B8773] to-[#5A7563] text-center py-20">
        <div className="max-w-5xl mx-auto px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-[#FDFDFD] mb-4">
            Luxurious Handmade Soaps
          </h1>
          <p className="text-xl text-[#E5E7EB] mb-8">
            Crafted with natural ingredients for your skin's wellness
          </p>
          <button className="rounded-full bg-[#FCD34D] hover:bg-[#FBD97A] px-8 py-4 text-[#1F2937] font-bold text-lg transition">
            Explore Collection
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full flex-1">
        {/* Featured Products Section */}
        <section className="w-full px-8 py-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#1F2937] mb-3">
                Our Bestsellers
              </h2>
              <p className="text-lg text-[#4B5563]">
                Discover our most-loved soap collection, handpicked for you
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.length > 0 ? (
                products.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))
              ) : (
                <p className="text-center text-[#4B5563] col-span-full">
                  No products available
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="w-full px-8 py-16 bg-[#F9FAFB]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🌿</div>
                <h3 className="text-xl font-bold text-[#1F2937] mb-2">
                  100% Natural
                </h3>
                <p className="text-[#4B5563]">
                  Made with pure, natural ingredients
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">💧</div>
                <h3 className="text-xl font-bold text-[#1F2937] mb-2">
                  Moisturizing
                </h3>
                <p className="text-[#4B5563]">
                  Gentle on skin, perfect for daily use
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🎁</div>
                <h3 className="text-xl font-bold text-[#1F2937] mb-2">
                  Gift Ready
                </h3>
                <p className="text-[#4B5563]">
                  Beautiful packaging for any occasion
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-xl font-bold text-[#1F2937] mb-2">
                  Eco-Friendly
                </h3>
                <p className="text-[#4B5563]">
                  Sustainable and responsibly sourced
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Promotion Banner */}
        <section className="w-full px-8 py-16 bg-linear-to-r from-[#C084FC] to-[#A855F7]">
          <div className="max-w-7xl mx-auto text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Winter Collection</h2>
            <p className="text-xl mb-8">
              Warm, soothing scents perfect for cozy nights
            </p>
            <button className="rounded-full bg-[#FCD34D] hover:bg-[#FBD97A] px-8 py-4 text-[#1F2937] font-bold transition">
              Shop Winter Soaps
            </button>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="w-full px-8 py-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1F2937] mb-12 text-center">
              Shop by Category
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-linear-to-br from-[#FED7AA] to-[#FCA5A5] p-8 rounded-lg text-center text-white hover:shadow-lg transition">
                <h3 className="text-2xl font-bold mb-2">Floral Soaps</h3>
                <p className="mb-4">Delicate and aromatic</p>
                <button className="bg-white text-[#1F2937] px-6 py-2 rounded-full font-bold hover:bg-[#FDFDFD] transition">
                  Explore
                </button>
              </div>
              <div className="bg-linear-to-br from-[#A7F3D0] to-[#6EE7B7] p-8 rounded-lg text-center text-white hover:shadow-lg transition">
                <h3 className="text-2xl font-bold mb-2">Herbal Soaps</h3>
                <p className="mb-4">Energizing and refreshing</p>
                <button className="bg-white text-[#1F2937] px-6 py-2 rounded-full font-bold hover:bg-[#FDFDFD] transition">
                  Explore
                </button>
              </div>
              <div className="bg-linear-to-br from-[#BFDBFE] to-[#93C5FD] p-8 rounded-lg text-center text-white hover:shadow-lg transition">
                <h3 className="text-2xl font-bold mb-2">Luxury Sets</h3>
                <p className="mb-4">Perfect gift sets</p>
                <button className="bg-white text-[#1F2937] px-6 py-2 rounded-full font-bold hover:bg-[#FDFDFD] transition">
                  Explore
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="w-full px-8 py-16 bg-[#F9FAFB]">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#1F2937] mb-4">
              Join Our Soap Haven Community
            </h2>
            <p className="text-lg text-[#4B5563] mb-8">
              Subscribe for exclusive offers, new launches, and skincare tips
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-6 py-3 border border-[#E5E7EB] rounded-full focus:outline-none focus:ring-2 focus:ring-[#C084FC]"
              />
              <button className="rounded-full bg-[#1F2937] hover:bg-[#111827] px-8 py-3 text-[#FDFDFD] font-bold transition">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#1F2937] text-[#FDFDFD] py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">About</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-[#FCD34D]">Our Story</a></li>
                <li><a href="#" className="hover:text-[#FCD34D]">Sustainability</a></li>
                <li><a href="#" className="hover:text-[#FCD34D]">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Shop</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-[#FCD34D]">All Soaps</a></li>
                <li><a href="#" className="hover:text-[#FCD34D]">Gift Sets</a></li>
                <li><a href="#" className="hover:text-[#FCD34D]">Sale</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Customer Care</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-[#FCD34D]">Contact Us</a></li>
                <li><a href="#" className="hover:text-[#FCD34D]">Shipping</a></li>
                <li><a href="#" className="hover:text-[#FCD34D]">Returns</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Follow Us</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-[#FCD34D]">Instagram</a></li>
                <li><a href="#" className="hover:text-[#FCD34D]">Facebook</a></li>
                <li><a href="#" className="hover:text-[#FCD34D]">Pinterest</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#4B5563] pt-8 text-center text-sm">
            <p>© 2026 Soap Haven. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
