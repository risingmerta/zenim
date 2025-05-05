import axios from "axios";

export default async function getStreamInfo(animeId, episodeId, serverName, type) {
  const api_url = "https://vimal.animoon.me/api";
  const fullUrl = `${api_url}/stream?id=${animeId}&ep=${episodeId}&server=${serverName}&type=${type}`;

  try {
    const headers = {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': '0'
    };

    // First fetch
    const res1 = await axios.get(fullUrl, { headers });
    const tracks1 = res1.data?.results?.streamingLink?.tracks || [];

    // Delay to prevent caching overlap
    await new Promise(r => setTimeout(r, 300));

    // Second fetch
    const res2 = await axios.get(fullUrl, { headers });
    const tracks2 = res2.data?.results?.streamingLink?.tracks || [];

    if (JSON.stringify(tracks1) !== JSON.stringify(tracks2)) {
      alert("Track list changed between requests!");
      return null;
    }

    return res1.data.results;
  } catch (error) {
    console.error("Error fetching stream info:", error);
    return error;
  }
}
