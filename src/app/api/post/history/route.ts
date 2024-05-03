import { connect, disconnect } from "../../lib/mongo";
import SongModel from "../../models/song";
import UserModel from "../../models/users";
import { ReqFileType, ResFileType } from "./types";

export async function POST(req: Request) {
  const file = await req.json();

  if (!file) {
    return Response.json({ message: "File is missing bud :)" });
  }

  await connect();
  try {
    let userId: string | undefined;
    let years: number[] = [];
    let devices: string[] = [];
    const updFile: ResFileType[] = [];

    for (let i = 0; i < file.length; i++) {
      const {
        ts,
        username,
        platform,
        ms_played,
        master_metadata_track_name: track_name,
        master_metadata_album_artist_name: artist_name,
        master_metadata_album_album_name: album_name,
        spotify_track_uri,
        shuffle,
        skipped,
      } = file[i] as ReqFileType;

      if (!spotify_track_uri) {
        continue;
      }

      const date = new Date(ts);
      const year = date.getFullYear();

      if (!userId) {
        userId = username;
      }

      if (!years.includes(year)) {
        years?.push(year);
      }

      if (!devices.includes(platform)) {
        devices?.push(platform);
      }

      const track_uri = spotify_track_uri.split(":");
      const songId = track_uri[2] as string;

      updFile.push({
        ts,
        username,
        platform,
        ms_played,
        track_name,
        artist_name,
        album_name,
        songId,
        shuffle,
        skipped,
      });
    }
    console.log("userId", userId);
    console.log("year", years);
    console.log("devices", devices);

    await UserModel.create({
      username: userId,
      streamYears: years,
      platforms: devices,
    });

    await SongModel.create(updFile);

    console.log("Saved to base >>");
    disconnect();
    return Response.json(updFile);
  } catch (error) {
    disconnect();
    return Response.json({ message: "Something went wrong :(", error });
  }
}
