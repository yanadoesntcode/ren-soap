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
        ingredients: ["Organic Lavender Oil", "Shea Butter", "Coconut Oil", "Olive Oil", "Lavender Buds", "Essential Oils"],
        longDescription: "Immerse yourself in the calming essence of pure lavender fields. Our handcrafted Lavender Soap combines premium organic lavender oil with nourishing shea butter to create a luxurious bathing experience. Perfect for evening relaxation and promoting restful sleep.",
        reviews: [
          { name: "Sarah M.", rating: 5, comment: "This soap smells amazing! Helps me relax before bed.", date: "2025-12-15" },
          { name: "Mike T.", rating: 5, comment: "Best lavender soap I've ever used. Very moisturizing!", date: "2025-12-20" },
          { name: "Emily R.", rating: 4, comment: "Love the scent, lasts a long time.", date: "2026-01-05" }
        ],
        createdAt: new Date(),
      },
      {
        name: "Rose Petal Soap",
        description: "Gentle rose petal moisturizing soap",
        category: "Floral",
        price: 7.99,
        stock: 60,
        ingredients: ["Rose Petals", "Rose Hip Oil", "Coconut Oil", "Palm Oil", "Shea Butter", "Rose Essential Oil"],
        longDescription: "Experience the timeless elegance of roses with our gentle Rose Petal Soap. Infused with real rose petals and rose hip oil, this soap provides deep hydration while leaving your skin soft and delicately scented.",
        reviews: [
          { name: "Jessica L.", rating: 5, comment: "My skin feels so soft after using this! The rose scent is heavenly.", date: "2025-12-18" },
          { name: "Amanda K.", rating: 5, comment: "Beautiful packaging and even better product!", date: "2026-01-02" },
          { name: "Rachel P.", rating: 4, comment: "Very moisturizing, love it!", date: "2026-01-10" }
        ],
        createdAt: new Date(),
      },
      {
        name: "Jasmine Blossom Soap",
        description: "Exotic jasmine with delicate floral notes",
        category: "Floral",
        price: 9.49,
        stock: 40,
        ingredients: ["Jasmine Essential Oil", "Cocoa Butter", "Sweet Almond Oil", "Jasmine Flowers", "Vitamin E", "Glycerin"],
        longDescription: "Transport yourself to an exotic garden with our Jasmine Blossom Soap. The intoxicating aroma of jasmine flowers combined with nourishing cocoa butter creates a spa-like experience in your own home.",
        reviews: [
          { name: "Nina S.", rating: 5, comment: "The jasmine scent is so authentic and relaxing!", date: "2025-12-22" },
          { name: "Claire B.", rating: 4, comment: "Nice and gentle on my sensitive skin.", date: "2026-01-08" }
        ],
        createdAt: new Date(),
      },
      {
        name: "Cherry Blossom Soap",
        description: "Light and refreshing cherry blossom scent",
        category: "Floral",
        price: 8.49,
        stock: 55,
        ingredients: ["Cherry Blossom Extract", "Shea Butter", "Coconut Oil", "Aloe Vera", "Vitamin C", "Natural Fragrance"],
        longDescription: "Celebrate the beauty of spring year-round with our Cherry Blossom Soap. This light, refreshing formula with real cherry blossom extract rejuvenates your skin while providing gentle cleansing.",
        reviews: [
          { name: "Lily W.", rating: 5, comment: "Reminds me of spring in Japan! So fresh and clean.", date: "2025-12-28" },
          { name: "Sophie M.", rating: 5, comment: "Perfect for my morning shower routine.", date: "2026-01-12" }
        ],
        createdAt: new Date(),
      },
      
      // Herbal Collection
      {
        name: "Eucalyptus Mint Soap",
        description: "Invigorating eucalyptus and mint soap",
        category: "Herbal",
        price: 8.99,
        stock: 45,
        ingredients: ["Eucalyptus Oil", "Peppermint Oil", "Tea Tree Oil", "Coconut Oil", "Olive Oil", "Menthol"],
        longDescription: "Awaken your senses with our refreshing Eucalyptus Mint Soap. The cooling combination of eucalyptus and peppermint provides an invigorating shower experience while clarifying and rejuvenating your skin.",
        reviews: [
          { name: "David H.", rating: 5, comment: "Perfect morning wake-up soap! So refreshing.", date: "2025-12-25" },
          { name: "Tom R.", rating: 5, comment: "Love the tingly sensation, clears my sinuses too!", date: "2026-01-03" }
        ],
        createdAt: new Date(),
      },
      {
        name: "Rosemary Sage Soap",
        description: "Aromatic herbal blend for clarity and focus",
        category: "Herbal",
        price: 8.49,
        stock: 38,
        ingredients: ["Rosemary Extract", "Sage Oil", "Hemp Seed Oil", "Activated Charcoal", "Green Clay", "Herbal Blend"],
        longDescription: "Enhance your mental clarity with our Rosemary Sage Soap. This aromatic blend combines powerful herbs known for their clarifying properties, making it perfect for your morning routine.",
        reviews: [
          { name: "Mark S.", rating: 4, comment: "Great herbal scent, not too overpowering.", date: "2025-12-30" },
          { name: "Alex J.", rating: 5, comment: "Helps me feel more focused in the morning!", date: "2026-01-11" }
        ],
        createdAt: new Date(),
      },
      {
        name: "Tea Tree Soap",
        description: "Purifying tea tree oil for clear skin",
        category: "Herbal",
        price: 9.99,
        stock: 42,
        ingredients: ["Tea Tree Oil", "Eucalyptus Oil", "Neem Oil", "Witch Hazel", "Charcoal", "Clay"],
        longDescription: "Combat blemishes naturally with our Tea Tree Soap. Formulated with pure tea tree oil and complementary purifying ingredients, this soap helps keep skin clear and healthy.",
        reviews: [
          { name: "Megan D.", rating: 5, comment: "My skin has never looked better! Cleared up my acne.", date: "2026-01-01" },
          { name: "Chris P.", rating: 5, comment: "Best face soap ever. Works wonders!", date: "2026-01-09" }
        ],
        createdAt: new Date(),
      },
      {
        name: "Lemongrass Soap",
        description: "Uplifting citrus and herbal fusion",
        category: "Herbal",
        price: 7.99,
        stock: 50,
        ingredients: ["Lemongrass Oil", "Citrus Extract", "Coconut Oil", "Olive Oil", "Vitamin E", "Lemon Peel"],
        longDescription: "Energize your day with our bright and uplifting Lemongrass Soap. The citrus-herbal blend cleanses thoroughly while leaving your skin feeling fresh and revitalized.",
        reviews: [
          { name: "Kelly F.", rating: 5, comment: "Such a fresh, clean scent! Love it!", date: "2025-12-27" },
          { name: "Ryan M.", rating: 4, comment: "Very refreshing, great for summer showers.", date: "2026-01-06" }
        ],
        createdAt: new Date(),
      },

      // Luxury Collection
      {
        name: "Charcoal Soap",
        description: "Detoxifying activated charcoal soap",
        category: "Luxury",
        price: 9.99,
        stock: 35,
        ingredients: ["Activated Charcoal", "Bentonite Clay", "Tea Tree Oil", "Coconut Oil", "Shea Butter", "Eucalyptus Oil"],
        longDescription: "Purify and detoxify with our premium Charcoal Soap. Activated charcoal draws out impurities while bentonite clay provides deep cleansing, leaving your skin feeling refreshed and renewed.",
        reviews: [
          { name: "Jordan K.", rating: 5, comment: "This soap is a game-changer! My pores look smaller.", date: "2025-12-29" },
          { name: "Taylor B.", rating: 5, comment: "Love how clean my skin feels after using this!", date: "2026-01-07" }
        ],
        createdAt: new Date(),
      },
      {
        name: "Gold & Honey Soap",
        description: "Luxurious 24k gold flakes with raw honey",
        category: "Luxury",
        price: 12.99,
        stock: 25,
        ingredients: ["24k Gold Flakes", "Raw Honey", "Royal Jelly", "Manuka Honey", "Argan Oil", "Vitamin C"],
        longDescription: "Indulge in pure luxury with our Gold & Honey Soap. Real 24k gold flakes combine with raw honey's natural antibacterial properties for a truly opulent cleansing experience.",
        reviews: [
          { name: "Victoria L.", rating: 5, comment: "Feels so luxurious! My skin glows after using it.", date: "2026-01-04" },
          { name: "Isabella R.", rating: 5, comment: "Worth every penny. Best gift I've received!", date: "2026-01-13" }
        ],
        createdAt: new Date(),
      },
      {
        name: "Dead Sea Mud Soap",
        description: "Mineral-rich Dead Sea mud for deep cleansing",
        category: "Luxury",
        price: 11.49,
        stock: 30,
        ingredients: ["Dead Sea Mud", "Dead Sea Salt", "Aloe Vera", "Jojoba Oil", "Vitamin E", "Essential Minerals"],
        longDescription: "Experience the therapeutic benefits of the Dead Sea with our mineral-rich mud soap. Packed with over 20 essential minerals, this soap deeply cleanses while nourishing your skin.",
        reviews: [
          { name: "Nathan W.", rating: 5, comment: "My skin has never felt so clean and smooth!", date: "2026-01-02" },
          { name: "Olivia S.", rating: 4, comment: "Great for my skin condition, really helps!", date: "2026-01-14" }
        ],
        createdAt: new Date(),
      },
      {
        name: "Silk & Shea Butter Soap",
        description: "Creamy silk protein with pure shea butter",
        category: "Luxury",
        price: 10.99,
        stock: 28,
        ingredients: ["Silk Protein", "Shea Butter", "Cocoa Butter", "Mango Butter", "Silk Amino Acids", "Vitamin E"],
        longDescription: "Pamper your skin with our ultra-moisturizing Silk & Shea Butter Soap. Silk proteins provide a luxurious lather while shea butter deeply nourishes for silky-smooth skin.",
        reviews: [
          { name: "Emma G.", rating: 5, comment: "So creamy and moisturizing! Perfect for winter.", date: "2025-12-31" },
          { name: "Ava M.", rating: 5, comment: "My dry skin loves this soap!", date: "2026-01-11" }
        ],
        createdAt: new Date(),
      },

      // Gift Sets
      {
        name: "Floral Collection Gift Set",
        description: "4 premium floral soaps beautifully packaged",
        category: "Gift Sets",
        price: 32.99,
        stock: 20,
        ingredients: ["Includes: Lavender, Rose Petal, Jasmine, and Cherry Blossom Soaps"],
        longDescription: "Perfect for the flower lover in your life! This beautifully curated gift set includes our four most beloved floral soaps, each crafted with natural ingredients and packaged in an elegant gift box.",
        reviews: [
          { name: "Lisa W.", rating: 5, comment: "Bought this for my mom, she absolutely loved it!", date: "2025-12-26" },
          { name: "Patricia H.", rating: 5, comment: "Beautiful packaging, high quality soaps!", date: "2026-01-04" }
        ],
        createdAt: new Date(),
      },
      {
        name: "Herbal Wellness Set",
        description: "3 invigorating herbal soaps in a gift box",
        category: "Gift Sets",
        price: 24.99,
        stock: 18,
        ingredients: ["Includes: Eucalyptus Mint, Tea Tree, and Lemongrass Soaps"],
        longDescription: "Wellness in a box! This refreshing trio features our most popular herbal soaps, perfect for anyone seeking natural, energizing skincare solutions.",
        reviews: [
          { name: "Michael B.", rating: 5, comment: "Great gift for my gym buddy!", date: "2026-01-03" },
          { name: "Daniel K.", rating: 4, comment: "Love the variety, very refreshing!", date: "2026-01-09" }
        ],
        createdAt: new Date(),
      },
      {
        name: "Luxury Spa Collection",
        description: "Premium luxury soaps in elegant packaging",
        category: "Gift Sets",
        price: 44.99,
        stock: 15,
        ingredients: ["Includes: Gold & Honey, Dead Sea Mud, Charcoal, and Silk & Shea Butter Soaps"],
        longDescription: "The ultimate indulgence! Our Luxury Spa Collection brings the spa experience home with four of our most premium soaps, beautifully presented in a deluxe gift box.",
        reviews: [
          { name: "Catherine S.", rating: 5, comment: "This is the PERFECT luxury gift! Everyone loves it.", date: "2025-12-30" },
          { name: "Jennifer L.", rating: 5, comment: "Treated myself to this, worth every penny!", date: "2026-01-08" }
        ],
        createdAt: new Date(),
      },
      {
        name: "Seasonal Sampler Set",
        description: "6 best-selling soaps to try all varieties",
        category: "Gift Sets",
        price: 39.99,
        stock: 22,
        ingredients: ["Variety pack including Floral, Herbal, Luxury, and Gen Z soaps"],
        longDescription: "Can't decide? Try them all! Our Seasonal Sampler includes six of our bestselling soaps across all collections, perfect for discovering your new favorite or gifting variety.",
        reviews: [
          { name: "Samantha T.", rating: 5, comment: "Great way to try different scents before committing!", date: "2026-01-05" },
          { name: "Robert M.", rating: 5, comment: "Everyone in the family found a favorite!", date: "2026-01-12" }
        ],
        createdAt: new Date(),
      },

      // Gen Z Collection - Coffee Shop Vibes
      {
        name: "Caramel Frappé Soap",
        description: "Sweet caramel coffee-inspired soap",
        category: "Gen Z",
        price: 10.99,
        stock: 45,
        ingredients: ["Caramel Extract", "Coffee Grounds", "Vanilla Oil", "Coconut Oil", "Brown Sugar", "Caffeine"],
        longDescription: "Get your caffeine fix in the shower! Our Caramel Frappé Soap combines real coffee grounds with sweet caramel for an energizing, exfoliating experience that smells good enough to drink.",
        reviews: [
          { name: "Zoe P.", rating: 5, comment: "OMG this smells exactly like my fave Starbucks drink!", date: "2026-01-10" },
          { name: "Blake H.", rating: 5, comment: "Obsessed! Makes my morning shower so much better.", date: "2026-01-13" }
        ],
        createdAt: new Date(),
      },
      {
        name: "Peppermint Latte Soap",
        description: "Cool peppermint with creamy vanilla undertones",
        category: "Gen Z",
        price: 10.99,
        stock: 50,
        ingredients: ["Peppermint Oil", "Espresso Extract", "Vanilla Bean", "Coconut Cream", "Cocoa Butter", "Menthol"],
        longDescription: "Cozy vibes only! This peppermint latte-scented soap brings the coffeehouse home. The cooling mint and warm vanilla combo is literally everything.",
        reviews: [
          { name: "Madison R.", rating: 5, comment: "Perfect for winter! The minty fresh vibe is chef's kiss.", date: "2026-01-08" },
          { name: "Hunter S.", rating: 4, comment: "So refreshing, love the coffee scent!", date: "2026-01-12" }
        ],
        createdAt: new Date(),
      },
      {
        name: "Mocha Swirl Soap",
        description: "Rich chocolate and espresso blend",
        category: "Gen Z",
        price: 10.99,
        stock: 42,
        ingredients: ["Cocoa Powder", "Espresso Oil", "Dark Chocolate Extract", "Shea Butter", "Coffee Grounds", "Vanilla"],
        longDescription: "Calling all chocolate lovers! Our Mocha Swirl Soap is giving rich, decadent, main character energy. Smells like a chocolate mocha and exfoliates like a dream.",
        reviews: [
          { name: "Parker L.", rating: 5, comment: "This soap hits different! Smells amazing!", date: "2026-01-09" },
          { name: "Riley T.", rating: 5, comment: "No bc this is actually perfect?? 10/10", date: "2026-01-14" }
        ],
        createdAt: new Date(),
      },
      {
        name: "Sugar Cookie Soap",
        description: "Sweet vanilla sugar cookie freshness",
        category: "Gen Z",
        price: 10.99,
        stock: 48,
        ingredients: ["Vanilla Extract", "Brown Sugar", "Butter Extract", "Almond Oil", "Cinnamon", "Honey"],
        longDescription: "Giving cozy home-baked vibes! This Sugar Cookie Soap smells like fresh-baked cookies and makes your skin soft AF. Perfect for that sweet treat without the calories.",
        reviews: [
          { name: "Skylar M.", rating: 5, comment: "I'm literally obsessed. Smells like Christmas morning!", date: "2026-01-05" },
          { name: "Casey B.", rating: 5, comment: "Best soap ever!! Everyone asks what I'm wearing.", date: "2026-01-11" }
        ],
        createdAt: new Date(),
      },
      {
        name: "Cranberry White Mocha Soap",
        description: "Festive cranberry with white chocolate notes",
        category: "Gen Z",
        price: 11.49,
        stock: 38,
        ingredients: ["Cranberry Extract", "White Chocolate", "Espresso Oil", "Shea Butter", "Vanilla", "Berry Oils"],
        longDescription: "Holiday vibes all year! This Cranberry White Mocha Soap is giving festive queen energy. The tart cranberry with sweet white chocolate? *Chef's kiss*",
        reviews: [
          { name: "Quinn D.", rating: 5, comment: "This is THE holiday soap!! So obsessed!", date: "2026-01-06" },
          { name: "Avery K.", rating: 4, comment: "Unique scent, love it! Not your basic soap.", date: "2026-01-12" }
        ],
        createdAt: new Date(),
      },
      
      // The Guido Special
      {
        name: "Teen Spirit Soap",
        description: "Fresh deodorant-inspired clean scent",
        category: "Gen Z",
        price: 9.99,
        stock: 100,
        ingredients: ["Fresh Linen Extract", "Clean Musk", "Powder Fragrance", "Aloe Vera", "Tea Tree Oil", "Eucalyptus"],
        longDescription: "The iconic scent that defined a generation! Our Teen Spirit Soap captures that fresh, just-out-of-the-shower clean feeling. Nostalgic yet modern, it's the ultimate throwback vibe.",
        reviews: [
          { name: "Morgan P.", rating: 5, comment: "The nostalgia is real! Smells exactly like the deodorant!", date: "2026-01-07" },
          { name: "Jordan C.", rating: 5, comment: "Nirvana would approve. This soap slaps!", date: "2026-01-10" },
          { name: "Dakota R.", rating: 5, comment: "Peak 90s vibes, I'm here for it!", date: "2026-01-13" }
        ],
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
