"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ProductFormProps {
  product?: {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    image?: string;
  };
}

const categories = ["Floral", "Herbal", "Luxury", "Bestsellers", "Gift Sets"];

export default function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
    category: product?.category || "Floral",
    stock: product?.stock || 0,
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(product?.image || "");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price.toString());
      data.append("category", formData.category);
      data.append("stock", formData.stock.toString());
      
      if (imageFile) {
        data.append("image", imageFile);
      }

      const url = product 
        ? `/api/admin/products/${product.id}`
        : "/api/admin/products";
      
      const method = product ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: data,
      });

      if (response.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const result = await response.json();
        setError(result.error || "Failed to save product");
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border-2 border-[#E5E7EB] p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-[#1F2937] mb-2">
            Product Name *
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#C084FC] focus:ring-4 focus:ring-[#C084FC]/20"
            placeholder="e.g., Lavender Dreams Soap"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-[#1F2937] mb-2">
            Description *
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#C084FC] focus:ring-4 focus:ring-[#C084FC]/20 min-h-24"
            placeholder="Describe your soap..."
            required
          />
        </div>

        {/* Price & Stock */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="price" className="block text-sm font-semibold text-[#1F2937] mb-2">
              Price ($) *
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#C084FC] focus:ring-4 focus:ring-[#C084FC]/20"
              required
            />
          </div>
          <div>
            <label htmlFor="stock" className="block text-sm font-semibold text-[#1F2937] mb-2">
              Stock *
            </label>
            <input
              id="stock"
              type="number"
              min="0"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
              className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#C084FC] focus:ring-4 focus:ring-[#C084FC]/20"
              required
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-semibold text-[#1F2937] mb-2">
            Category *
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#C084FC] focus:ring-4 focus:ring-[#C084FC]/20"
            required
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block text-sm font-semibold text-[#1F2937] mb-2">
            Product Image
          </label>
          {imagePreview && (
            <div className="mb-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg border-2 border-[#E5E7EB]"
              />
            </div>
          )}
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#C084FC] focus:ring-4 focus:ring-[#C084FC]/20"
          />
          <p className="text-xs text-[#4B5563] mt-2">Recommended: 800x800px, JPG or PNG</p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-linear-to-r from-[#C084FC] to-[#A855F7] text-white font-bold py-3 px-6 rounded-lg hover:from-[#A855F7] hover:to-[#C084FC] transition-all duration-300 hover:shadow-lg disabled:opacity-50"
          >
            {loading ? "Saving..." : product ? "Update Product" : "Create Product"}
          </button>
          <Link
            href="/admin"
            className="px-6 py-3 border-2 border-[#E5E7EB] text-[#1F2937] font-semibold rounded-lg hover:bg-[#F9FAFB] transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
