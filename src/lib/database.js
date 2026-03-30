import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MongoDB_URL);
    console.log("DB is connected successfully.");
  } catch (error) {
    console.error("failed to connect to DB.");
  }
};
