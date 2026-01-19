const { MongoClient } = require('mongodb');
const fs = require('fs');

const envContent = fs.readFileSync('.env.local', 'utf8');
const uri = envContent.trim().substring(envContent.indexOf('=') + 1);
const client = new MongoClient(uri);

async function check() {
  await client.connect();
  const db = client.db();
  const products = await db.collection('products').find({ 
    category: { $in: ['Herbal', 'Luxury'] } 
  }).toArray();
  
  console.log('Winter products:');
  products.forEach(p => console.log('-', p.name));
  
  await client.close();
}

check();
