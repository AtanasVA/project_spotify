import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  username: String;
  streamYears: [String];
  platforms: [String];
}

const userData: Schema = new mongoose.Schema({
  username: String,
  streamYears: [String],
  platforms: [String],
});

const UserModel = () => mongoose.model<IUser>("UserObject", userData);

export default (mongoose.models.UserObject || UserModel()) as ReturnType<
  typeof UserModel
>;
