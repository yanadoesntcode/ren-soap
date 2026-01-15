"use client";

import { useCart } from "@/src/context/CartContext";
import { Navigation } from "../components/Navigation";
import Link from "next/link";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const totalPrice = getTotalPrice();

  return (
    <div className="flex min-h-screen flex-col bg-[#FDFDFD] font-sans">
      <Navigation />

      <main className="w-full max-w-5xl mx-auto px-8 py-16">
        <h1 className="text-4xl font-bold text-[#1F2937] mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-[#4B5563] mb-4">Your cart is empty</p>
            <Link
              href="/"
              className="inline-block rounded-full bg-[#1F2937] px-6 py-3 text-[#FDFDFD] hover:bg-[#111827] transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-white p-6 shadow-md border border-[#E5E7EB] rounded-lg"
                  >
                    <div className="flex-1">
                      <h3 className="text-xl font-medium text-[#1F2937]">
                        {item.name}
                      </h3>
                      <p className="text-[#4B5563] text-sm mt-1">
                        {item.description}
                      </p>
                      <p className="text-lg font-bold text-[#C084FC] mt-2">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4 mx-6">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="bg-[#E5E7EB] hover:bg-[#D1D5DB] px-3 py-1 rounded text-[#1F2937] font-bold"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-bold text-[#1F2937]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="bg-[#E5E7EB] hover:bg-[#D1D5DB] px-3 py-1 rounded text-[#1F2937] font-bold"
                      >
                        +
                      </button>
                    </div>

                    {/* Total Price */}
                    <div className="text-right min-w-[120px]">
                      <p className="text-sm text-[#4B5563]">Subtotal</p>
                      <p className="text-2xl font-bold text-[#1F2937]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 shadow-md border border-[#E5E7EB] rounded-lg sticky top-8">
                <h2 className="text-2xl font-bold text-[#1F2937] mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-[#4B5563]">
                    <span>Subtotal:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#4B5563]">
                    <span>Shipping:</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-[#4B5563]">
                    <span>Tax:</span>
                    <span>${(totalPrice * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-[#E5E7EB] pt-4 flex justify-between text-xl font-bold text-[#1F2937]">
                    <span>Total:</span>
                    <span>${(totalPrice * 1.1).toFixed(2)}</span>
                  </div>
                </div>

                <button className="w-full bg-[#1F2937] hover:bg-[#111827] text-[#FDFDFD] py-3 rounded-full font-bold transition mb-3">
                  Checkout
                </button>

                <button
                  onClick={clearCart}
                  className="w-full bg-[#E5E7EB] hover:bg-[#D1D5DB] text-[#1F2937] py-3 rounded-full font-bold transition mb-4"
                >
                  Clear Cart
                </button>

                <Link
                  href="/"
                  className="block text-center text-[#1F2937] hover:text-[#FCD34D] font-semibold"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#4B5563] py-8 text-center mt-auto">
        <p className="text-sm text-[#E5E7EB]">
          © 2023 Soap Haven. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
