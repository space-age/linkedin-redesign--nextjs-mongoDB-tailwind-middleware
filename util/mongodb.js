import { MongoClient } from "mongodb";

let uri = process.env.MONGODB_URI;
let dbName = process.env.MONGODB_DB;

let cachedClient = null;
let cachedDb = null;

// to protect ourselves incase there is no uri
if (!uri) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// to protect ourselves incase there is no dbName
if (!dbName) {
  throw new Error(
    "Please define the MONGODB_DB environment variable inside .env.local"
  );
}

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true, //must be set true
    useUnifiedTopology: true, //must be set true
  });

  const db = await client.db(dbName); //dbName is the databse name we want to access

  cachedClient = client; //cached so next time we want to conenct, we dont have to do it again, it will cached
  cachedDb = db; //cached so next time we want to conenct, we dont have to do it again, it will cached

  return { client, db };
}
