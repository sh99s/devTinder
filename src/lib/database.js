import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB is connected successfully");
  } catch (err) {
    console.error("Failed to connect to DB.");
    throw err;
  }
};
