import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { connectDB } from "./lib/database.js";
import { User } from "./models/User.js";

const app = express();

app.post("/signup", async (req, res) => {
  try {
    const user = new User({
      firstName: "Saurabh",
      lastName: "Sharma",
      emailId: "saurabh@111",
      password: "123",
      age: 24,
    });

    await user.save();
    res.status(200).send("User added to DB.");
  } catch (error) {
    res.status(400).send("Failed to add user to DB.");
  }
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(3000, () => console.log("Server is listening on 3000"));
  } catch (error) {
    console.error("Server is failed to start due to DB failure");
    process.exit(1);
  }
};

startServer();
