"use client";

import { useCart } from "@/src/context/CartContext";
import { useState } from "react";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
}

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      description: product.description,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`w-full rounded-full px-8 py-4 text-white font-bold text-lg transition-all duration-300 ${
        added
          ? "bg-green-500"
          : "bg-[#1F2937] hover:bg-[#111827] hover:scale-105"
      }`}
    >
      {added ? "✓ Added to Cart!" : "Add to Cart"}
    </button>
  );
}
