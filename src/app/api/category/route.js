export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get("path");
    const page = searchParams.get("page") || 1;

    if (!path) {
      return new Response(
        JSON.stringify({ error: "Missing 'path' parameter" }),
        {
          status: 400,
        }
      );
    }

    const apis = [
    "https://api.animoon.me/api",
    "https://api2.animoon.me/api",
    "https://api3.animoon.me/api",
    ];

    const api_url = apis[Math.floor(Math.random() * apis.length)];

    const apiUrl = `${api_url}/${path}?page=${page}`;

    const res = await fetch(apiUrl);
    if (!res.ok) {
      throw new Error(`Failed to fetch data from: ${apiUrl}`);
    }

    const data = await res.json();

    return new Response(JSON.stringify(data.results), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error("Error in /api/category route:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
