"use client";

import Image from "next/image";
import { useCart } from "@/src/context/CartContext";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
    });
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="flex flex-col items-center bg-[#FDFDFD] p-6 shadow-md border border-[#E5E7EB]">
      <Image
        src={`/soap${index + 1}.jpg`}
        alt={product.name}
        width={150}
        height={150}
        className="rounded-md"
      />
      <h3 className="mt-4 text-xl font-medium text-[#1F2937]">
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
        className="mt-4 rounded-full bg-[#1F2937] px-6 py-2 text-[#FDFDFD] hover:bg-[#111827] transition"
      >
        Add to Cart
      </button>
    </div>
  );
}
