import axios from "axios";

export default async function getSchedInfo(date) {
  try {
    const apis = [
    "https://api.animoon.me/api",
    "https://api2.animoon.me/api",
    "https://api3.animoon.me/api",
    ];

    const api_url = apis[Math.floor(Math.random() * apis.length)];
    const response = await axios.get(`${api_url}/schedule?date=${date}`);
    return response.data.results;
  } catch (error) {
    console.error(error);
    return error;
  }
}
