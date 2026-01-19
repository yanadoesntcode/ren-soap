"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image?: string;
}

interface AdminDashboardProps {
  products: Product[];
  stats: {
    total: number;
    categories: Record<string, number>;
  };
}

export default function AdminDashboard({ products, stats }: AdminDashboardProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    setDeleting(id);
    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.refresh();
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      alert("Error deleting product");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#1F2937]">人 REN Admin</h1>
            <p className="text-sm text-[#4B5563]">Product Management System</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm text-[#4B5563] hover:text-[#C084FC] transition-colors"
            >
              View Store
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm bg-[#1F2937] text-white px-4 py-2 rounded-lg hover:bg-[#374151] transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB]">
            <div className="text-3xl font-bold text-[#C084FC] mb-2">{stats.total}</div>
            <div className="text-sm text-[#4B5563]">Total Products</div>
          </div>
          {Object.entries(stats.categories).slice(0, 3).map(([category, count]) => (
            <div key={category} className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB]">
              <div className="text-3xl font-bold text-[#A855F7] mb-2">{count}</div>
              <div className="text-sm text-[#4B5563]">{category}</div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#1F2937]">All Products</h2>
          <Link
            href="/admin/products/new"
            className="bg-linear-to-r from-[#C084FC] to-[#A855F7] text-white font-bold px-6 py-3 rounded-lg hover:from-[#A855F7] hover:to-[#C084FC] transition-all duration-300 hover:shadow-lg"
          >
            + Add New Product
          </Link>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl border-2 border-[#E5E7EB] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#1F2937]">Product</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#1F2937]">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#1F2937]">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#1F2937]">Stock</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-[#1F2937]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {product.image && (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                        )}
                        <div>
                          <div className="font-medium text-[#1F2937]">{product.name}</div>
                          <div className="text-sm text-[#4B5563] line-clamp-1">{product.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#4B5563]">{product.category}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-[#1F2937]">${product.price}</td>
                    <td className="px-6 py-4 text-sm text-[#4B5563]">{product.stock}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="text-sm text-[#C084FC] hover:text-[#A855F7] font-medium transition-colors"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          disabled={deleting === product.id}
                          className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors disabled:opacity-50"
                        >
                          {deleting === product.id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
