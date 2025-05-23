import axios from "axios";

const getNextEpisodeSchedule = async (id) => {
  const apis = [
    "https://api.animoon.me/api",
    "https://api2.animoon.me/api",
    "https://api3.animoon.me/api",
  ];

  const api_url = apis[Math.floor(Math.random() * apis.length)];
  try {
    const response = await axios.get(`${api_url}/schedule/${id}`);
    return response.data.results;
  } catch (err) {
    console.error("Error fetching next episode schedule:", err);
    return err;
  }
};

export default getNextEpisodeSchedule;
