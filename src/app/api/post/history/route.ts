import { ReqFileType, ResFileType } from "./types";

export async function POST(req: Request) {
  try {
    const file = await req.json();
    const updFile: ResFileType[] = [];

    if (!file) {
      return Response.json({ message: "File is missing bud :)" });
    }

    for (let i = 0; i < file.length; i++) {
      const {
        ts,
        username,
        platform,
        ms_played,
        master_metadata_track_name: track_name,
        master_metadata_album_artist_name: artist_name,
        master_metadata_album_album_name: album_name,
        spotify_track_uri: track_uri,
        shuffle,
        skipped,
      } = file[i] as ReqFileType;

      updFile.push({
        ts,
        username,
        platform,
        ms_played,
        track_name,
        artist_name,
        album_name,
        track_uri,
        shuffle,
        skipped,
      });
    }

    return Response.json(updFile);
  } catch (error) {
    return Response.json({ message: "Something went wrong :(", error });
  }
}
