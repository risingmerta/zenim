import axios from 'axios';

export async function GET(req, { params }) {
  try {
    const param = await params;
    const { id } = param;
    const workerUrls = process.env.WORKER_URL?.split(",") || [];
    const baseUrl = workerUrls.length
      ? workerUrls[Math.floor(Math.random() * workerUrls.length)]
      : "https://vimal.animoon.me/api";

    const finalId = id?.split("-").pop();
    const response = await axios.get(`${baseUrl}/qtip/${finalId}`);

    return new Response(JSON.stringify(response.data.results), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in /api/qtip/[id]:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}
