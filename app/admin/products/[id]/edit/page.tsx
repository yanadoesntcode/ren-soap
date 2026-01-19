import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/src/lib/mongodb";
import { ObjectId } from "mongodb";
import ProductForm from "../../ProductForm";

async function checkAuth() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("admin_auth");
  
  if (!authCookie || authCookie.value !== "authenticated") {
    redirect("/admin/login");
  }
}

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  await checkAuth();
  const { id } = await params;

  let product = null;

  try {
    const { db } = await connectToDatabase();
    const result = await db.collection("products").findOne({ _id: new ObjectId(id) });

    if (result) {
      product = {
        id: result._id.toString(),
        name: result.name,
        description: result.description,
        price: result.price,
        category: result.category,
        stock: result.stock,
        image: result.image,
      };
    }
  } catch (error) {
    console.error("Failed to fetch product:", error);
  }

  if (!product) {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <header className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-4xl mx-auto px-8 py-4">
          <h1 className="text-2xl font-bold text-[#1F2937]">Edit Product</h1>
          <p className="text-sm text-[#4B5563] mt-1">Update product details</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-8 py-8">
        <ProductForm product={product} />
      </main>
    </div>
  );
}
