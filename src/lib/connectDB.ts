import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

export const connectDB = async (): Promise<void> => {
  if (connection.isConnected) {
    return console.log("Using existing mongoose connection!");
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_URI || "");

    connection.isConnected = db.connections[0].readyState;

    console.log("MONGOOSE CONNECTED!");

  } catch (error) {
    console.log("SOMETHING WENT WRONG!", error);
    process.exit(1)
  }
};
