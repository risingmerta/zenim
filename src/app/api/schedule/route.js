import { NextResponse } from "next/server";
import axios from "axios";
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

  // const api_url = "https://vimal.animoon.me/api";

  try {
    // const response = await axios.get(`${api_url}/schedule?date=${date}`);
    const db = await connectDB();
    const animeCollection = db.collection("animoon-schedule");
    const docs = await animeCollection.find({}).toArray();
    animeDocs = JSON.parse(JSON.stringify(docs));

    const daySchedule = animeDocs.find((entry) => entry._id === date);
    return NextResponse.json(daySchedule?.schedule);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch schedule" },
      { status: 500 }
    );
  }
}
