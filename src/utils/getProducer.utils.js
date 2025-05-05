import axios from "axios";

const getProducer = async (producer, page) => {
  const api_url = "https://vimal.animoon.me/api";
  try {
    const response = await axios.get(`${api_url}/producer/${producer}?page=${page}`);
    return response.data.results;
  } catch (err) {
    console.error("Error fetching genre info:", err);
    return err;
  }
};

export default getProducer;
