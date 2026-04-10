import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) throw new Error("Invalid Token");

    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

    const { _id } = decodedToken;

    const user = await User.findById(_id);

    if (!user) throw new Error("Invalid user.");
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
};
