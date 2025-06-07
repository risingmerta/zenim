import axios from "axios";
import { NextResponse } from "next/server";

let cache = {
  timestamp: 0,
  data: null,
};

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour
const API_URL = "https://kaori.shoko.fun/api/home";

export async function GET() {
  const currentTime = Date.now();

  // Return cached data if still valid
  if (cache.data && currentTime - cache.timestamp < CACHE_DURATION) {
    return NextResponse.json(cache.data);
  }

  try {
    const response = await axios.get(API_URL);
    const results = response.data.data;

    if (!results || Object.keys(results).length === 0) {
      return NextResponse.json({ error: "No results found" }, { status: 500 });
    }

    const {
      spotlights,
      trending,
      topTen: topten,
      today: todaySchedule,
      topAiring: top_airing,
      mostPopular: most_popular,
      mostFavorite: most_favorite,
      latestCompleted: latest_completed,
      latestEpisode: latest_episode,
      topUpcoming: top_upcoming,
      recentlyAdded: recently_added,
      genres,
    } = results;

    const dataToCache = {
      spotlights,
      trending,
      topten,
      todaySchedule,
      top_airing,
      most_popular,
      most_favorite,
      latest_completed,
      latest_episode,
      top_upcoming,
      recently_added,
      genres,
    };

    // Store in in-memory cache
    cache = {
      timestamp: currentTime,
      data: dataToCache,
    };

    return NextResponse.json(dataToCache);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
