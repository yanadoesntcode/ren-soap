import Image from "next/image";
import React from "react";
import { connectToDatabase } from "@/src/lib/mongodb";

export default async function Home() {
  let products: any[] = [];

  try {
    const { db } = await connectToDatabase();
    const result = await db
      .collection("products")
      .find({})
      .limit(3)
      .toArray();
    
    console.log("✅ Fetched products from database:", result.length);
    
    products = result.map((p: any) => ({
      id: p._id.toString(),
      name: p.name,
      description: p.description,
      price: p.price,
    }));
  } catch (error) {
    console.error("❌ Failed to fetch products:", error);
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#FDFDFD] font-sans">
            {/* Navigation Bar */}
            <nav className="flex items-center justify-between px-8 py-4 bg-[#1F2937] text-[#FDFDFD]">
          <Image 
          height={40}
          width={120}
          src={"/images/nav-logo.svg"} 
          alt="Ren Logo"
          className="mx-10 ml-1"/>
          <ul className="flex space-x-6">
            <li>
              <a href="#" className="hover:text-[#FCD34D]">
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
          </ul>
        </nav>
    
    {/* Hero Section */}
    <header className="relative w-full bg-[#6B8773] text-center">
        <div className="relative">
          <Image
            src="/images/landing-image.jpg"
            alt="Image of soap"
            width={600}
            height={200}
            className="w-full max-h-auto object-cover z-[-1] transform scale-x-[-1]"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center ml-190">
            <h1 className="text-4xl font-bold text-[#1F2937]">
              Welcome to Soap Haven
            </h1>
            <p className="mt-4 text-lg text-[#1F2937]">
              Luxurious, handmade soaps for every occasion.
            </p>
            <button className="mt-6 rounded-full bg-[#1F2937] px-6 py-3 text-[#FDFDFD] hover:bg-[#111827]">
              Shop Now
            </button>
          </div>
        </div>
      </header>

      {/* Product Showcase */}
      <main className="w-full max-w-5xl px-8 py-16">
        <h2 className="text-3xl font-semibold text-[#1F2937] text-center">
          Our Bestsellers
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.length > 0 ? (
            products.map((product: any) => (
              <div
                key={product.id}
                className="flex flex-col items-center bg-[#FDFDFD] p-6 shadow-md border border-[#E5E7EB]"
              >
                <Image
                  src={`/soap${products.indexOf(product) + 1}.jpg`}
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
              </div>
            ))
          ) : (
            <p className="text-center text-[#4B5563]">No products available</p>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#4B5563] py-8 text-center">
        <p className="text-sm text-[#E5E7EB]">
          © 2023 Soap Haven. All rights reserved.
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <a
            href="#"
            className="text-[#FDFDFD] hover:underline"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-[#FDFDFD] hover:underline"
          >
            Terms of Service
          </a>
        </div>
      </footer>
    </div>
  );
}
