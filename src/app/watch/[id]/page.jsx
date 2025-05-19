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

  const animeInfoCol = db.collection("animeInfo");

  let infoData = null;
  let episodeData = null;
  let randomData = null;

  // Handle ?random=true
  const allDocs = await animeInfoCol.find({}).project({ _id: 1 }).toArray();
  if (allDocs.length) {
    const randomDoc = allDocs[Math.floor(Math.random() * allDocs.length)];
    const fetched = await animeInfoCol.findOne({ _id: randomDoc._id });
    randomData = fetched?.info?.results ?? null;
  }

  if (id) {
    const doc = await animeInfoCol.findOne({ _id: id });

    if (doc) {
      infoData = doc.info?.results ?? null;
      episodeData = doc.episode?.results ?? null;

      // Fetch missing info
      if (!infoData?.data?.title) {
        try {
          const { data } = await axios.get(`${api_url}/info?id=${id}`);
          infoData = data.results;
          await animeInfoCol.updateOne(
            { _id: id },
            { $set: { "info.results": infoData } }
          );
        } catch (err) {
          console.error("Error fetching fallback info:", err.message);
        }
      }

      // Fetch missing episodes
      if (!episodeData?.episodes?.[0]?.title || !episodeData.episodes?.length) {
        try {
          const { data } = await axios.get(`${api_url}/episodes/${id}`);
          episodeData = data.results;
          await animeInfoCol.updateOne(
            { _id: id },
            { $set: { "episode.results": episodeData } }
          );
        } catch (err) {
          console.error("Error fetching fallback episodes:", err.message);
        }
      }
    } else {
      try {
        const { data } = await axios.get(`${api_url}/info?id=${id}`);
        infoData = data.results;
        await animeInfoCol.updateOne(
          { _id: id },
          { $set: { "info.results": infoData } }
        );
      } catch (err) {
        console.error("Error fetching fallback info:", err.message);
      }
      try {
        const { data } = await axios.get(`${api_url}/episodes/${id}`);
        episodeData = data.results;
        await animeInfoCol.updateOne(
          { _id: id },
          { $set: { "episode.results": episodeData } }
        );
      } catch (err) {
        console.error("Error fetching fallback episodes:", err.message);
      }
    }
  }

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
