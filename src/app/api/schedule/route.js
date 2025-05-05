import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json({ error: "Missing 'date' query parameter" }, { status: 400 });
  }

  const api_url = "https://vimal.animoon.me/api";

  try {
    const response = await axios.get(`${api_url}/schedule?date=${date}`);
    return NextResponse.json(response.data.results);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch schedule" }, { status: 500 });
  }
}
