import React from "react";
import { Navigation } from "@/src/components/Navigation";
import Link from "next/link";

export default function OurStoryPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FDFDFD]">
      <Navigation />

      <main className="w-full flex-1 py-12">
        <div className="max-w-4xl mx-auto px-8">
          <h1 className="text-5xl font-bold text-[#1F2937] mb-8 text-center">
            Our Story
          </h1>

          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-2xl p-10 shadow-sm border border-[#E5E7EB] mb-8">
              <h2 className="text-3xl font-bold text-[#1F2937] mb-4">
                Where It All Began
              </h2>
              <p className="text-[#4B5563] leading-relaxed mb-6">
                Soap Haven was born from a simple belief: everyone deserves to
                experience the luxury of handcrafted, natural soap. What started
                in a small kitchen in 2020 has grown into a beloved brand that
                brings joy to thousands of homes worldwide.
              </p>
              <p className="text-[#4B5563] leading-relaxed">
                Our founder, inspired by traditional soap-making methods passed
                down through generations, combined age-old techniques with modern
                botanical science to create soaps that are as nourishing as they
                are beautiful.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-10 shadow-sm border border-[#E5E7EB] mb-8">
              <h2 className="text-3xl font-bold text-[#1F2937] mb-4">
                Our Craft
              </h2>
              <p className="text-[#4B5563] leading-relaxed mb-6">
                Every bar of soap at Soap Haven is handcrafted in small batches
                to ensure the highest quality. We use only natural ingredients,
                organic oils, and pure essential oils to create soaps that
                cleanse, moisturize, and delight the senses.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-[#C084FC] text-xl">✓</span>
                  <span className="text-[#4B5563]">
                    100% natural and organic ingredients
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C084FC] text-xl">✓</span>
                  <span className="text-[#4B5563]">
                    No harmful chemicals or synthetic fragrances
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C084FC] text-xl">✓</span>
                  <span className="text-[#4B5563]">
                    Cruelty-free and vegan-friendly
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#C084FC] text-xl">✓</span>
                  <span className="text-[#4B5563]">
                    Eco-friendly packaging
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-10 shadow-sm border border-[#E5E7EB]">
              <h2 className="text-3xl font-bold text-[#1F2937] mb-4">
                Join Our Journey
              </h2>
              <p className="text-[#4B5563] leading-relaxed mb-6">
                Today, Soap Haven continues to grow, but our commitment remains
                the same: to create exceptional soaps that bring a touch of
                luxury to your daily routine while caring for your skin and our
                planet.
              </p>
              <Link
                href="/shop/all-soaps"
                className="inline-block bg-[#C084FC] text-white px-8 py-3 rounded-full font-medium hover:bg-[#A855F7] transition-colors duration-300"
              >
                Explore Our Collection
              </Link>
            </div>
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
