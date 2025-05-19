import Advertize from "@/component/Advertize/Advertize";
import Watch from "@/component/watch/Watch";
import { connectDB } from "@/lib/mongoClient";
import axios from "axios";
import React from "react";

export async function generateMetadata({ params, searchParams }) {
  const param = await params;
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Animoon";
  const id = param.id;

  const formattedTitle = id
    .split("-")
    .slice(0, -1)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `Watch ${formattedTitle} English Sub/Dub online free on ${siteName}`,
    description: `${siteName} is the best site to watch ${formattedTitle} SUB online, or you can even watch ${formattedTitle} DUB in HD quality. You can also watch underrated anime on ${siteName}.`,
  };
}

export default async function Page({ params, searchParams }) {
  const param = await params;
  const searchParam = await searchParams;
  const { id } = param;
  const { ep, refer } = searchParam;

  const apis = [
    "https://api.animoon.me/api",
    "https://api2.animoon.me/api",
    "https://api3.animoon.me/api",
  ];
  const api_url = apis[Math.floor(Math.random() * apis.length)];

  const db = await connectDB();

  // Fetch homepage data
  let datapp = null;
  try {
    const doc = await db.collection("animoon-home").findOne({});
    datapp = doc || (await fetch(`${api_url}`).then((res) => res.json()));
  } catch (error) {
    console.error("Error fetching homepage data:", error.message);
  }

  let infoData = null;
  let episodeData = null;
  let randomData = null;

  try {
    const [infoRes, episodeRes] = await Promise.all([
      axios.get(`${api_url}/info?id=${id}`),
      axios.get(`${api_url}/episodes/${id}`),
    ]);

    infoData = infoRes.data.results;
    episodeData = episodeRes.data.results;
  } catch (err) {
    console.error("Error fetching data for new document:", err.message);
  }

  // Handle ?random=true

  // Fetch schedule
  let dati = null;
  try {
    const res = await fetch(`${api_url}/schedule/${id}`);
    if (res.ok) {
      const json = await res.json();
      const dateOnly = json?.results?.nextEpisodeSchedule?.split(" ")[0];
      if (dateOnly) {
        const schDoc = await db
          .collection("animoon-schedule")
          .findOne({ _id: dateOnly });
        dati = schDoc?.schedule?.find((s) => s.id === id)
          ? { schedule: schDoc.schedule.find((s) => s.id === id) }
          : null;
      }
    }
  } catch (error) {
    console.error("Failed to fetch schedule:", error.message);
  }

  // Determine episodeId for server data
  let episodeId = ep ? `${id}?ep=${ep}` : episodeData?.episodes?.[0]?.id;

  let serverData = [];

  if (episodeId) {
    try {
      // Step 1: fetch all servers
      const serverRes = await axios.get(`${api_url}/servers/${episodeId}`);
      serverData = serverRes.data.results;

      // Step 2: fetch stream data for each server
    } catch (err) {
      console.error("Error fetching servers/streams:", err.message);
    }
  }

  return (
    <div>
      <Watch
        id={id}
        epId={ep}
        refer={refer}
        homeData={datapp}
        infoData={infoData}
        episodeData={episodeData}
        scheduleData={dati?.schedule}
        serverData={serverData}
        randomData={randomData}
      />
      <Advertize refer={refer} />
    </div>
  );
}
