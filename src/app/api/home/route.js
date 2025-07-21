// /app/api/home/route.js
import { connectDB } from "@/lib/mongoClient";
import { NextResponse } from "next/server";

let cache = {
  timestamp: 0,
  data: null,
};

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export async function GET() {
  const now = Date.now();

  if (cache.data && now - cache.timestamp < CACHE_DURATION) {
    return NextResponse.json(cache.data);
  }

  try {
    const db = await connectDB();
    const homeData = await db
      .collection("homeData")
      .findOne({}, { projection: { _id: 0 } });

    if (!homeData) {
      return NextResponse.json({ error: "No data found" }, { status: 404 });
    }

    const {
      spotlights,
      trending,
      topTen,
      today,
      topAiring,
      mostPopular,
      mostFavorite,
      latestCompleted,
      latestEpisode,
      topUpcoming,
      recentlyAdded,
      genres,
    } = homeData;

    const result = {
      spotlights,
      trending,
      topten: topTen,
      todaySchedule: today,
      top_airing: topAiring,
      most_popular: mostPopular,
      most_favorite: mostFavorite,
      latest_completed: latestCompleted,
      latest_episode: latestEpisode,
      top_upcoming: topUpcoming,
      recently_added: recentlyAdded,
      genres,
    };

    cache = {
      timestamp: now,
      data: result,
    };

    return NextResponse.json(result);
  } catch (err) {
    console.error("❌ Error fetching home data:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
