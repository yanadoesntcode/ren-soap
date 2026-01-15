const { MongoClient } = require("mongodb");
const fs = require("fs");
const path = require("path");

// Load .env.local
const envPath = path.join(__dirname, ".env.local");
const envContent = fs.readFileSync(envPath, "utf-8");
const lines = envContent.split("\n");
lines.forEach((line) => {
  if (line && !line.startsWith("#")) {
    const [key, ...valueParts] = line.split("=");
    const value = valueParts.join("=").trim();
    process.env[key.trim()] = value;
  }
});

const MONGODB_URI = process.env.MONGODB_URI;

console.log("📋 MongoDB URI loaded:", MONGODB_URI?.substring(0, 50) + "...");

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

async function seed() {
  const client = new MongoClient(MONGODB_URI);

  try {
    console.log("🌱 Starting database seed...");
    await client.connect();
    const db = client.db();

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

    // Delete existing products
    const deleteResult = await productsCollection.deleteMany({});
    console.log(`🗑️  Deleted ${deleteResult.deletedCount} existing products`);

    // Insert sample products
    const result = await productsCollection.insertMany(sampleProducts);

    console.log(`✅ Successfully seeded ${result.insertedCount} products!`);
    console.log("📦 Products added:", Object.values(result.insertedIds));

    await client.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
}

seed();
