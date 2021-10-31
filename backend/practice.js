const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());

const port = 5000;

const uri =
  "mongodb+srv://dev_akash:A03041998@cluster0.awjiz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//with call back function
// client.connect((err) => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   console.log("hitting the database");

//   //data
//   const user = {
//     name: "Dev Akash",
//     email: "akash@gmail.com",
//     phone: "01772066496",
//   };
//   //data insertion
//   collection.insertOne(user).then(() => console.log("insert success"));

//   // client.close();
// });

//with async await function

async function run() {
  try {
    await client.connect();
    const database = client.db("foodMaster");
    const userCollection = database.collection("users");
    // create a document to insert
    // const users = {
    //   name: "Ashik Khan ",
    //   email: "ashik@gmail.com",
    //   phone: "01099999999",
    // };
    // const result = await userCollection.insertOne(users);
    // console.log(`A document was inserted with the _id: ${result.insertedId}`);

    //POST api
    app.post("/users", async (req, res) => {
      const newUser = req.body;
      const result = await userCollection.insertOne(newUser);

      console.log("hitting the  post", req.body);
      res.json(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log("listening");
});
