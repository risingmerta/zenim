import axios from "axios";

const getSearchSuggestion = async (keyword) => {
  const api_url = "https://vimal.animoon.me/api";
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
