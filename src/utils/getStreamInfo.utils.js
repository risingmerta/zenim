import axios from "axios";

export default async function getStreamInfo(animeId, episodeId, serverName, type) {
  const api_url = "https://vimal.animoon.me/api";
  const baseUrl = `${api_url}/stream?id=${animeId}&ep=${episodeId}&server=${serverName}&type=${type}`;

  try {
    const headers = {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': '0'
    };

    // First fetch with a timestamp to avoid caching
    const res1 = await axios.get(`${baseUrl}&t=${Date.now()}`, { headers });
    const tracks1 = res1.data?.results?.streamingLink?.tracks || [];

    // Short delay to separate requests
    await new Promise(r => setTimeout(r, 300));

    // Second fetch with a new timestamp
    const res2 = await axios.get(`${baseUrl}&t=${Date.now()}`, { headers });
    const tracks2 = res2.data?.results?.streamingLink?.tracks || [];

    if (JSON.stringify(tracks1) !== JSON.stringify(tracks2)) {
      console.log("⚠️ Track list changed between requests!");
      console.log("First tracks:", tracks1);
      console.log("Second tracks:", tracks2);
      return null;
    }

    return res1.data.results;
  } catch (error) {
    console.error("Error fetching stream info:", error);
    return error;
  }
}
