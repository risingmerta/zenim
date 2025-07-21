import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoClient";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json(
      { error: "Missing 'date' query parameter" },
      { status: 400 }
    );
  }

  try {
    const db = await connectDB();
    const animeCollection = db.collection("animeSchedule");

    const daySchedule = await animeCollection.findOne(
      { _id: date },
      { projection: { _id: 0 } }
    );

    return NextResponse.json(daySchedule?.data || []);
  } catch (error) {
    console.error("Schedule fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch schedule" },
      { status: 500 }
    );
  }
}
