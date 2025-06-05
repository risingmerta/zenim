import axios from "axios";

export default async function getSchedInfo(date) {
  try {
    const apis = [
    "https://api.shoko.fun/api",
    "https://api2.shoko.fun/api",
    "https://api3.shoko.fun/api",
    ];

    const api_url = apis[Math.floor(Math.random() * apis.length)];
    const response = await axios.get(`${api_url}/schedule?date=${date}`);
    return response.data.results;
  } catch (error) {
    console.error(error);
    return error;
  }
}
