import axios from "axios";

const getQtip = async (id) => {
  try {
    // let workerUrls = import.meta.env.VITE_WORKER_URL?.split(",");
    const apis = [
    "https://api.shoko.fun/api",
    "https://api2.shoko.fun/api",
    "https://api3.shoko.fun/api",
    ];

    const api_url = apis[Math.floor(Math.random() * apis.length)];
    if (!baseUrl) throw new Error("No API endpoint defined.");
    const response = await axios.get(`${baseUrl}/qtip/${id.split("-").pop()}`);
    return response.data.results;
  } catch (err) {
    console.error("Error fetching genre info:", err);
    return null;
  }
};

export default getQtip;
