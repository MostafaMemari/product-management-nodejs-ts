import mongoose from "mongoose";

export function connectMongoDB(DB_URL: string | undefined): void {
  console.log(DB_URL);
  mongoose
    .connect(`${DB_URL}`)
    .then(() => console.log("connected to DB!"))
    .catch((err) => console.log(err.message));

  mongoose.connection.on("disconnected", () => {
    console.log("mongoose connection is disconnected");
  });

  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log("disconnected");

    process.exit(0);
  });
}
