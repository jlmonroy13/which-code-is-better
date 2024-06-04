import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export const connectMongoDB = async () => {
  if (MONGODB_URI) {
    try {
      await mongoose.connect(MONGODB_URI);
      console.log("MongoDB connected");
    } catch (error) {
      console.error("MongoDB connection error", error);
    }
  }
};

export default connectMongoDB;
