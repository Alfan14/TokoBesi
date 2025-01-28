import { MongoClient, ServerApiVersion } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI || " ", {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  connectTimeoutMS: 30000,    
  socketTimeoutMS: 30000,     
  family: 4,        
});

let db;
   
export const getDatabase = async () => {
  if (!db) {
    try {
      await client.connect();
      console.log("Connected to DB");
      db = client.db("sample_training");
    } catch (error) {
      console.error("Error connecting to the database", error);
      throw error;
    }
  }
  return db;
};