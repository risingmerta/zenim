// import axios from "axios";

const getCategoryInfo = async (path,page) => {
  const apis = [
    "https://api.shoko.fun/api",
    "https://api2.shoko.fun/api",
    "https://api3.shoko.fun/api",
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
