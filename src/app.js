import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { adminAuth } from "./middlewares/adminAuth.js";
import { userAuth } from "./userAuth.js";

const app = express();

app.use(express.json());

app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res) => {
  res.send("All data fetched");
});

app.delete("/admin/deleteAllData", (req, res) => {
  res.send("All data erased");
});

app.get(
  "/user",
  userAuth,
  (req, res, next) => {
    throw new Error("Error inside /user route");
    console.log("auth middleware, ", Math.random() * 1000 + 1);
    next();
  },
  (req, res) => {
    console.log("signed in successfully");
    res.send(`Token: ${Math.random() * 1000 + 1}`);
  },
);

app.use("/", (err, req, res, next) => {
  res.status(500).send("some internal error has occured");
});

app.listen(3000, () => console.log("Listening on 3000"));
