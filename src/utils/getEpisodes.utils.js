import axios from "axios";

export default async function getEpisodes(id) {
  const api_url = "https://api.animoon.me/api";
  try {
    const url = `/api/info?id=${id}&epi=true`;
    const response = await fetch(url);
    const data = await response.json();
    // const response = await axios.get(`${api_url}/info?id=${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching anime info:", error);
    return error;
  }
}
