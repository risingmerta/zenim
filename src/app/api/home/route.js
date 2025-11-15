import { NextResponse } from "next/server";

// Define the external API URLs
const API_URLS = [
  "https://newpi.henpro.fun/api/",
  "https://newpi2.henpro.fun/api/",
  "https://newpi3.henpro.fun/api/",
];

// In-memory cache
// let cache = {
//   timestamp: 0,
//   data: null,
// };

// // Cache duration (1 hour)
// const CACHE_DURATION = 60 * 60 * 1000;

// /**
//  * Attempts to fetch home data from a list of external APIs sequentially.
//  * @returns {Promise<Object>} The 'results' object from the first successful API response.
//  * @throws {Error} If all APIs fail to provide valid data.
//  */
async function fetchHomeDataFromApis() {
  for (const url of API_URLS) {
    try {
      // Use a timeout of 5 seconds to prevent hanging on slow APIs
      const response = await fetch(url, { signal: AbortSignal.timeout(5000) });

      if (!response.ok) {
        console.warn(`API ${url} failed with status: ${response.status}. Trying next API...`);
        continue;
      }

      const data = await response.json();

      // Check for expected data structure
      if (data.success && data.results && typeof data.results === 'object') {
        console.log(`Successfully fetched data from: ${url}`);
        return data.results;
      } else {
        console.warn(`API ${url} returned success=false or missing 'results' field. Trying next API...`);
      }
    } catch (error) {
      // Log connection or parsing errors and try the next URL
      console.error(`Error fetching from API ${url}:`, error.message);
    }
  }

  // If the loop finishes without returning, throw an error
  throw new Error("All external APIs failed to provide valid home data.");
}

export async function GET() {
  const now = Date.now();

  // // 1. Check Cache
  // if (cache.data && now - cache.timestamp < CACHE_DURATION) {
  //   console.log("Cache hit: Returning cached data.");
  //   return NextResponse.json(cache.data);
  // }

  try {
    // 2. Fetch from external APIs
    const apiResults = await fetchHomeDataFromApis();

    // 3. Map the API fields to the desired output structure
    const {
      spotlights,
      trending,
      topTen, // Renamed to topten
      today, // Renamed to todaySchedule
      topAiring, // Renamed to top_airing
      mostPopular, // Renamed to most_popular
      mostFavorite, // Renamed to most_favorite
      latestCompleted, // Renamed to latest_completed
      latestEpisode, // Renamed to latest_episode
      topUpcoming, // Renamed to top_upcoming
      recentlyAdded, // Renamed to recently_added
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

    // 4. Update Cache
    // cache = {
    //   timestamp: now,
    //   data: result,
    // };

    return NextResponse.json(result);
  } catch (err) {
    console.error("❌ Error fetching home data from all sources:", err.message);

    // Fallback: If cache exists, return stale data during failure.
    // if (cache.data) {
    //     console.warn("Returning stale cache data due to upstream failure.");
    //     return NextResponse.json(cache.data);
    // }

    return NextResponse.json({ error: "Server error: Could not fetch home data." }, { status: 500 });
  }
}