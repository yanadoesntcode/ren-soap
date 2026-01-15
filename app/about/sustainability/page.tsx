import React from "react";
import { Navigation } from "@/src/components/Navigation";

export default function SustainabilityPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FDFDFD]">
      <Navigation />

      <main className="w-full flex-1 py-12">
        <div className="max-w-4xl mx-auto px-8">
          <h1 className="text-5xl font-bold text-[#1F2937] mb-8 text-center">
            Sustainability
          </h1>

          <div className="text-center mb-12">
            <p className="text-xl text-[#4B5563]">
              Our commitment to the planet is as strong as our commitment to your skin
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-10 shadow-sm border border-[#E5E7EB]">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl">♻️</span>
                <h2 className="text-3xl font-bold text-[#1F2937]">
                  Eco-Friendly Packaging
                </h2>
              </div>
              <p className="text-[#4B5563] leading-relaxed">
                All our packaging is made from recycled and recyclable materials.
                We use minimal packaging to reduce waste, and our shipping
                materials are 100% biodegradable.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-10 shadow-sm border border-[#E5E7EB]">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl">🌱</span>
                <h2 className="text-3xl font-bold text-[#1F2937]">
                  Natural Ingredients
                </h2>
              </div>
              <p className="text-[#4B5563] leading-relaxed">
                We source organic and sustainably harvested ingredients. Our
                suppliers are carefully selected to ensure ethical farming
                practices and fair trade standards.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-10 shadow-sm border border-[#E5E7EB]">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl">💧</span>
                <h2 className="text-3xl font-bold text-[#1F2937]">
                  Water Conservation
                </h2>
              </div>
              <p className="text-[#4B5563] leading-relaxed">
                Our soap-making process is designed to minimize water waste. We
                also support clean water initiatives around the world through
                partnerships with environmental organizations.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-10 shadow-sm border border-[#E5E7EB]">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl">🐰</span>
                <h2 className="text-3xl font-bold text-[#1F2937]">
                  Cruelty-Free & Vegan
                </h2>
              </div>
              <p className="text-[#4B5563] leading-relaxed">
                We never test on animals and all our soaps are vegan-friendly. We
                believe in creating beauty without harm.
              </p>
            </div>

            <div className="bg-linear-to-br from-[#C084FC] to-[#A855F7] text-white rounded-2xl p-10 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Our Pledge
              </h2>
              <p className="text-lg leading-relaxed">
                For every purchase you make, we plant a tree. Together, we've
                planted over 50,000 trees and counting. Join us in making a
                difference, one soap at a time.
              </p>
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
