import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Database connected");
    });
  } catch (error) {
    console.log("Error connecting to database: ", error.message);
  }
}
