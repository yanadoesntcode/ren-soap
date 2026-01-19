const { MongoClient } = require('mongodb');
const fs = require('fs');

// Read .env.local manually
const envContent = fs.readFileSync('.env.local', 'utf8');
const line = envContent.trim();
const uri = line.substring(line.indexOf('=') + 1);

console.log('Testing MongoDB connection...');
console.log('URI:', uri?.substring(0, 50) + '...');

const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 5000,
});

async function testConnection() {
  try {
    console.log('Connecting...');
    await client.connect();
    console.log('✅ Connected successfully!');
    
    const db = client.db();
    console.log('Database name:', db.databaseName);
    
    const collections = await db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
    
    const products = await db.collection('products').find({}).limit(3).toArray();
    console.log('Sample products:', products.length);
    
    await client.close();
  } catch (error) {
    console.error('❌ Connection failed:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    if (error.cause) {
      console.error('Cause:', error.cause.message);
    }
  }
}

testConnection();
