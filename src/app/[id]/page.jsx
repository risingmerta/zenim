import Advertize from "@/component/Advertize/Advertize";
import AnimeInfo from "@/component/animeInfo/AnimeInfo";
import Category from "@/component/category/Category";
import { connectDB } from "@/lib/mongoClient";
import Script from "next/script";
import React from "react";
import axios from "axios";

// Capitalize first letter of each word
const toCapitalize = (str) => str.replace(/\b\w/g, (char) => char.toUpperCase());

// Format hyphenated ID for titles
const formatTitle = (id) =>
  id
    .split("-")
    .slice(0, -1)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const categRoutes = [
  "top-airing",
  "most-popular",
  "most-favorite",
  "completed",
  "recently-updated",
  "recently-added",
  "top-upcoming",
  "subbed-anime",
  "dubbed-anime",
  "movie",
  "special",
  "ova",
  "ona",
  "tv",
];

export async function generateMetadata({ params }) {
  const idToCheck = params.id;
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Animoon";

  if (categRoutes.includes(idToCheck)) {
    const label = toCapitalize(idToCheck.replace(/-/g, " "));
    return {
      title: `${label} Anime - ${siteName}`,
    };
  }

  const formattedTitle = formatTitle(idToCheck);

  return {
    title: `Watch ${formattedTitle} English Sub/Dub online free on ${siteName}`,
    description: `${siteName} is the best site to watch ${formattedTitle} SUB online, or you can even watch ${formattedTitle} DUB in HD quality. You can also watch underrated anime on ${siteName}.`,
  };
}

export default async function page({ params, searchParams }) {
  const id = params.id;
  const refer = searchParams?.refer;
  const page = Number(searchParams?.page || 1);

  let infoData = null;
  let episodeData = null;
  let randomData = null;
  let datapp = null;

  const isCategory = categRoutes.includes(id);

  if (isCategory || id) {
    let db;

    try {
      db = await connectDB();
    } catch (err) {
      console.error("Database connection error:", err.message);
      return <div>❌ Database connection failed.</div>;
    }

    const apis = [
      "https://api.animoon.me/api",
      "https://api2.animoon.me/api",
      "https://api3.animoon.me/api",
    ];
    const api_url = apis[Math.floor(Math.random() * apis.length)];

    const animeInfoCol = db.collection("animeInfo");

    if (isCategory) {
      try {
        const doc = await db.collection("animoon-home").findOne({});
        datapp = doc || (await fetch(`${api_url}`).then((res) => res.json()));

        const allDocs = await animeInfoCol.find({}).project({ _id: 1 }).toArray();
        if (allDocs.length) {
          const randomDoc = allDocs[Math.floor(Math.random() * allDocs.length)];
          const fetched = await animeInfoCol.findOne({ _id: randomDoc._id });
          randomData = fetched?.info?.results ?? null;
        }
      } catch (error) {
        console.error("Error fetching category data:", error.message);
      }
    }

    if (!isCategory && id) {
      try {
        const doc = await animeInfoCol.findOne({ _id: id });

        if (doc) {
          infoData = doc.info?.results ?? null;
          episodeData = doc.episode?.results ?? null;

          // Fetch and update missing info
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

          // Fetch and update missing episodes
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
        }
      } catch (error) {
        console.error("Error fetching anime info:", error.message);
      }
    }
  }

  return (
    <div>
      {isCategory ? (
        <Category
          path={id}
          label={toCapitalize(id.replace(/-/g, " "))}
          pagel={page}
          refer={refer}
        />
      ) : (
        <AnimeInfo idd={id} refer={refer} infoData={infoData} homeData={datapp} />
      )}
      {refer && <Advertize refer={refer} />}

      {/* Optional Ad Script */}
      {/* 
      <Script
        src="//abackdamstubborn.com/b7/2f/b2/b72fb2e5a32c00a413ee2bb7ea85b317.js"
        strategy="afterInteractive"
      /> 
      */}
    </div>
  );
}
