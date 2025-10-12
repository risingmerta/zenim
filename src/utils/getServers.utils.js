import axios from "axios";

export default async function getServers(animeId, episodeId) {
  try {
  const apis = [
    "https://newpi.henpro.fun/api",
    "https://newpi2.henpro.fun/api",
    "https://newpi3.henpro.fun/api",
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
