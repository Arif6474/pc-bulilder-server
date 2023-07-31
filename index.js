const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

const cors = require("cors");

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1nnil13.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const db = client.db("pc-builder");
    const productsCollection = db.collection("products");
    console.log("DB connect successfully! ");

    // API
    app.get("/products", async (req, res) => {
      const cursor = productsCollection.find({});
      const books = await cursor.toArray();
      res.send(books);
    });

   
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Pc-builder!");
});

app.listen(port, () => {
  console.log(`Server Running app listening on port ${port}`);
});
