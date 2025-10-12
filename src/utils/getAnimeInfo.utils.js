import axios from "axios";

export default async function fetchAnimeInfo(id, random = false) {
  const apis = [
    "https://newpi.henpro.fun/api",
    "https://newpi2.henpro.fun/api",
    "https://newpi3.henpro.fun/api",
  ];

  const api_url = apis[Math.floor(Math.random() * apis.length)];
  try {
    if (random) {
      const id = await axios.get(`${api_url}/random/id`);
      const response = await axios.get(`${api_url}/info?id=${id.data.results}`);
      return response.data.results;
    } else {
      const url = `/api/info?id=${id}`;
      const response = await fetch(url);
      const data = await response.json();
      // const response = await axios.get(`${api_url}/info?id=${id}`);
      return data;
    }
  } catch (error) {
    console.error("Error fetching anime info:", error);
    return error;
  }
}
