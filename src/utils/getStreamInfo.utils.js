import axios from "axios";

export default async function getStreamInfo(
  animeId,
  episodeId,
  serverName,
  type
) {
  const apis = [
    "https://api.animoon.me/api",
    // "https://api1.animoon.me/api",
    "https://api2.animoon.me/api",
    "https://api3.animoon.me/api",
    // "https://vimal.animoon.me/api",
  ];

  const api_url = apis[Math.floor(Math.random() * apis.length)];

  try {
    const response = await axios.get(
      `${api_url}/stream?id=${animeId}?ep=${episodeId}&server=${serverName}&type=${type}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching stream info:", error);
    return error;
  }
}
