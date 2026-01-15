"use client";

import Link from "next/link";
import { useCart } from "@/src/context/CartContext";
import Image from "next/image";

export function Navigation() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-[#1F2937] text-[#FDFDFD]">
      <Image 
        height={40}
        width={120}
        src={"/images/nav-logo.svg"} 
        alt="Ren Logo"
        className="mx-10 ml-1"
      />
      <ul className="flex space-x-6 items-center">
        <li>
          <a href="/" className="hover:text-[#FCD34D]">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-[#FCD34D]">
            Products
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-[#FCD34D]">
            About
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-[#FCD34D]">
            Contact
          </a>
        </li>
        <li>
          <Link 
            href="/cart" 
            className="hover:text-[#FCD34D] flex items-center gap-2"
          >
            🛒 Cart
            {totalItems > 0 && (
              <span className="bg-[#FCD34D] text-[#1F2937] rounded-full px-2 py-1 text-xs font-bold">
                {totalItems}
              </span>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
