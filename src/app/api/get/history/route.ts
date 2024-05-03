import { connect, disconnect } from "../../lib/mongo";
import DataModel from "../../models/song";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const songFilter = searchParams.get("track_name");
  const artistFilter = searchParams.get("artist_name");
  await connect();

  // const query = new Query();
  // query.limit(10);
  // query.setOptions({ maxTimeMS: 1000 });
  // query.getOptions(); // { limit: 10, maxTimeMS: 1000 }

  const resp = await DataModel.find({
    $and: [
      { track_name: { $regex: songFilter, $options: "i" } },
      { artist_name: { $regex: artistFilter, $options: "i" } },
    ],
  });

  console.log("....query", resp);
  console.log("artistFilter", req.url);
  disconnect();

  return Response.json(resp);
}
