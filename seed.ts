import { connectToDatabase } from "./src/lib/mongodb.js";

async function seed() {
  try {
    console.log("🌱 Starting database seed...");
    const { db } = await connectToDatabase();

    // Create a sample collection with some soap products
    const productsCollection = db.collection("products");

    const sampleProducts = [
      {
        name: "Lavender Soap",
        description: "Relaxing lavender-scented natural soap",
        price: 8.99,
        stock: 50,
        createdAt: new Date(),
      },
      {
        name: "Charcoal Soap",
        description: "Detoxifying activated charcoal soap",
        price: 9.99,
        stock: 35,
        createdAt: new Date(),
      },
      {
        name: "Rose Petal Soap",
        description: "Gentle rose petal moisturizing soap",
        price: 7.99,
        stock: 60,
        createdAt: new Date(),
      },
      {
        name: "Eucalyptus Mint Soap",
        description: "Invigorating eucalyptus and mint soap",
        price: 8.99,
        stock: 45,
        createdAt: new Date(),
      },
    ];

    // Delete existing products (optional, remove if you want to keep them)
    await productsCollection.deleteMany({});

    // Insert sample products
    const result = await productsCollection.insertMany(sampleProducts);

    console.log(`✅ Successfully seeded ${result.insertedCount} products!`);
    console.log("📦 Products added:", result.insertedIds);

    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
}

seed();
