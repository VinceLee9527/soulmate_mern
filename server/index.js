const Port = 8000;
const express = require("express");
const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://vince2004:Password@cluster0.7kf2vuy.mongodb.net/Cluster0?retryWrites=true&w=majority";

const app = express();

app.get("/", (req, res) => {
  res.json("Hello");
});

app.post("/signup", (req, res) => {
  res.json("Hello");
});

app.get("/users", async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const returnedUsers = await users.find().toArray();
    res.send(returnedUsers);
  } catch (error) {
    console.log(error);
  }
});

app.listen(Port, () => {
  console.log("server running on " + Port);
});
