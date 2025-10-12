// import axios from "axios";

const getCategoryInfo = async (path,page) => {
  const apis = [
    "https://newpi.henpro.fun/api",
    "https://newpi2.henpro.fun/api",
    "https://newpi3.henpro.fun/api",
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
