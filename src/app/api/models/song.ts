import mongoose, { Document, Schema } from "mongoose";

export interface ISong extends Document {
  ts: Date;
  username: String;
  platform: String;
  ms_played: Number;
  track_name: String;
  artist_name: String;
  album_name: String;
  songId: String;
  shuffle: Boolean;
  skipped: Boolean;
}

const songData: Schema = new mongoose.Schema({
  ts: Date,
  username: String,
  platform: String,
  ms_played: Number,
  track_name: String,
  artist_name: String,
  album_name: String,
  songId: String,
  shuffle: Boolean,
  skipped: Boolean,
});

const SongModel = () => mongoose.model<ISong>("SongObject", songData);

export default (mongoose.models.SongObject || SongModel()) as ReturnType<
  typeof SongModel
>;
