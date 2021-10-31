const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;
const uri =
  "mongodb+srv://dev_akash:A03041998@cluster0.awjiz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const run = async () => {
  try {
    await client.connect();

    const database = client.db("phoneBook");
    const people = database.collection("people");

    // const person = {
    //   name: "Md Atik Asif Khan Akash",
    //   phone: "01772966496",
    // };

    app.post("/users", async (req, res) => {
      const newPerson = req.body;
      console.log("got new user", req.body);
      console.log("hitting post");
      const result = await people.insertOne(newPerson);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
    });
  } finally {
    // await client.close();
  }
};

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log("Listening........");
});
