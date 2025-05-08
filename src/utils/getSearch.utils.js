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
  keyword
) => {
  const api_url = "https://vimal.animoon.me/api";
  if (!page) page = 1;
  try {
    const response = await axios.get(
      `${api_url}/search?keyword=${keyword}
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
    );
    return response.data.results;
  } catch (err) {
    console.error("Error fetching genre info:", err);
    return err;
  }
};

export default getSearch;
