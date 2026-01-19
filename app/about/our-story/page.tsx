import React from "react";
import { Navigation } from "@/src/components/Navigation";
import Link from "next/link";
import Image from "next/image";

export default function OurStoryPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white overflow-hidden">
      <Navigation />

      <main className="w-full flex-1 overflow-hidden">
        {/* Hero with landing image */}
        <div className="relative w-full h-96 overflow-hidden">
          <Image
            src="/images/landing-image.jpg"
            alt="Handcrafted soaps"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <h1 className="text-6xl font-bold text-white text-center px-4">
              Handcrafted With Care
            </h1>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Where It All Began Section */}
          <section className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-[#1F2937] mb-6">
                  Where It All Began
                </h2>
                <p className="text-[#4B5563] text-lg leading-relaxed mb-4">
                  Soap Haven started in a small kitchen with a simple belief: 
                  everyone deserves natural, beautiful soap that feels like a luxury 
                  moment in their everyday.
                </p>
                <p className="text-[#4B5563] text-lg leading-relaxed mb-4">
                  What began as a passion project in 2020 has grown into something 
                  we never expected—a community of people who care about how things 
                  are made, what goes on their skin, and the impact on our planet.
                </p>
                <p className="text-[#4B5563] text-lg leading-relaxed">
                  We still make our soaps the same way we did from day one: slowly, 
                  thoughtfully, and with ingredients we actually know and trust.
                </p>
              </div>
              <div className="relative h-80 rounded-lg overflow-hidden shadow-md">
                <Image
                  src="/about-photo1.jpg"
                  alt="Soap crafting process"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </section>

          {/* Our Process Section */}
          <section className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="relative h-80 rounded-lg overflow-hidden shadow-md order-2 md:order-1">
                <Image
                  src="/about-photo2.jpg"
                  alt="Handcrafted soap details"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-4xl font-bold text-[#1F2937] mb-6">
                  The Soap-Making Craft
                </h2>
                <p className="text-[#4B5563] text-lg leading-relaxed mb-6">
                  We use the cold process method, an ancient technique that preserves 
                  the natural glycerin in our soaps. This takes longer than commercial 
                  methods, but it's worth it.
                </p>
                
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#C084FC]/20">
                        <span className="text-[#C084FC] font-bold">1</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1F2937]">Natural Oils</h3>
                      <p className="text-[#4B5563] text-sm">Organic olive, coconut, and shea butter base</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#C084FC]/20">
                        <span className="text-[#C084FC] font-bold">2</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1F2937]">Pure Essential Oils</h3>
                      <p className="text-[#4B5563] text-sm">Hand-selected botanicals and essential oils</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#C084FC]/20">
                        <span className="text-[#C084FC] font-bold">3</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1F2937]">Cold Process</h3>
                      <p className="text-[#4B5563] text-sm">Slow cured for weeks to perfect each batch</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#C084FC]/20">
                        <span className="text-[#C084FC] font-bold">4</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1F2937]">Hand Cut & Wrapped</h3>
                      <p className="text-[#4B5563] text-sm">Individually finished with care</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-[#1F2937] mb-12 text-center">
              What Matters to Us
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#FDFDFD] p-8 rounded-xl border border-[#E5E7EB]">
                <div className="mb-4 text-4xl">🌿</div>
                <h3 className="font-bold text-[#1F2937] mb-3 text-lg">Clean Ingredients</h3>
                <p className="text-[#4B5563]">
                  No parabens, sulfates, or synthetic fragrances. Just real plants, real oils, and real care.
                </p>
              </div>
              
              <div className="bg-[#FDFDFD] p-8 rounded-xl border border-[#E5E7EB]">
                <div className="mb-4 text-4xl">🌍</div>
                <h3 className="font-bold text-[#1F2937] mb-3 text-lg">Planet First</h3>
                <p className="text-[#4B5563]">
                  Recyclable packaging, sustainable sourcing, and a commitment to leaving things better than we found them.
                </p>
              </div>
              
              <div className="bg-[#FDFDFD] p-8 rounded-xl border border-[#E5E7EB]">
                <div className="mb-4 text-4xl">🤝</div>
                <h3 className="font-bold text-[#1F2937] mb-3 text-lg">Community</h3>
                <p className="text-[#4B5563]">
                  We're building something together. Your feedback, your loyalty, and your trust mean everything.
                </p>
              </div>
            </div>
          </section>


          {/* CTA Section */}
          <section className="bg-gradient-to-r from-[#C084FC]/10 to-[#A855F7]/10 rounded-2xl p-12 text-center mb-20">
            <h2 className="text-3xl font-bold text-[#1F2937] mb-4">
              Ready to Experience the Difference?
            </h2>
            <p className="text-[#4B5563] text-lg mb-8 max-w-2xl mx-auto">
              Each bar is made with intention, crafted with care, and designed to bring 
              a moment of calm to your day.
            </p>
            <Link
              href="/shop/all-soaps"
              className="inline-block bg-[#C084FC] text-white px-10 py-4 rounded-full font-semibold hover:bg-[#A855F7] transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Shop Our Collection
            </Link>
          </section>
        </div>
      </main>

      <footer className="w-full bg-[#1F2937] text-[#FDFDFD] py-12 mt-16">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">About Soap Haven</h3>
              <p className="text-sm text-[#D1D5DB]">Handcrafted natural soaps made with love and intention.</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="text-sm text-[#D1D5DB] space-y-2">
                <li><Link href="/shop/all-soaps" className="hover:text-white">Shop</Link></li>
                <li><Link href="/about/our-story" className="hover:text-white">Our Story</Link></li>
                <li><Link href="/about/sustainability" className="hover:text-white">Sustainability</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <p className="text-sm text-[#D1D5DB]">Get in touch to learn more about our soaps.</p>
            </div>
          </div>
          <div className="border-t border-[#374151] pt-8 text-center text-sm text-[#D1D5DB]">
            <p>© 2026 Soap Haven. Handcrafted with care.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
