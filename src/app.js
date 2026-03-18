import express from "express";

const app = express();

app.use("/", (req, res) => {
  res.send("Hi from server");
});

app.listen(3000, () => console.log("Listening on 3000"));
