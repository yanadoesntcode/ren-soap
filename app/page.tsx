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
        category: { $in: ["Herbal", "Luxury"] },
        name: { $ne: "Silk & Shea Butter Soap" }
      })
      .limit(6)
      .toArray();

    winterProducts = winterResult.map((p: any) => ({
      id: p._id.toString(),
      name: p.name,
      description: p.description,
      price: p.price,
      category: p.category,
      image: p.image || `/soaps/${p.name.toLowerCase().replace(/\s+/g, '-')}.jpg`,
    }));

    console.log("✅ Fetched winter products:", winterProducts.length);
  } catch (error) {
    console.error("❌ Failed to fetch products:", error);
  }
  return (
    <div className="flex min-h-screen flex-col bg-[#FDFDFD] overflow-x-hidden">
      <Navigation />



      {/* Hero Section */}
      <header 
        className="relative w-full text-center py-32 min-h-125 flex items-center justify-center"
        style={{
          backgroundImage: 'url(/images/landing-image.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Clean minimal overlay */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-8">
          {/* Minimal elegant badge */}
          <div className="inline-block mb-8">
            <span className="text-xs font-light text-[#4B5563] tracking-[0.3em] uppercase">Handcrafted with intention</span>
          </div>
          
          {/* Clean, zen heading */}
          <h1 className="text-6xl md:text-8xl font-light text-[#1F2937] mb-6 tracking-tight">
            人
          </h1>
          <h2 className="text-3xl md:text-4xl font-light text-[#1F2937] mb-8 tracking-wide">
            REN
          </h2>
          
          {/* Minimal divider */}
          <div className="w-px h-12 bg-[#C084FC] mx-auto mb-8"></div>
          
          {/* Clean subtitle */}
          <p className="text-lg md:text-xl text-[#4B5563] mb-12 font-light leading-relaxed max-w-xl mx-auto">
            Natural soap, thoughtfully crafted
          </p>
          
          {/* Minimal CTA */}
          <a href="/shop/all-soaps" className="inline-block text-sm text-[#1F2937] font-medium tracking-wider uppercase border-b-2 border-[#C084FC] pb-1 hover:text-[#C084FC] transition-colors duration-300">
            Explore
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full flex-1">
        {/* Featured Products Section */}
        <section className="w-full px-8 py-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block mb-3">
                <span className="text-sm font-semibold text-[#C084FC] tracking-wider uppercase">Featured Collection</span>
              </div>
              <h2 className="text-4xl font-bold text-[#1F2937] mb-3">
                Our Bestsellers
              </h2>
              <div className="w-16 h-1 bg-linear-to-r from-[#C084FC] to-[#A855F7] mx-auto rounded-full mb-4"></div>
              <p className="text-lg text-[#4B5563] max-w-2xl mx-auto">
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
        <section className="w-full px-8 py-16 bg-linear-to-b from-[#F9FAFB] to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#1F2937] mb-3">Why Choose Soap Haven</h2>
              <div className="w-16 h-1 bg-linear-to-r from-[#C084FC] to-[#A855F7] mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-white rounded-xl border border-[#E5E7EB] hover:border-[#C084FC]/50 hover:shadow-lg transition-all duration-300 group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-[#C084FC]/20 to-[#A855F7]/10 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">🌿</span>
                </div>
                <h3 className="text-xl font-bold text-[#1F2937] mb-2">
                  100% Natural
                </h3>
                <p className="text-[#4B5563] text-sm">
                  Made with pure, natural ingredients
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl border border-[#E5E7EB] hover:border-[#C084FC]/50 hover:shadow-lg transition-all duration-300 group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-[#C084FC]/20 to-[#A855F7]/10 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">💧</span>
                </div>
                <h3 className="text-xl font-bold text-[#1F2937] mb-2">
                  Moisturizing
                </h3>
                <p className="text-[#4B5563] text-sm">
                  Gentle on skin, perfect for daily use
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl border border-[#E5E7EB] hover:border-[#C084FC]/50 hover:shadow-lg transition-all duration-300 group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-[#C084FC]/20 to-[#A855F7]/10 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">🎁</span>
                </div>
                <h3 className="text-xl font-bold text-[#1F2937] mb-2">
                  Gift Ready
                </h3>
                <p className="text-[#4B5563] text-sm">
                  Beautiful packaging for any occasion
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl border border-[#E5E7EB] hover:border-[#C084FC]/50 hover:shadow-lg transition-all duration-300 group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-[#C084FC]/20 to-[#A855F7]/10 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">✨</span>
                </div>
                <h3 className="text-xl font-bold text-[#1F2937] mb-2">
                  Eco-Friendly
                </h3>
                <p className="text-[#4B5563] text-sm">
                  Sustainable and responsibly sourced
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Promotion Banner - Winter Collection with Carousel */}
        <section className="w-full px-8 py-16 bg-linear-to-br from-[#1F2937] via-[#2D1B4E] to-[#1F2937] relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#C084FC]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#A855F7]/10 rounded-full blur-3xl"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center text-white mb-8">
              <div className="inline-block mb-3 px-6 py-2 bg-[#C084FC]/20 backdrop-blur-sm border border-[#C084FC]/40 rounded-full">
                <span className="text-[#FCD34D] font-semibold text-sm tracking-wider">SEASONAL FAVORITE</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Winter Collection</h2>
              <div className="w-24 h-1 bg-linear-to-r from-[#C084FC] to-[#FCD34D] mx-auto rounded-full mb-4"></div>
              <p className="text-xl mb-4 text-white/90">
                Warm, soothing scents perfect for cozy nights
              </p>
            </div>
            <WinterCollectionCarousel products={winterProducts} />
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="w-full px-8 py-16 bg-linear-to-br from-[#F9FAFB] to-white relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#C084FC]/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-0 w-72 h-72 bg-[#A855F7]/5 rounded-full blur-3xl"></div>
          
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <div className="inline-block mb-4 px-6 py-2 bg-[#C084FC]/10 border border-[#C084FC]/30 rounded-full">
              <span className="text-[#C084FC] font-semibold text-sm tracking-wider">JOIN THE COMMUNITY</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-4">
              Join Our Soap Haven Community
            </h2>
            <div className="w-16 h-1 bg-linear-to-r from-[#C084FC] to-[#A855F7] mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-[#4B5563] mb-8">
              Subscribe for exclusive offers, new launches, and skincare tips
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-6 py-4 border-2 border-[#E5E7EB] rounded-full focus:outline-none focus:border-[#C084FC] focus:ring-4 focus:ring-[#C084FC]/20 transition-all"
              />
              <button className="rounded-full bg-linear-to-r from-[#C084FC] to-[#A855F7] hover:from-[#A855F7] hover:to-[#C084FC] px-8 py-4 text-white font-bold transition-all duration-300 hover:shadow-lg hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-linear-to-b from-[#1F2937] to-[#111827] text-[#FDFDFD] py-12 border-t-4 border-[#C084FC]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4 text-[#C084FC]">About</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-[#C084FC] transition-colors duration-200 hover:translate-x-1 inline-block">Our Story</a></li>
                <li><a href="#" className="hover:text-[#C084FC] transition-colors duration-200 hover:translate-x-1 inline-block">Sustainability</a></li>
                <li><a href="#" className="hover:text-[#C084FC] transition-colors duration-200 hover:translate-x-1 inline-block">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-[#C084FC]">Shop</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-[#C084FC] transition-colors duration-200 hover:translate-x-1 inline-block">All Soaps</a></li>
                <li><a href="#" className="hover:text-[#C084FC] transition-colors duration-200 hover:translate-x-1 inline-block">Gift Sets</a></li>
                <li><a href="#" className="hover:text-[#C084FC] transition-colors duration-200 hover:translate-x-1 inline-block">Sale</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-[#C084FC]">Customer Care</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-[#C084FC] transition-colors duration-200 hover:translate-x-1 inline-block">Contact Us</a></li>
                <li><a href="#" className="hover:text-[#C084FC] transition-colors duration-200 hover:translate-x-1 inline-block">Shipping</a></li>
                <li><a href="#" className="hover:text-[#C084FC] transition-colors duration-200 hover:translate-x-1 inline-block">Returns</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-[#C084FC]">Follow Us</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-[#C084FC] transition-colors duration-200 hover:translate-x-1 inline-block">Instagram</a></li>
                <li><a href="#" className="hover:text-[#C084FC] transition-colors duration-200 hover:translate-x-1 inline-block">Facebook</a></li>
                <li><a href="#" className="hover:text-[#C084FC] transition-colors duration-200 hover:translate-x-1 inline-block">Pinterest</a></li>
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
