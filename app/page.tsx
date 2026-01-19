import React from "react";
import { connectToDatabase } from "@/src/lib/mongodb";
import { Navigation } from "@/src/components/Navigation";
import { ProductCard } from "@/src/components/ProductCard";
import WinterCollectionCarousel from "@/src/components/WinterCollectionCarousel";

export default async function Home() {
  let products: any[] = [];
  let winterProducts: any[] = [];

  try {
    const { db } = await connectToDatabase();
    const result = await db
      .collection("products")
      .find({})
      .limit(4)
      .toArray();
    
    console.log("✅ Fetched products from database:", result.length);
    
    products = result.map((p: any) => ({
      id: p._id.toString(),
      name: p.name,
      description: p.description,
      price: p.price,
    }));

    // Fetch winter collection items (Herbal + some Luxury soaps)
    const winterResult = await db
      .collection("products")
      .find({ 
        category: { $in: ["Herbal", "Luxury"] }
      })
      .limit(6)
      .toArray();

    winterProducts = winterResult.map((p: any) => ({
      id: p._id.toString(),
      name: p.name,
      description: p.description,
      price: p.price,
      category: p.category,
    }));

    console.log("✅ Fetched winter products:", winterProducts.length);
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
      <header 
        className="relative w-full text-center py-20 min-h-[500px] flex items-center justify-center"
        style={{
          backgroundImage: 'url(/images/landing-image.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-[#FDFDFD] mb-4">
            Luxurious Handmade Soaps
          </h1>
          <p className="text-xl text-[#E5E7EB] mb-8">
            Crafted with natural ingredients for your skin's wellness
          </p>

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

        {/* Promotion Banner - Winter Collection with Carousel */}
        <section className="w-full px-8 py-16 bg-linear-to-r from-[#C084FC] to-[#A855F7]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center text-white mb-8">
              <h2 className="text-4xl font-bold mb-4">Winter Collection</h2>
              <p className="text-xl mb-4">
                Warm, soothing scents perfect for cozy nights
              </p>
            </div>
            <WinterCollectionCarousel products={winterProducts} />
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
