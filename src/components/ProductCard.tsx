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
      className="flex flex-col bg-[#FDFDFD] shadow-md border border-[#E5E7EB] hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden"
    >
      <div className="relative w-full aspect-square bg-[#F9FAFB]">
        <Image
          src={product.image || getProductImage(product.name)}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col items-center p-6">
        <h3 className="text-xl font-medium text-[#1F2937]">
          {product.name}
        </h3>
        <p className="mt-2 text-[#4B5563]">
          {product.description}
        </p>
        <span className="mt-4 text-lg font-bold text-[#C084FC]">
          ${product.price.toFixed(2)}
        </span>
        <button
          onClick={handleAddToCart}
          className="mt-4 rounded-full bg-[#1F2937] px-6 py-2 text-[#FDFDFD] hover:bg-[#111827] transition z-10"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
}
