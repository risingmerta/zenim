import { NextResponse } from "next/server";

// External API URLs
const API_URLS = [
  "https://newpi.henpro.fun/api/",
  "https://newpi2.henpro.fun/api/",
  "https://newpi3.henpro.fun/api/",
];

/**
 * Fetch data randomly from the API list.
 * If the chosen API fails, automatically retries the remaining ones.
 */
async function fetchHomeDataRandom() {
  // Shuffle API list for true random selection
  const shuffled = API_URLS.sort(() => 0.5 - Math.random());

  for (const url of shuffled) {
    try {
      const response = await fetch(url, {
        signal: AbortSignal.timeout(5000), // 5 sec timeout
      });

      if (!response.ok) {
        console.warn(`❌ API failed: ${url} -> ${response.status}`);
        continue;
      }

      const data = await response.json();
      return data.results;
    } catch (err) {
      console.error(`⚠ Error on API ${url}:`, err.message);
    }
  }

  throw new Error("All external APIs failed.");
}

export async function GET() {
  try {
    // Fetch from a random API
    const apiResults = await fetchHomeDataRandom();

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
    } = apiResults;

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

    return NextResponse.json(result);
  } catch (err) {
    console.error("❌ All APIs failed:", err.message);

    return NextResponse.json(
      { error: "Server error: Could not fetch home data." },
      { status: 500 }
    );
  }
}
