import axios from "axios";

const getProducer = async (producer, page) => {
  const apis = [
    "https://api.animoon.me/api",
    // "https://api1.animoon.me/api",
    "https://api2.animoon.me/api",
    "https://api3.animoon.me/api",
    // "https://vimal.animoon.me/api",
  ];

  const api_url = apis[Math.floor(Math.random() * apis.length)];
  try {
    const response = await axios.get(
      `${api_url}/producer/${producer}?page=${page}`
    );
    return response.data.results;
  } catch (err) {
    console.error("Error fetching genre info:", err);
    return err;
  }
};

export default getProducer;
