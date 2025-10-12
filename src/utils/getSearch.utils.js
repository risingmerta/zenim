import axios from "axios";

const getSearch = async (
  type,
  status,
  rated,
  score,
  season,
  language,
  sy,
  sm,
  sd,
  ey,
  em,
  ed,
  sort,
  genres,
  page,
  keyword,
  onSear
) => {
  const apis = [
    "https://newpi.henpro.fun/api",
    "https://newpi2.henpro.fun/api",
    "https://newpi3.henpro.fun/api",
  ];

  const api_url = apis[Math.floor(Math.random() * apis.length)];
  if (!page) page = 1;
  try {
    let url = onSear
      ? `${api_url}/search?keyword=${keyword}
    ${`&page=${page || "1"}`}${type ? `&type=${type}` : ""}${
          status ? `&status=${status}` : ""
        }${rated ? `&rated=${rated}` : ""}${score ? `&score=${score}` : ""}${
          season ? `&season=${season}` : ""
        }${language ? `&language=${language}` : ""}${sy ? `&sy=${sy}` : ""}${
          sm ? `&sm=${sm}` : ""
        }${sd ? `&sd=${sd}` : ""}${ey ? `&ey=${ey}` : ""}${
          em ? `&em=${em}` : ""
        }${ed ? `&ed=${ed}` : ""}${sort ? `&sort=${sort}` : ""}${
          genres ? `&genres=${genres}` : ""
        }`
      : `${api_url}/filter?page=${page || "1"}${type ? `&type=${type}` : ""}${
          status ? `&status=${status}` : ""
        }${rated ? `&rated=${rated}` : ""}${score ? `&score=${score}` : ""}${
          season ? `&season=${season}` : ""
        }${language ? `&language=${language}` : ""}${sy ? `&sy=${sy}` : ""}${
          sm ? `&sm=${sm}` : ""
        }${sd ? `&sd=${sd}` : ""}${ey ? `&ey=${ey}` : ""}${
          em ? `&em=${em}` : ""
        }${ed ? `&ed=${ed}` : ""}${sort ? `&sort=${sort}` : ""}${
          genres ? `&genres=${genres}` : ""
        }`;
    const response = await axios.get(url);
    return response.data.results;
  } catch (err) {
    console.error("Error fetching genre info:", err);
    return err;
  }
};

export default getSearch;
