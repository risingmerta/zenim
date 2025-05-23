import axios from "axios";

export default async function fetchVoiceActorInfo(id, page) {
  const apis = [
    "https://api.animoon.me/api",
    "https://api2.animoon.me/api",
    "https://api3.animoon.me/api",
  ];

  const api_url = apis[Math.floor(Math.random() * apis.length)];
  try {
    const response = await axios.get(
      `${api_url}/character/list/${id}?page=${page}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching anime info:", error);
    return error;
  }
}
