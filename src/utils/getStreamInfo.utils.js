import axios from "axios";

export default async function getStreamInfo(
  animeId,
  episodeId,
  serverName,
  type
) {
  const apis = [
    "https://api.shoko.fun/api",
    "https://api2.shoko.fun/api",
    "https://api3.shoko.fun/api",
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
