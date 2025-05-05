import axios from "axios";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const random = searchParams.get("random") === "true";

    const api_url = "https://vimal.animoon.me/api";

    if (random) {
      const randomIdResponse = await axios.get(`${api_url}/random/id`);
      const randomId = randomIdResponse.data.results;
      const infoResponse = await axios.get(`${api_url}/info?id=${randomId}`);
      return Response.json(infoResponse.data.results);
    }

    if (!id) {
      return new Response("Missing ID", { status: 400 });
    }

    const infoResponse = await axios.get(`${api_url}/info?id=${id}`);
    return Response.json(infoResponse.data.results);

  } catch (error) {
    console.error("Error in /api/info:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
