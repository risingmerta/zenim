import axios from "axios";

export default async function getEpisodes(id) {
  const apis = [
    "https://api.animoon.me/api",
    "https://api2.animoon.me/api",
    "https://api3.animoon.me/api",
  ];

  const api_url = apis[Math.floor(Math.random() * apis.length)];
  try {
    const url = `/api/info?id=${id}&epi=true`;
    const response = await fetch(url, {cache: 'no-store'});
    const data = await response.json();
    // const response = await axios.get(`${api_url}/info?id=${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching anime info:", error);
    return error;
  }
}
