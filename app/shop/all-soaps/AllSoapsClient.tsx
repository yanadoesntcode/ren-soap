"use client";

import React, { useState, useMemo } from "react";
import { ProductCard } from "@/src/components/ProductCard";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
}

interface AllSoapsClientProps {
  products: Product[];
}

export default function AllSoapsClient({ products }: AllSoapsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ["All", ...new Set(products.map((p) => p.category))];
    return cats;
  }, [products]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filter by price range
    if (priceRange !== "All") {
      if (priceRange === "under10") {
        filtered = filtered.filter((p) => p.price < 10);
      } else if (priceRange === "10to20") {
        filtered = filtered.filter((p) => p.price >= 10 && p.price < 20);
      } else if (priceRange === "20to30") {
        filtered = filtered.filter((p) => p.price >= 20 && p.price < 30);
      } else if (priceRange === "over30") {
        filtered = filtered.filter((p) => p.price >= 30);
      }
    }

    // Sort products
    if (sortBy === "priceLowHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHighLow") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "nameAZ") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "nameZA") {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }
    // Default is "newest" which maintains the original order

    return filtered;
  }, [products, selectedCategory, priceRange, sortBy]);

  return (
    <main className="w-full flex-1 py-12">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-[#1F2937] mb-4">All Soaps</h1>
          <p className="text-lg text-[#4B5563]">
            Explore our complete collection of handcrafted artisan soaps
          </p>
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 mb-8">
          <div className="flex items-center justify-between mb-4 lg:mb-0">
            <div className="flex items-center gap-2">
              <span className="text-[#1F2937] font-medium">
                {filteredAndSortedProducts.length} Products
              </span>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden bg-[#C084FC] text-white px-4 py-2 rounded-lg font-medium"
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          <div
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block space-y-4 lg:space-y-0`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4">
              {/* Category Filter */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-[#1F2937] mb-2"
                >
                  Category
                </label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C084FC]"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label
                  htmlFor="priceRange"
                  className="block text-sm font-medium text-[#1F2937] mb-2"
                >
                  Price Range
                </label>
                <select
                  id="priceRange"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C084FC]"
                >
                  <option value="All">All Prices</option>
                  <option value="under10">Under $10</option>
                  <option value="10to20">$10 - $20</option>
                  <option value="20to30">$20 - $30</option>
                  <option value="over30">Over $30</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label
                  htmlFor="sortBy"
                  className="block text-sm font-medium text-[#1F2937] mb-2"
                >
                  Sort By
                </label>
                <select
                  id="sortBy"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C084FC]"
                >
                  <option value="newest">Newest First</option>
                  <option value="priceLowHigh">Price: Low to High</option>
                  <option value="priceHighLow">Price: High to Low</option>
                  <option value="nameAZ">Name: A-Z</option>
                  <option value="nameZA">Name: Z-A</option>
                </select>
              </div>

              {/* Clear Filters Button */}
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setPriceRange("All");
                    setSortBy("newest");
                  }}
                  className="w-full px-4 py-2 border-2 border-[#C084FC] text-[#C084FC] rounded-lg font-medium hover:bg-[#C084FC] hover:text-white transition-colors duration-300"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {(selectedCategory !== "All" || priceRange !== "All") && (
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-sm text-[#4B5563]">Active filters:</span>
            {selectedCategory !== "All" && (
              <span className="inline-flex items-center gap-2 bg-[#C084FC] text-white px-3 py-1 rounded-full text-sm">
                {selectedCategory}
                <button
                  onClick={() => setSelectedCategory("All")}
                  className="hover:text-[#E5E7EB]"
                >
                  ×
                </button>
              </span>
            )}
            {priceRange !== "All" && (
              <span className="inline-flex items-center gap-2 bg-[#C084FC] text-white px-3 py-1 rounded-full text-sm">
                {priceRange === "under10" && "Under $10"}
                {priceRange === "10to20" && "$10-$20"}
                {priceRange === "20to30" && "$20-$30"}
                {priceRange === "over30" && "Over $30"}
                <button
                  onClick={() => setPriceRange("All")}
                  className="hover:text-[#E5E7EB]"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )}

        {/* Products Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredAndSortedProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-2xl text-[#4B5563] mb-4">
              No products found matching your filters
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setPriceRange("All");
              }}
              className="bg-[#C084FC] text-white px-6 py-3 rounded-full font-medium hover:bg-[#A855F7] transition-colors duration-300"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
