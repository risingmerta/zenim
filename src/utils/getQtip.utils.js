import axios from "axios";

const getQtip = async (id) => {
  try {
    // let workerUrls = import.meta.env.VITE_WORKER_URL?.split(",");
  const apis = [
    "https://newpi.henpro.fun/api",
    "https://newpi2.henpro.fun/api",
    "https://newpi3.henpro.fun/api",
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
