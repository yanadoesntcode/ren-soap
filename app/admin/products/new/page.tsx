import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import ProductForm from "../ProductForm";

async function checkAuth() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("admin_auth");
  
  if (!authCookie || authCookie.value !== "authenticated") {
    redirect("/admin/login");
  }
}

export default async function NewProductPage() {
  await checkAuth();

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <header className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-4xl mx-auto px-8 py-4">
          <h1 className="text-2xl font-bold text-[#1F2937]">Add New Product</h1>
          <p className="text-sm text-[#4B5563] mt-1">Create a new soap product</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-8 py-8">
        <ProductForm />
      </main>
    </div>
  );
}
