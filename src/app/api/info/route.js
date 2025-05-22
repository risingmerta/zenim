import { connectDB } from "@/lib/mongoClient";
import axios from "axios";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const epi = searchParams.get("epi") === "true";
    const random = searchParams.get("random") === "true";

    const apis = [
      "https://api.shoko.fun/api",
      "https://api2.shoko.fun/api",
      "https://api3.shoko.fun/api",
    ];
    const api_url = apis[Math.floor(Math.random() * apis.length)];

    const db = await connectDB();
    const animeInfoCol = db.collection("animeInfo");

    // Handle random
    if (random) {
      const allDocs = await animeInfoCol.find({}).project({ _id: 1 }).toArray();
      if (!allDocs.length)
        return new Response("No entries found", { status: 404 });

      const randomDoc = allDocs[Math.floor(Math.random() * allDocs.length)];
      const randomData = await animeInfoCol.findOne({ _id: randomDoc._id });

      return Response.json(randomData.info.results);
    }

    if (!id) {
      return new Response("Missing ID", { status: 400 });
    }

    let doc = await animeInfoCol.findOne({ _id: id });

    if (!doc) {
      return new Response("Anime not found", { status: 404 });
    }

    let infoData = doc.info?.results;
    let episodeData = doc.episode?.results;

    // Fetch and store missing info
    if (!infoData?.data?.title) {
      try {
        const fallbackInfo = await axios.get(`${api_url}/info?id=${id}`);
        infoData = fallbackInfo.data.results;

        await animeInfoCol.updateOne(
          { _id: id },
          { $set: { "info.results": infoData } }
        );
      } catch (err) {
        console.error("Error fetching fallback info:", err.message);
      }
    }

    // Fetch and store missing episodes
    if (
      epi &&
      (!episodeData?.episodes?.[0]?.title || !episodeData.episodes?.length)
    ) {
      try {
        const fallbackEpisodes = await axios.get(`${api_url}/episodes/${id}`);
        episodeData = fallbackEpisodes.data.results;

        await animeInfoCol.updateOne(
          { _id: id },
          { $set: { "episode.results": episodeData } }
        );
      } catch (err) {
        console.error("Error fetching fallback episodes:", err.message);
      }
    }

    const respo = epi ? episodeData : infoData;

    return Response.json(respo);
  } catch (error) {
    console.error("Error in /api/info:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
