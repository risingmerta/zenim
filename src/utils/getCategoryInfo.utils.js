// import axios from "axios";

const getCategoryInfo = async (path,page) => {
  // const api_url = "https://vimal.animoon.me/api";
  try {
    const res = await fetch(`/api/category?path=${path}&page=${page}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching genre info:", err);
    return err;
  }
};

export default getCategoryInfo;
