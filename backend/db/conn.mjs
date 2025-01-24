import { MongoClient, ServerApiVersion } from 'mongodb';
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.MONGODB_URI || " ", {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let conn;
  try {
      // Connect the client to the server	
      conn = await client.connect();
  }catch(e) {
        console.error(e);
  }

  let db = conn.db("sample_training");

export default db;