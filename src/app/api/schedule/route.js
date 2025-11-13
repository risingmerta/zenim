import { NextResponse } from "next/server";

// Define the external API base URLs
const API_BASE_URLS = [
  "https://newpi.henpro.fun/api/",
  "https://newpi2.henpro.fun/api/",
  "https://newpi3.henpro.fun/api/",
];

// /**
//  * Attempts to fetch the daily schedule from a list of external APIs sequentially.
//  * @param {string} date - The date string (e.g., '2025-11-13') to fetch the schedule for.
//  * @returns {Promise<Array<Object>>} The array of schedule items.
//  * @throws {Error} If all APIs fail to provide valid data.
//  */
async function fetchScheduleFromApis(date) {
  const endpoint = `schedule?date=${date}`;

  for (const baseUrl of API_BASE_URLS) {
    const url = baseUrl + endpoint;
    try {
      // Use a timeout of 5 seconds
      const response = await fetch(url, { signal: AbortSignal.timeout(5000) });

      if (!response.ok) {
        console.warn(`API ${url} failed with status: ${response.status}. Trying next API...`);
        continue;
      }

      const data = await response.json();

      // Check for expected data structure: success=true and results is an array
      if (data.success === true && Array.isArray(data.results)) {
        console.log(`Successfully fetched schedule from: ${url}`);
        return data.results;
      } else {
        console.warn(`API ${url} returned success=false or missing array 'results'. Trying next API...`);
      }
    } catch (error) {
      // Log connection or parsing errors and try the next URL
      console.error(`Error fetching from API ${url}:`, error.message);
    }
  }

  // If the loop finishes without returning, throw an error
  throw new Error(`All external APIs failed to provide valid schedule data for date: ${date}`);
}


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
    // Fetch data from the external APIs
    const daySchedule = await fetchScheduleFromApis(date);

    // The API returns the array directly, which matches the required output.
    return NextResponse.json(daySchedule);

  } catch (error) {
    console.error("Schedule fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch schedule from all sources" },
      { status: 500 }
    );
  }
}