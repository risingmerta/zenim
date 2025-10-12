import axios from "axios";

const getSearchSuggestion = async (keyword) => {
  const apis = [
    "https://newpi.henpro.fun/api",
    "https://newpi2.henpro.fun/api",
    "https://newpi3.henpro.fun/api",
  ];

  const api_url = apis[Math.floor(Math.random() * apis.length)];
  try {
    const response = await axios.get(
      `${api_url}/search/suggest?keyword=${keyword}`
    );
    return response.data.results;
  } catch (err) {
    console.error("Error fetching genre info:", err);
    return err;
  }
};

export default getSearchSuggestion;
