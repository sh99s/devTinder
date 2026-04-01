import dotenv from "dotenv";
dotenv.config();
// resume lecture 21 from 47.21 mins
import express from "express";
import { connectDB } from "./lib/database.js";
import { User } from "./models/User.js";

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, age, gender, emailId, password } = req.body;

    const user = new User({
      firstName,
      lastName,
      age,
      gender,
      emailId,
      password,
    });

    await user.save();
    res.status(200).send("User added to DB.");
  } catch (error) {
    res.status(400).send("Failed to add user to DB.");
  }
});

app.get("/user", async (req, res) => {
  try {
    const email = req.body.emailId;
    const user = await User.find({ emailId: email });

    if (!user) {
      res.status(404).send("user not found");
    } else {
      res.status(200).send(user);
    }
  } catch (err) {
    res.status(401).send("error while getting the user");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(401).send("unable to get the users");
  }
});

app.delete("/delete", async (req, res) => {
  try {
    const email = req.body.emailId;
    const user = await User.findOneAndDelete({ emailId: email });
    if (!user) {
      res.status(404).send("user not found");
    } else {
      res.status(200).send("user deleted successfully");
    }
  } catch (error) {
    res.status(404).send("user not found.");
  }
});

app.patch("/user", async (req, res) => {
  try {
    const id = req.body.id;
    const data = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, data);
    res.status(200).send("user upadated successfully.");
  } catch (error) {
    res.status(400).send("unable to update the user.");
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
