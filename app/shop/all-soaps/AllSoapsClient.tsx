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
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ["All", ...new Set(products.map((p) => p.category))];
    return cats;
  }, [products]);

  // Get min and max prices from products
  const { minProductPrice, maxProductPrice } = useMemo(() => {
    if (products.length === 0) return { minProductPrice: 0, maxProductPrice: 100 };
    const prices = products.map((p) => p.price);
    return {
      minProductPrice: Math.floor(Math.min(...prices)),
      maxProductPrice: Math.ceil(Math.max(...prices)),
    };
  }, [products]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter((p) => p.price >= minPrice && p.price <= maxPrice);

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

    return filtered;
  }, [products, selectedCategory, minPrice, maxPrice, sortBy]);

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

              {/* Price Range Slider */}
              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-4">
                  Price Range: ${minPrice} - ${maxPrice}
                </label>
                <div className="space-y-4">
                  {/* Min Price Slider */}
                  <div>
                    <label htmlFor="minPrice" className="text-xs text-[#4B5563] block mb-2">
                      Min: ${minPrice}
                    </label>
                    <input
                      id="minPrice"
                      type="range"
                      min={minProductPrice}
                      max={maxProductPrice}
                      value={minPrice}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (value <= maxPrice) {
                          setMinPrice(value);
                        }
                      }}
                      className="w-full h-2 bg-[#E5E7EB] rounded-lg appearance-none cursor-pointer accent-[#C084FC]"
                    />
                  </div>
                  
                  {/* Max Price Slider */}
                  <div>
                    <label htmlFor="maxPrice" className="text-xs text-[#4B5563] block mb-2">
                      Max: ${maxPrice}
                    </label>
                    <input
                      id="maxPrice"
                      type="range"
                      min={minProductPrice}
                      max={maxProductPrice}
                      value={maxPrice}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (value >= minPrice) {
                          setMaxPrice(value);
                        }
                      }}
                      className="w-full h-2 bg-[#E5E7EB] rounded-lg appearance-none cursor-pointer accent-[#C084FC]"
                    />
                  </div>

                  {/* Price Input Fields */}
                  <div className="flex gap-2 mt-4">
                    <div className="flex-1">
                      <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          if (value <= maxPrice) {
                            setMinPrice(Math.max(value, minProductPrice));
                          }
                        }}
                        min={minProductPrice}
                        max={maxProductPrice}
                        className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C084FC]"
                        placeholder="Min"
                      />
                    </div>
                    <div className="flex items-center text-[#4B5563] font-medium">-</div>
                    <div className="flex-1">
                      <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          if (value >= minPrice) {
                            setMaxPrice(Math.min(value, maxProductPrice));
                          }
                        }}
                        min={minProductPrice}
                        max={maxProductPrice}
                        className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C084FC]"
                        placeholder="Max"
                      />
                    </div>
                  </div>
                </div>
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
                    setMinPrice(minProductPrice);
                    setMaxPrice(maxProductPrice);
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
        {(selectedCategory !== "All" || minPrice !== minProductPrice || maxPrice !== maxProductPrice) && (
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
            {(minPrice !== minProductPrice || maxPrice !== maxProductPrice) && (
              <span className="inline-flex items-center gap-2 bg-[#C084FC] text-white px-3 py-1 rounded-full text-sm">
                ${minPrice} - ${maxPrice}
                <button
                  onClick={() => {
                    setMinPrice(minProductPrice);
                    setMaxPrice(maxProductPrice);
                  }}
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
                setMinPrice(minProductPrice);
                setMaxPrice(maxProductPrice);
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
