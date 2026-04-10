import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectDB } from "./lib/database.js";
import { User } from "./models/User.js";
import { signUpvalidation } from "./utils/validation.js";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { userAuth } from "./middlewares/userAuth.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, age, gender, emailId, password, skills } =
      req.body;

    // data validation
    signUpvalidation(req);

    // encryption of password

    const hashedPassword = await bcrypt.hash(password, 10);

    // saving data into DB

    const user = new User({
      firstName,
      lastName,
      age,
      gender,
      emailId,
      password: hashedPassword,
      skills,
    });

    await user.save();
    res.status(200).send("User added to DB.");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("invalid credentials.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    // create jwt token
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // attach jwt token to cookie and send the cookie to client
    res.cookie("token", token);
    res.status(200).send("Login Successful.");
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

app.get("/sendconnectionrequest", userAuth, (req, res) => {
  try {
    res
      .status(200)
      .send(`${req.user.firstName} has sent you the connection request.`);
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(3000, () => console.log("Server is listening on 3000"));
  } catch (error) {
    console.error(
      "Server is failed to start due to DB failure: " + error.message,
    );
    process.exit(1);
  }
};

startServer();
