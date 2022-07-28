const Port = 8000;
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt");
const uri =
  "mongodb+srv://vince2004:Password@cluster0.7kf2vuy.mongodb.net/Cluster0?retryWrites=true&w=majority";

app.use(cors());
app.use(express.json());

//socket io chat
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// let users = [];

// const addUser = (userId, socketId) => {
//   !users.some((user) => user.userId === userId) &&
//     users.push({ userId, socketId });
// };

// io.on("connection", (socket) => {
//   console.log(`User connected: ${socket.id}`);

//   socket.on("addUser", (userId) => {
//     addUser(userId, socket.id);
//     io.emit("getUsers", users);
//   });
//   socket.on("disconnect", () => {
//     console.log("User Disconnected", socket.id);
//   });
// });

//signup
app.post("/signup", async (req, res) => {
  const client = new MongoClient(uri);
  const { email, password } = req.body;

  const userId = uuidv4();
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
      user_id: userId,
      email: dbEmail,
      password: hidePassword,
    };

    const newUser = await users.insertOne(data);

    const token = jwt.sign({ id: userId }, dbEmail, {
      expiresIn: "7d",
    });

    res.status(201).json({ token, userId });
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

    if (!user) {
      res.status(400).send("This account does not exist! Please try again.");
    }

    const correctPassword = await bcrypt.compare(password, user.password);

    if (user && correctPassword) {
      const token = jwt.sign({ id: user.user_id }, email, {
        expiresIn: "7d",
      });

      res.status(201).json({ token, userId: user.user_id });
    } else {
      res.status(400).send("Incorrect Password! Please try again.");
    }
  } catch (error) {
    console.log(error);
  }
});

//profile update
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
        socketId: "",
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
    console.log(formData.firstName);
  } catch (error) {
    console.log(error);
  }
});

//get user
app.get("/user", async (req, res) => {
  const client = new MongoClient(uri);
  const userId = req.query.userId;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const query = { user_id: userId };
    const returnedUser = await users.findOne(query);
    res.send(returnedUser);
  } catch (error) {
    console.log(error);
  }
});

//get swipes
app.get("/swipes", async (req, res) => {
  const client = new MongoClient(uri);
  const interest = req.query.instrumentInterest;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const query = { instrumentPlayed: interest };

    const returnedUsers = await users.find(query).toArray();
    const returnedAllUsers = await users.find().toArray();

    if (returnedUsers.length !== 0) {
      res.send(returnedUsers);
    } else {
      res.send(returnedAllUsers);
    }
  } catch (error) {
    console.log(error);
  }
});

//add match
app.put("/addmatch", async (req, res) => {
  const client = new MongoClient(uri);
  const { userId, matchedUserId } = req.body;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const query1 = { user_id: userId };
    const query2 = { user_id: matchedUserId };
    const updateDoc1 = {
      $push: { matches: { user_id: matchedUserId } },
    };
    const updateDoc2 = {
      $push: { matches: { user_id: userId } },
    };

    const user = await users.updateOne(query1, updateDoc1);
    const matchedUser = await users.updateOne(query2, updateDoc2);
    res.send({ user, matchedUser });
  } catch (error) {
    console.log(error);
  }
});

//get matches
app.get("/matches", async (req, res) => {
  const client = new MongoClient(uri);
  const userIds = JSON.parse(req.query.userIds);

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const pipeline = [
      {
        $match: {
          user_id: {
            $in: userIds,
          },
        },
      },
    ];
    const foundUsers = await users.aggregate(pipeline).toArray();
    res.send(foundUsers);
  } catch (error) {
    console.log(error);
  }
});

//get messages
app.get("/messages", async (req, res) => {
  const client = new MongoClient(uri);
  const { userId, otherUserId } = req.query;

  try {
    const database = client.db("app-data");
    const messages = database.collection("messages");

    const query = {
      from_user_id: userId,
      to_user_id: otherUserId,
    };

    const foundMessages = await messages.find(query).toArray();
    res.send(foundMessages);
  } catch (error) {
    console.log(error);
  }
});

//send messages
app.post("/messages", async (req, res) => {
  const client = new MongoClient(uri);
  const message = req.body.message;

  try {
    const database = client.db("app-data");
    const messages = database.collection("messages");
    const insertMessage = await messages.insertOne(message);
    res.send(insertMessage);
  } catch (error) {
    console.log(error);
  }
});

server.listen(Port, () => {
  console.log("server running on " + Port);
});
