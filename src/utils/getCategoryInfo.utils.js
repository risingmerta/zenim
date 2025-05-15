// import axios from "axios";

const getCategoryInfo = async (path,page) => {
  const apis = [
    "https://api.animoon.me/api",
    // "https://api1.animoon.me/api",
    "https://api2.animoon.me/api",
    "https://api3.animoon.me/api",
    // "https://vimal.animoon.me/api",
  ];

  const api_url = apis[Math.floor(Math.random() * apis.length)];
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
