import axios from "axios";

export default async function getServers(animeId, episodeId) {
  try {
  const apis = [
    "https://api.animoon.me/api",
    // "https://api1.animoon.me/api",
    "https://api2.animoon.me/api",
    "https://api3.animoon.me/api",
    // "https://vimal.animoon.me/api",
  ];

  const api_url = apis[Math.floor(Math.random() * apis.length)];
    const response = await axios.get(
      `${api_url}/servers/${animeId}?ep=${episodeId}`
    );
    return response.data.results;
  } catch (error) {
    console.error(error);
    return error;
  }
}
