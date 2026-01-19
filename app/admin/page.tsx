import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/src/lib/mongodb";
import AdminDashboard from "./AdminDashboard";

async function checkAuth() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("admin_auth");
  
  if (!authCookie || authCookie.value !== "authenticated") {
    redirect("/admin/login");
  }
}

export default async function AdminPage() {
  await checkAuth();

  let products: any[] = [];
  let stats = { total: 0, categories: {} };

  try {
    const { db } = await connectToDatabase();
    const result = await db.collection("products").find({}).sort({ createdAt: -1 }).toArray();

    products = result.map((p: any) => ({
      id: p._id.toString(),
      name: p.name,
      description: p.description,
      price: p.price,
      category: p.category,
      stock: p.stock,
      image: p.image,
    }));

    stats.total = products.length;
    stats.categories = products.reduce((acc: any, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {});
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  return <AdminDashboard products={products} stats={stats} />;
}
