import axios from "axios";

export default async function getStreamInfo(animeId, episodeId, serverName, type) {
  const api_url = "https://vimal.animoon.me/api";
  const fullUrl = `${api_url}/stream?id=${animeId}&ep=${episodeId}&server=${serverName}&type=${type}`;

  try {
    // First fetch
    const res1 = await axios.get(fullUrl);
    const result1 = res1.data?.results;
    const default1 = result1?.streamingLink?.tracks?.find(t => t.default)?.file;

    // Short delay to reduce cache overlap
    // await new Promise(resolve => setTimeout(resolve, 300));

    // Second fetch
    const res2 = await axios.get(fullUrl);
    const result2 = res2.data?.results;
    const default2 = result2?.streamingLink?.tracks?.find(t => t.default)?.file;

    if (default1 !== default2) {
      alert("Default track file changed between requests!");
      return result2;
    }

    return result1;
  } catch (error) {
    console.error("Error fetching stream info:", error);
    return error;
  }
}
