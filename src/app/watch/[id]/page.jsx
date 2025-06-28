import Advertize from "@/component/Advertize/Advertize";
import BottomLeftAd from "@/component/BottomLeftAd/BottomLeftAd";
import Error from "@/component/error/Error";
import Watch from "@/component/watch/Watch";
import { connectDB } from "@/lib/mongoClient";
import axios from "axios";
import React from "react";

// export const dynamic = "force-dynamic"; // Prevent static rendering/caching

export async function generateMetadata({ params }) {
  const id = params.id;
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Animoon";

  const formattedTitle = id
    .split("-")
    .slice(0, -1)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `Watch ${formattedTitle} English Sub/Dub online free on ${siteName}`,
    description: `${siteName} is the best site to watch ${formattedTitle} SUB online, or you can even watch ${formattedTitle} DUB in HD quality. You can also watch underrated anime on ${siteName}.`,

    // Add robots meta tag here
    robots: {
      index: false, // noindex
      follow: false, // nofollow
    },
  };
}

export default async function Page({ params, searchParams }) {
  const param = await params;
  const searchParam = await searchParams;
  const { id } = param;
  const { ep, refer } = searchParam;

  let home = null;

  const apis = [
    "https://api.shoko.fun/api",
    "https://api2.shoko.fun/api",
    "https://api3.shoko.fun/api",
  ];
  const api_url = apis[Math.floor(Math.random() * apis.length)];

  const db = await connectDB();

  // --- Fetch homepage data
  try {
    const doc = await db.collection("animoon-home").findOne({});
    if (doc) {
      home = doc;
    } else {
      const res = await fetch(api_url, { cache: "no-store" });
      home = await res.json();
    }
  } catch (error) {
    console.error("Error fetching homepage data:", error.message);
  }

  // --- Normalize homepage fields
  const {
    spotlights,
    trending,
    topTen: topten,
    today: todaySchedule,
    topAiring: top_airing,
    mostPopular: most_popular,
    mostFavorite: most_favorite,
    latestCompleted: latest_completed,
    latestEpisode: latest_episode,
    topUpcoming: top_upcoming,
    recentlyAdded: recently_added,
    genres,
  } = home ?? {};

  home = {
    spotlights,
    trending,
    topten,
    todaySchedule,
    top_airing,
    most_popular,
    most_favorite,
    latest_completed,
    latest_episode,
    top_upcoming,
    recently_added,
    genres,
  };

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
      episodeData = doc.episodes?.results ?? null;

      // Fetch missing info
      if (!infoData?.data?.title) {
        try {
          const { data } = await axios.get(`${api_url}/info?id=${id}`, {
            headers: { "Cache-Control": "no-store" },
          });
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
      if (
        !episodeData?.episodes?.length > 0 ||
        !episodeData.episodes?.[0]?.title
      ) {
        try {
          const { data } = await axios.get(`${api_url}/episodes/${id}`, {
            headers: { "Cache-Control": "no-store" },
          });
          episodeData = data.results;
          await animeInfoCol.updateOne(
            { _id: id },
            { $set: { "episodes.results": episodeData } }
          );
        } catch (err) {
          console.error("Error fetching fallback episodes:", err.message);
        }
      }
    } else {
      // Document doesn't exist — fetch and insert everything
      try {
        const [infoRes, episodeRes] = await Promise.all([
          axios.get(`${api_url}/info?id=${id}`, {
            headers: { "Cache-Control": "no-store" },
          }),
          axios.get(`${api_url}/episodes/${id}`, {
            headers: { "Cache-Control": "no-store" },
          }),
        ]);

        infoData = infoRes.data.results;
        episodeData = episodeRes.data.results;

        await animeInfoCol.updateOne(
          { _id: id },
          {
            $set: {
              "info.results": infoData,
              "episodes.results": episodeData,
            },
          },
          { upsert: true }
        );
      } catch (err) {
        console.error("Error fetching data for new document:", err.message);
      }
    }
  }

  // Fetch schedule
  let dati = null;
  try {
    const res = await fetch(`${api_url}/schedule/${id}`, { cache: "no-store" });
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

  return (
    <div>
      {refer === "weebhideout" ? (
        <Watch
          id={id}
          epId={ep}
          refer={refer}
          homeData={home}
          infoData={infoData}
          episodeData={episodeData}
          scheduleData={dati?.schedule}
          randomData={randomData}
        />
      ) : (
        <Error error="dmca" />
      )}
      <Advertize refer="" />
      {/* <BottomLeftAd /> */}
    </div>
  );
}
