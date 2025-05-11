import { connectDB } from "@/lib/mongoClient";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const epi = searchParams.get("epi") === "true";
    const random = searchParams.get("random") === "true";

    const db = await connectDB();
    const animeInfoCol = db.collection("animeInfo");

    if (random) {
      // Get all IDs
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

    const doc = await animeInfoCol.findOne({ _id: id });

    if (!doc) {
      return new Response("Anime not found", { status: 404 });
    }

    const respo = epi ? doc : doc.info.results;

    return Response.json(respo);
  } catch (error) {
    console.error("Error in /api/info:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
