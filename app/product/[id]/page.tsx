import React from "react";
import { connectToDatabase } from "@/src/lib/mongodb";
import { Navigation } from "@/src/components/Navigation";
import { getProductImage } from "@/src/lib/imageUtils";
import { ObjectId } from "mongodb";
import Link from "next/link";
import Image from "next/image";
import AddToCartButton from "../../../src/components/AddToCartButton";

interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  category: string;
  stock: number;
  ingredients: string[];
  reviews: Review[];
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let product: Product | null = null;

  try {
    const { db } = await connectToDatabase();
    const result = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id) });

    if (result) {
      product = {
        _id: result._id.toString(),
        name: result.name,
        description: result.description,
        longDescription: result.longDescription || result.description,
        price: result.price,
        category: result.category,
        stock: result.stock,
        ingredients: result.ingredients || [],
        reviews: result.reviews || [],
      };
    }
  } catch (error) {
    console.error("❌ Failed to fetch product:", error);
  }

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col bg-[#FDFDFD]">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#1F2937] mb-4">
              Product Not Found
            </h1>
            <Link
              href="/"
              className="text-[#C084FC] hover:underline text-lg"
            >
              Return to Home
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const averageRating =
    product.reviews.length > 0
      ? (
          product.reviews.reduce((acc, review) => acc + review.rating, 0) /
          product.reviews.length
        ).toFixed(1)
      : "0";

  return (
    <div className="flex min-h-screen flex-col bg-[#FDFDFD]">
      <Navigation />

      <main className="w-full flex-1 py-12">
        <div className="max-w-7xl mx-auto px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm">
            <Link href="/shop/all-soaps" className="text-[#4B5563] hover:text-[#C084FC]">
              Soaps
            </Link>
            <span className="mx-2 text-[#4B5563]">/</span>
            <span className="text-[#1F2937] font-medium">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Product Image */}
            <div className="relative bg-linear-to-br from-[#F9FAFB] to-[#F3F4F6] rounded-2xl overflow-hidden">
              <Image
                src={(product as any).image || getProductImage(product.name)}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-4">
                <span className="inline-block bg-[#C084FC] text-white px-3 py-1 rounded-full text-sm font-medium">
                  {product.category}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-[#1F2937] mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-xl ${
                        i < Math.round(Number(averageRating))
                          ? "text-[#FCD34D]"
                          : "text-[#E5E7EB]"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-[#4B5563]">
                  {averageRating} ({product.reviews.length} reviews)
                </span>
              </div>

              <p className="text-2xl font-bold text-[#C084FC] mb-6">
                ${product.price.toFixed(2)}
              </p>

              <p className="text-lg text-[#4B5563] mb-8 leading-relaxed">
                {product.longDescription}
              </p>

              {/* Stock Status */}
              <div className="mb-6">
                {product.stock > 0 ? (
                  <p className="text-green-600 font-medium">
                    ✓ In Stock ({product.stock} available)
                  </p>
                ) : (
                  <p className="text-red-600 font-medium">Out of Stock</p>
                )}
              </div>

              {/* Add to Cart Button */}
              <AddToCartButton product={product} />

              {/* Features */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-[#4B5563]">
                  <span className="text-2xl">🌿</span>
                  <span className="text-sm">100% Natural</span>
                </div>
                <div className="flex items-center gap-2 text-[#4B5563]">
                  <span className="text-2xl">✨</span>
                  <span className="text-sm">Handcrafted</span>
                </div>
                <div className="flex items-center gap-2 text-[#4B5563]">
                  <span className="text-2xl">🚫</span>
                  <span className="text-sm">Cruelty Free</span>
                </div>
                <div className="flex items-center gap-2 text-[#4B5563]">
                  <span className="text-2xl">♻️</span>
                  <span className="text-sm">Eco-Friendly</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ingredients Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[#1F2937] mb-6">
              Ingredients
            </h2>
            <div className="bg-white rounded-lg border border-[#E5E7EB] p-8">
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {product.ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-[#4B5563]"
                  >
                    <span className="text-[#C084FC]">•</span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Customer Reviews */}
          <div>
            <h2 className="text-3xl font-bold text-[#1F2937] mb-6">
              Customer Reviews
            </h2>

            {product.reviews.length > 0 ? (
              <div className="space-y-6">
                {product.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg border border-[#E5E7EB] p-6"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-[#1F2937]">
                          {review.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`text-sm ${
                                  i < review.rating
                                    ? "text-[#FCD34D]"
                                    : "text-[#E5E7EB]"
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="text-sm text-[#4B5563]">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-[#4B5563] leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[#4B5563]">
                No reviews yet. Be the first to review this product!
              </p>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#1F2937] text-[#FDFDFD] py-12 mt-16">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="text-sm">© 2026 Soap Haven. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
