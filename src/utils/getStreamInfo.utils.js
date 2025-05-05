import axios from "axios";

export default async function getStreamInfo(animeId, episodeId, serverName, type) {
  const api_url = "https://vimal.animoon.me/api";

  const switchServer = serverName === "HD-1" ? "HD-2" : serverName === "HD-2" ? "HD-1" : serverName;

  const makeUrl = (server) =>
    `${api_url}/stream?id=${animeId}&ep=${episodeId}&server=${server}&type=${type}&t=${Date.now()}`;

  try {
    // const headers = {
    //   'Cache-Control': 'no-cache',
    //   'Pragma': 'no-cache',
    //   'Expires': '0'
    // };

    const [res1, res2] = await Promise.all([
      axios.get(makeUrl(serverName)),
      axios.get(makeUrl(switchServer)),
    ]);

    const tracks1 = res1.data?.results?.streamingLink?.tracks || [];
    const tracks2 = res2.data?.results?.streamingLink?.tracks || [];

    if (JSON.stringify(tracks1) !== JSON.stringify(tracks2)) {
      console.log("⚠️ Tracks differ between servers:");
      console.log(`Tracks from ${serverName}:`, tracks1);
      console.log(`Tracks from ${switchServer}:`, tracks2);
    }

    return res1.data.results;
  } catch (error) {
    console.error("Error fetching stream info:", error);
    return error;
  }
}
