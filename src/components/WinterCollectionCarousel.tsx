"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

interface WinterCollectionCarouselProps {
  products: Product[];
}

export default function WinterCollectionCarousel({
  products,
}: WinterCollectionCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate every 4 seconds
  useEffect(() => {
    if (!isAutoPlaying || products.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, products.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of manual interaction
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  if (products.length === 0) {
    return (
      <div className="text-center text-white">
        <p>No winter products available</p>
      </div>
    );
  }

  const currentProduct = products[currentIndex];

  return (
    <div className="relative">
      {/* Main Carousel Display */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 mb-6">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Product Image/Icon */}
          <div className="shrink-0">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-white/20 rounded-full flex items-center justify-center text-7xl md:text-8xl">
              {currentProduct.category === "Herbal" ? "🌿" : "✨"}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium mb-3">
              {currentProduct.category}
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
              {currentProduct.name}
            </h3>
            <p className="text-lg text-white/90 mb-4">
              {currentProduct.description}
            </p>
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <span className="text-2xl font-bold text-[#FCD34D]">
                ${currentProduct.price.toFixed(2)}
              </span>
              <Link
                href={`/product/${currentProduct.id}`}
                className="bg-[#FCD34D] hover:bg-[#FBD97A] text-[#1F2937] px-6 py-3 rounded-full font-bold transition-colors duration-300"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <button
          onClick={goToPrevious}
          className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
          aria-label="Previous product"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Dot Indicators */}
        <div className="flex items-center gap-2">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? "w-8 h-3 bg-[#FCD34D]"
                  : "w-3 h-3 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to product ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
          aria-label="Next product"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
        {products.map((product, index) => (
          <button
            key={product.id}
            onClick={() => goToSlide(index)}
            className={`bg-white/10 hover:bg-white/20 rounded-lg p-3 transition-all duration-300 ${
              index === currentIndex
                ? "ring-2 ring-[#FCD34D] bg-white/20"
                : ""
            }`}
          >
            <div className="text-3xl mb-1">
              {product.category === "Herbal" ? "🌿" : "✨"}
            </div>
            <p className="text-white text-xs font-medium truncate">
              {product.name}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
