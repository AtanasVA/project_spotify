import mongoose, { Error } from "mongoose";

const uri =
  "mongodb+srv://myatanasvasilev:RAOtuSRNsrzBlMrB@cluster0.zfet6yf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (error: Error) => {
  console.error(error);
});

export const connect = async () => {
  await mongoose.connect(uri);
};

export const disconnect = async () => {
  await mongoose.disconnect();
  console.log("MongoDB disconnected");
};
