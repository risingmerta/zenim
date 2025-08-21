import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoClient";

export async function GET() {
  try {
    const db = await connectDB();
    const collection = db.collection("animeInfo");

    // Get a random document
    const randomDoc = await collection
      .aggregate([{ $sample: { size: 1 } }])
      .toArray();

    if (!randomDoc || randomDoc.length === 0) {
      return NextResponse.json({ error: "No anime found" }, { status: 404 });
    }

    return NextResponse.json({ id: randomDoc[0]._id });
  } catch (error) {
    console.error("Error fetching random anime:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
