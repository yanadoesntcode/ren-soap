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
      // Floral Collection
      {
        name: "Lavender Soap",
        description: "Relaxing lavender-scented natural soap",
        category: "Floral",
        price: 8.99,
        stock: 50,
        createdAt: new Date(),
      },
      {
        name: "Rose Petal Soap",
        description: "Gentle rose petal moisturizing soap",
        category: "Floral",
        price: 7.99,
        stock: 60,
        createdAt: new Date(),
      },
      {
        name: "Jasmine Blossom Soap",
        description: "Exotic jasmine with delicate floral notes",
        category: "Floral",
        price: 9.49,
        stock: 40,
        createdAt: new Date(),
      },
      {
        name: "Cherry Blossom Soap",
        description: "Light and refreshing cherry blossom scent",
        category: "Floral",
        price: 8.49,
        stock: 55,
        createdAt: new Date(),
      },
      
      // Herbal Collection
      {
        name: "Eucalyptus Mint Soap",
        description: "Invigorating eucalyptus and mint soap",
        category: "Herbal",
        price: 8.99,
        stock: 45,
        createdAt: new Date(),
      },
      {
        name: "Rosemary Sage Soap",
        description: "Aromatic herbal blend for clarity and focus",
        category: "Herbal",
        price: 8.49,
        stock: 38,
        createdAt: new Date(),
      },
      {
        name: "Tea Tree Soap",
        description: "Purifying tea tree oil for clear skin",
        category: "Herbal",
        price: 9.99,
        stock: 42,
        createdAt: new Date(),
      },
      {
        name: "Lemongrass Soap",
        description: "Uplifting citrus and herbal fusion",
        category: "Herbal",
        price: 7.99,
        stock: 50,
        createdAt: new Date(),
      },

      // Luxury Collection
      {
        name: "Charcoal Soap",
        description: "Detoxifying activated charcoal soap",
        category: "Luxury",
        price: 9.99,
        stock: 35,
        createdAt: new Date(),
      },
      {
        name: "Gold & Honey Soap",
        description: "Luxurious 24k gold flakes with raw honey",
        category: "Luxury",
        price: 12.99,
        stock: 25,
        createdAt: new Date(),
      },
      {
        name: "Dead Sea Mud Soap",
        description: "Mineral-rich Dead Sea mud for deep cleansing",
        category: "Luxury",
        price: 11.49,
        stock: 30,
        createdAt: new Date(),
      },
      {
        name: "Silk & Shea Butter Soap",
        description: "Creamy silk protein with pure shea butter",
        category: "Luxury",
        price: 10.99,
        stock: 28,
        createdAt: new Date(),
      },

      // Gift Sets
      {
        name: "Floral Collection Gift Set",
        description: "4 premium floral soaps beautifully packaged",
        category: "Gift Sets",
        price: 32.99,
        stock: 20,
        createdAt: new Date(),
      },
      {
        name: "Herbal Wellness Set",
        description: "3 invigorating herbal soaps in a gift box",
        category: "Gift Sets",
        price: 24.99,
        stock: 18,
        createdAt: new Date(),
      },
      {
        name: "Luxury Spa Collection",
        description: "Premium luxury soaps in elegant packaging",
        category: "Gift Sets",
        price: 44.99,
        stock: 15,
        createdAt: new Date(),
      },
      {
        name: "Seasonal Sampler Set",
        description: "6 best-selling soaps to try all varieties",
        category: "Gift Sets",
        price: 39.99,
        stock: 22,
        createdAt: new Date(),
      },

      // Gen Z Collection - Coffee Shop Vibes
      {
        name: "Caramel Frappé Soap",
        description: "Sweet caramel coffee-inspired soap",
        category: "Gen Z",
        price: 10.99,
        stock: 45,
        createdAt: new Date(),
      },
      {
        name: "Peppermint Latte Soap",
        description: "Cool peppermint with creamy vanilla undertones",
        category: "Gen Z",
        price: 10.99,
        stock: 50,
        createdAt: new Date(),
      },
      {
        name: "Mocha Swirl Soap",
        description: "Rich chocolate and espresso blend",
        category: "Gen Z",
        price: 10.99,
        stock: 42,
        createdAt: new Date(),
      },
      {
        name: "Sugar Cookie Soap",
        description: "Sweet vanilla sugar cookie freshness",
        category: "Gen Z",
        price: 10.99,
        stock: 48,
        createdAt: new Date(),
      },
      {
        name: "Cranberry White Mocha Soap",
        description: "Festive cranberry with white chocolate notes",
        category: "Gen Z",
        price: 11.49,
        stock: 38,
        createdAt: new Date(),
      },
      
      // The Guido Special
      {
        name: "Teen Spirit Soap",
        description: "Fresh deodorant-inspired clean scent",
        category: "Gen Z",
        price: 9.99,
        stock: 100,
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
