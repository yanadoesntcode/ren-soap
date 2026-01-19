"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/src/context/CartContext";
import { getProductImage } from "@/src/lib/imageUtils";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
    });
    alert(`${product.name} added to cart!`);
  };

  return (
    <Link 
      href={`/product/${product.id}`}
      className="group flex flex-col bg-white rounded-xl shadow-md border-2 border-[#E5E7EB] hover:border-[#C084FC] hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1"
    >
      <div className="relative w-full aspect-square bg-[#F9FAFB] overflow-hidden">
        <Image
          src={product.image || getProductImage(product.name)}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-linear-to-br from-[#C084FC] to-[#A855F7] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          View Details
        </div>
      </div>
      <div className="flex flex-col items-center p-6">
        <h3 className="text-xl font-bold text-[#1F2937] group-hover:text-[#C084FC] transition-colors duration-300 text-center">
          {product.name}
        </h3>
        <p className="mt-2 text-[#4B5563] text-sm text-center line-clamp-2">
          {product.description}
        </p>
        <div className="mt-4 flex items-center gap-2">
          <span className="text-2xl font-bold bg-linear-to-r from-[#C084FC] to-[#A855F7] bg-clip-text text-transparent">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <button
          onClick={handleAddToCart}
          className="mt-4 rounded-full bg-linear-to-r from-[#1F2937] to-[#111827] hover:from-[#C084FC] hover:to-[#A855F7] px-8 py-3 text-white font-semibold transition-all duration-300 z-10 hover:shadow-lg hover:scale-105 w-full"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
}
