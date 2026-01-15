"use client";

import Link from "next/link";
import { useCart } from "@/src/context/CartContext";
import Image from "next/image";
import { useState } from "react";

export function Navigation() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>

      {/* Main Navigation */}
      <nav className="sticky top-0 z-50 w-full bg-white border-b border-[#E5E7EB]">
        <div className="max-w-full px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="shrink-0 transition-opacity duration-300 hover:opacity-80"
            >
              <Image
                height={50}
                width={150}
                src={"/images/nav-logo.svg"}
                alt="Ren Logo"
                className="h-12 w-auto"
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              <Link
                href="/"
                className="px-4 py-2 text-sm font-medium text-[#1F2937] transition-all duration-300 relative group"
              >
                Home
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#C084FC] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>

              {/* Shop Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveMenu("shop")}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button className="px-4 py-2 text-sm font-medium text-[#1F2937] transition-all duration-300 relative group flex items-center gap-1">
                  Shop
                  <span
                    className={`text-xs transition-transform duration-300 ${
                      activeMenu === "shop" ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#C084FC] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </button>

                {/* Mega Menu */}
                <div
                  className={`absolute left-0 top-full w-screen bg-white border-b border-[#E5E7EB] transition-all duration-300 origin-top ${
                    activeMenu === "shop"
                      ? "opacity-100 translate-y-0 visible"
                      : "opacity-0 -translate-y-2 invisible"
                  }`}
                >
                  <div className="max-w-full px-8 py-12">
                    <div className="grid grid-cols-4 gap-8">
                      <div>
                        <h3 className="font-bold text-[#1F2937] mb-4">
                          Collections
                        </h3>
                        <ul className="space-y-2">
                          <li>
                            <Link
                              href="#"
                              className="text-sm text-[#4B5563] hover:text-[#C084FC] transition-colors duration-200"
                            >
                              All Soaps
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="text-sm text-[#4B5563] hover:text-[#C084FC] transition-colors duration-200"
                            >
                              Bestsellers
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="text-sm text-[#4B5563] hover:text-[#C084FC] transition-colors duration-200"
                            >
                              Gift Sets
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-bold text-[#1F2937] mb-4">
                          By Scent
                        </h3>
                        <ul className="space-y-2">
                          <li>
                            <Link
                              href="#"
                              className="text-sm text-[#4B5563] hover:text-[#C084FC] transition-colors duration-200"
                            >
                              Floral
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="text-sm text-[#4B5563] hover:text-[#C084FC] transition-colors duration-200"
                            >
                              Herbal
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="text-sm text-[#4B5563] hover:text-[#C084FC] transition-colors duration-200"
                            >
                              Luxury
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-bold text-[#1F2937] mb-4">Sale</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link
                              href="#"
                              className="text-sm text-[#4B5563] hover:text-[#C084FC] transition-colors duration-200"
                            >
                              Up to 50% Off
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="text-sm text-[#4B5563] hover:text-[#C084FC] transition-colors duration-200"
                            >
                              Last Chance
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="#"
                              className="text-sm text-[#4B5563] hover:text-[#C084FC] transition-colors duration-200"
                            >
                              Bundle Deals
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-linear-to-br from-[#F9FAFB] to-[#F3F4F6] p-6 rounded-lg">
                        <p className="text-sm font-medium text-[#1F2937] mb-2">
                          ✨ New Arrivals
                        </p>
                        <p className="text-xs text-[#4B5563]">
                          Discover our latest luxurious soaps
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* About Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveMenu("about")}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button className="px-4 py-2 text-sm font-medium text-[#1F2937] transition-all duration-300 relative group flex items-center gap-1">
                  About
                  <span
                    className={`text-xs transition-transform duration-300 ${
                      activeMenu === "about" ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#C084FC] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </button>

                {/* Dropdown */}
                <div
                  className={`absolute left-0 top-full w-48 bg-white border border-[#E5E7EB] rounded-md shadow-lg transition-all duration-300 origin-top ${
                    activeMenu === "about"
                      ? "opacity-100 translate-y-0 visible"
                      : "opacity-0 -translate-y-2 invisible"
                  }`}
                >
                  <Link
                    href="#"
                    className="block px-4 py-3 text-sm text-[#1F2937] hover:bg-[#F9FAFB] hover:text-[#C084FC] transition-all duration-200 border-b border-[#E5E7EB]"
                  >
                    Our Story
                  </Link>
                  <Link
                    href="#"
                    className="block px-4 py-3 text-sm text-[#1F2937] hover:bg-[#F9FAFB] hover:text-[#C084FC] transition-all duration-200 border-b border-[#E5E7EB]"
                  >
                    Sustainability
                  </Link>
                  <Link
                    href="#"
                    className="block px-4 py-3 text-sm text-[#1F2937] hover:bg-[#F9FAFB] hover:text-[#C084FC] transition-all duration-200"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Side - Cart */}
            <div className="flex items-center gap-6">
              <Link
                href="/cart"
                className="relative transition-all duration-300 transform hover:scale-110"
              >
                <span className="text-2xl">🛒</span>
                {totalItems > 0 && (
                  <span className="absolute -top-3 -right-3 bg-[#C084FC] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg animate-bounce">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
