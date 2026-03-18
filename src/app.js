import express from "express";

const app = express();

app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  const { age, name } = req.query;
  res.send({
    name,
    age,
    id,
  });
});

app.post("/user", (req, res) => {
  res.send("user added successfully");
});

app.delete("/user", (req, res) => {
  res.send("user deleted successfully");
});

app.use("/", (req, res) => {
  res.send("Hi from server");
});

app.listen(3000, () => console.log("Listening on 3000"));
