export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("keyword"); // Extract the 'keyword' query parameter

  if (!keyword) {
    return new Response(JSON.stringify({ error: "Keyword is required" }), {
      status: 400,
    });
  }

  const apis = [
    "https://newpi.henpro.fun/api",
    "https://newpi2.henpro.fun/api",
    "https://newpi3.henpro.fun/api",
  ];

  const api_url = apis[Math.floor(Math.random() * apis.length)];

  const externalApiUrl = `${api_url}/search/suggest?keyword=${keyword}`;

  try {
    // Fetch data from the external API
    const apiResponse = await fetch(externalApiUrl);
    if (apiResponse.ok) {
      const apiData = await apiResponse.json();

      if (apiData.success && apiData.results.length > 0) {
        // Return the results directly
        return new Response(JSON.stringify(apiData.results), { status: 200 });
      } else {
        return new Response(
          JSON.stringify({ message: "No matching results found" }),
          { status: 404 }
        );
      }
    } else {
      return new Response(
        JSON.stringify({ error: "Failed to fetch data from API" }),
        { status: apiResponse.status }
      );
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
