import axios from "axios";

export default async function getStreamInfo(
  animeId,
  episodeId,
  serverName,
  type
) {
  const apis = [
    "https://newpi.henpro.fun/api",
    "https://newpi2.henpro.fun/api",
    "https://newpi3.henpro.fun/api",
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
