const Port = 8000;
const express = require("express");
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt");
const uri =
  "mongodb+srv://vince2004:Password@cluster0.7kf2vuy.mongodb.net/Cluster0?retryWrites=true&w=majority";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello");
});

//signup
app.post("/signup", async (req, res) => {
  const client = new MongoClient(uri);
  const { email, password } = req.body;

  const newUserId = uuidv4();
  const hidePassword = await bcrypt.hash(password, 10);

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");
    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return res.status(409).send("User already exists! Please log in.");
    }

    const dbEmail = email.toLowerCase();

    const data = {
      user_id: newUserId,
      email: dbEmail,
      password: hidePassword,
    };

    const newUser = await users.insertOne(data);

    const token = jwt.sign(newUser, dbEmail, {
      expiresIn: 60 * 24,
    });

    res.status(201).json({ token, newUserId });
    console.log(newUserId);
  } catch (error) {
    console.log(error);
  }
});

//login
app.post("/login", async (req, res) => {
  const client = new MongoClient(uri);
  const { email, password } = req.body;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const user = await users.findOne({ email });

    const correctPassword = await bcrypt.compare(password, user.password);

    if (user && correctPassword) {
      const token = jwt.sign(user, email, { expiresIn: 60 * 24 });

      res.status(201).json({ token, userId: user.user_id });
    }
    res.status(400).send("Invalid Credentials");
  } catch (error) {
    console.log(error);
  }
});

app.put("/user", async (req, res) => {
  const client = new MongoClient(uri);
  const formData = req.body.formData;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const query = { user_id: formData.user_id };
    const updateDoc = {
      $set: {
        firstName: formData.firstName,
        dobDay: formData.dobDay,
        dobMonth: formData.dobMonth,
        dobYear: formData.dobYear,
        gender: formData.gender,
        showGender: formData.showGender,
        instrumentPlayed: formData.instrumentPlayed,
        instrumentInterest: formData.instrumentInterest,
        url: formData.url,
        about: formData.about,
        matches: formData.matches,
      },
    };
    const updatedUser = await users.updateOne(query, updateDoc);
    res.send(updatedUser);
  } catch (error) {
    console.log(error);
  }
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
