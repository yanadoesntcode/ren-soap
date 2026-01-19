'use client';

import React, { useState, useEffect } from "react";
import { Navigation } from "@/src/components/Navigation";

const AnimatedCounter = ({ target, label, symbol }: { target: number; label: string; symbol: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 30);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="text-center">
      <div className="text-5xl font-bold text-[#C084FC] mb-2">
        {count.toLocaleString()}
      </div>
      <p className="text-[#4B5563] font-semibold">{label}</p>
      <p className="text-3xl mt-2">{symbol}</p>
    </div>
  );
};

const AnimatedProgressBar = ({ percentage, label, color = "from-[#C084FC] to-[#A855F7]" }: { percentage: number; label: string; color?: string }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(percentage), 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-[#1F2937]">{label}</h3>
        <span className="text-lg font-bold text-[#C084FC]">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className={`h-full bg-linear-to-r ${color} transition-all duration-1000 ease-out rounded-full`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
};

export default function SustainabilityPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white overflow-hidden">
      <Navigation />

      <main className="w-full flex-1 overflow-hidden">
        {/* Hero Section */}
        <div className="bg-linear-to-r from-[#C084FC]/20 to-[#A855F7]/20 py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h1 className="text-5xl font-bold text-[#1F2937] mb-4 text-center">
              Our Commitment to the Planet
            </h1>
            <p className="text-xl text-[#4B5563] text-center">
              Every soap made is a step toward a cleaner, greener world
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Impact Metrics */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-[#1F2937] mb-12 text-center">
              Our Environmental Impact
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div className="bg-linear-to-br from-[#FDFDFD] to-[#F3F4F6] rounded-2xl p-8 border border-[#E5E7EB] text-center shadow-sm">
                <AnimatedCounter target={12450} label="CO₂ kg Saved" symbol="☁️" />
              </div>
              
              <div className="bg-linear-to-br from-[#FDFDFD] to-[#F3F4F6] rounded-2xl p-8 border border-[#E5E7EB] text-center shadow-sm">
                <AnimatedCounter target={53200} label="Plastic Eliminated" symbol="♻️" />
              </div>
              
              <div className="bg-linear-to-br from-[#FDFDFD] to-[#F3F4F6] rounded-2xl p-8 border border-[#E5E7EB] text-center shadow-sm">
                <AnimatedCounter target={87500} label="Liters Water Saved" symbol="💧" />
              </div>
              
              <div className="bg-linear-to-br from-[#FDFDFD] to-[#F3F4F6] rounded-2xl p-8 border border-[#E5E7EB] text-center shadow-sm">
                <AnimatedCounter target={156000} label="Trees Planted" symbol="🌱" />
              </div>
            </div>
          </section>

          {/* Sustainability Goals */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-[#1F2937] mb-12 text-center">
              2026 Sustainability Goals
            </h2>
            
            <div className="bg-white rounded-2xl p-12 border border-[#E5E7EB] shadow-sm">
              <AnimatedProgressBar percentage={95} label="100% Recyclable Packaging" color="from-[#10B981] to-[#059669]" />
              <AnimatedProgressBar percentage={88} label="Carbon Neutral Shipping" color="from-[#3B82F6] to-[#1D4ED8]" />
              <AnimatedProgressBar percentage={92} label="Organic Ingredient Sourcing" color="from-[#F59E0B] to-[#D97706]" />
              <AnimatedProgressBar percentage={85} label="Fair Trade Practices" color="from-[#EC4899] to-[#BE185D]" />
            </div>
          </section>

          {/* Core Values */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-[#1F2937] mb-12 text-center">
              What Sustainability Means to Us
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-linear-to-br from-[#F0FDF4] to-[#DCFCE7] rounded-2xl p-8 border border-[#86EFAC]">
                <div className="text-5xl mb-4">🌍</div>
                <h3 className="text-2xl font-bold text-[#15803D] mb-3">Planet First</h3>
                <p className="text-[#166534]">
                  Every decision we make considers the impact on our environment. From sourcing to shipping, we're committed to reducing our carbon footprint.
                </p>
              </div>

              <div className="bg-linear-to-br from-[#FFFBEB] to-[#FEF3C7] rounded-2xl p-8 border border-[#FCD34D]">
                <div className="text-5xl mb-4">🤝</div>
                <h3 className="text-2xl font-bold text-[#92400E] mb-3">Fair & Ethical</h3>
                <p className="text-[#B45309]">
                  We work directly with farmers and suppliers who share our values. Fair wages, ethical practices, and respect for people and nature.
                </p>
              </div>

              <div className="bg-linear-to-br from-[#EFF6FF] to-[#DBEAFE] rounded-2xl p-8 border border-[#93C5FD]">
                <div className="text-5xl mb-4">♻️</div>
                <h3 className="text-2xl font-bold text-[#1E40AF] mb-3">Circular Economy</h3>
                <p className="text-[#1E3A8A]">
                  We design with the end in mind. Recyclable packaging, biodegradable materials, and minimal waste in every step of production.
                </p>
              </div>

              <div className="bg-linear-to-br from-[#FCE7F3] to-[#FBCFE8] rounded-2xl p-8 border border-[#F472B6]">
                <div className="text-5xl mb-4">🌿</div>
                <h3 className="text-2xl font-bold text-[#9F1239] mb-3">Natural & Pure</h3>
                <p className="text-[#BE185D]">
                  No synthetic fragrances, no harsh chemicals, no animal testing. Just natural ingredients, crafted with intention for you and nature.
                </p>
              </div>
            </div>
          </section>

          {/* Key Initiatives */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-[#1F2937] mb-12 text-center">
              Our Key Initiatives
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-8 border border-[#E5E7EB] hover:shadow-md transition-shadow">
                <div className="flex gap-4">
                  <div className="text-4xl shrink-0">🌳</div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1F2937] mb-2">Tree Planting Program</h3>
                    <p className="text-[#4B5563]">
                      For every soap purchased, we plant a tree. So far, we've contributed to over 156,000 trees planted globally.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 border border-[#E5E7EB] hover:shadow-md transition-shadow">
                <div className="flex gap-4">
                  <div className="text-4xl shrink-0">🌊</div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1F2937] mb-2">Ocean Cleanup</h3>
                    <p className="text-[#4B5563]">
                      We partner with ocean conservation organizations to remove plastic from our seas. Every quarter, we sponsor beach cleanups in coastal communities.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 border border-[#E5E7EB] hover:shadow-md transition-shadow">
                <div className="flex gap-4">
                  <div className="text-4xl shrink-0">⚡</div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1F2937] mb-2">Renewable Energy</h3>
                    <p className="text-[#4B5563]">
                      Our production facility runs on 100% renewable energy. Solar panels, wind power, and sustainable practices power every bar of soap.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 border border-[#E5E7EB] hover:shadow-md transition-shadow">
                <div className="flex gap-4">
                  <div className="text-4xl shrink-0">📦</div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1F2937] mb-2">Zero Waste Packaging</h3>
                    <p className="text-[#4B5563]">
                      100% recyclable, compostable, or reusable packaging. We've eliminated single-use plastics from our entire supply chain.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-linear-to-r from-[#C084FC]/20 to-[#A855F7]/20 rounded-2xl p-12 text-center mb-20">
            <h2 className="text-3xl font-bold text-[#1F2937] mb-4">
              Join the Movement
            </h2>
            <p className="text-[#4B5563] text-lg mb-8 max-w-2xl mx-auto">
              Every soap you buy is a vote for the planet. Together, we're creating a cleaner, greener future for generations to come.
            </p>
          </section>
        </div>
      </main>

      <footer className="w-full bg-[#1F2937] text-[#FDFDFD] py-12 mt-16">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">Sustainability</h3>
              <p className="text-sm text-[#D1D5DB]">Our commitment to the planet is reflected in every product we make.</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="text-sm text-[#D1D5DB] space-y-2">
                <li><a href="/shop/all-soaps" className="hover:text-white">Shop</a></li>
                <li><a href="/about/our-story" className="hover:text-white">Our Story</a></li>
                <li><a href="/about/contact" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Impact Report</h3>
              <p className="text-sm text-[#D1D5DB]">Read our detailed sustainability report for 2025-2026.</p>
            </div>
          </div>
          <div className="border-t border-[#374151] pt-8 text-center text-sm text-[#D1D5DB]">
            <p>© 2026 Soap Haven. Made with love for people and planet.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
