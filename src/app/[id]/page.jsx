import Advertize from "@/component/Advertize/Advertize";
import AnimeInfo from "@/component/animeInfo/AnimeInfo";
import Category from "@/component/category/Category";
import Error from "@/component/error/Error";
import { connectDB } from "@/lib/mongoClient";
import axios from "axios";
import Script from "next/script";
import React from "react";

export async function generateMetadata({ params }) {
  const param = await params;
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Animoon";
  const idToCheck = param.id;

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

  const isCategory = categRoutes.some((route) => route === idToCheck);

  const toCapitalize = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  if (isCategory) {
    const label = toCapitalize(idToCheck.split("-").join(" "));
    return {
      title: `${label} Anime - ${siteName}`,
      // description: `Watch ${label} Anime online free on ${siteName}.`,
      // robots: {
      //   index: true,
      //   follow: true,
      // },
    };
  }

  // For dynamic watch pages (non-category), add noindex, nofollow
  const formattedTitle = idToCheck
    .split("-")
    .slice(0, -1)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `Watch ${formattedTitle} English Sub/Dub online free on ${siteName}`,
    description: `${siteName} is the best site to watch ${formattedTitle} SUB online, or you can even watch ${formattedTitle} DUB in HD quality. You can also watch underrated anime on ${siteName}.`,
    // robots: {
    //   index: false,
    //   follow: false,
    // },
  };
}

export default async function page({ params, searchParams }) {
  const param = await params;
  const searchParam = await searchParams;
  const refer = searchParam?.refer;
  const id = param.id;
  const page = searchParam.page || 1;

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

  let infoData = null;
  let episodeData = null;
  let randomData = null;
  let datapp = null;
  let home = null;

  if (categRoutes.find((item) => item !== param.id)) {
    const apis = [
      "https://api.shoko.fun/api",
      "https://api2.shoko.fun/api",
      "https://api3.shoko.fun/api",
    ];
    const api_url = apis[Math.floor(Math.random() * apis.length)];

    const db = await connectDB();

    // --- Fetch homepage data
    try {
      const doc = await db.collection("homeData").findOne({});
      home = doc || (await fetch(api_url).then((res) => res.json()));
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

    // --- Random Anime
    const animeInfoCol = db.collection("animeInfo");
    const allDocs = await animeInfoCol.find({}).project({ _id: 1 }).toArray();

    if (allDocs.length) {
      const randomDoc = allDocs[Math.floor(Math.random() * allDocs.length)];
      const fetched = await animeInfoCol.findOne({ _id: randomDoc._id });
      randomData = fetched?.info?.results ?? null;
    }

    // --- If ID is provided
    const doc = await animeInfoCol.findOne({ _id: id });

    if (doc) {
      infoData = doc.info?.results ?? null;
      episodeData = doc.episode?.results ?? null;

      // Fetch missing info
      if (!infoData?.data?.title) {
        try {
          const { data } = await axios.get(`${api_url}/info?id=${id}`);
          infoData = data.results ?? null;
          await animeInfoCol.updateOne(
            { _id: id },
            { $set: { "info.results": infoData } }
          );
        } catch (err) {
          console.error("Error fetching fallback info:", err.message);
        }
      }

      // Fetch missing episodes
      if (!episodeData?.episodes?.length || !episodeData.episodes?.[0]?.title) {
        try {
          const { data } = await axios.get(`${api_url}/episodes/${id}`);
          episodeData = data.results ?? null;
          await animeInfoCol.updateOne(
            { _id: id },
            { $set: { "episode.results": episodeData } }
          );
        } catch (err) {
          console.error("Error fetching fallback episodes:", err.message);
        }
      }
    }
    if (!doc) {
      // Doc doesn't exist — create new with fetched data
      try {
        const [infoRes, episodeRes] = await Promise.all([
          axios.get(`${api_url}/info?id=${id}`),
          axios.get(`${api_url}/episodes/${id}`),
        ]);

        infoData = infoRes.data?.results ?? null;
        episodeData = episodeRes.data?.results ?? null;

        if (infoData || episodeData) {
          await animeInfoCol.updateOne(
            { _id: id },
            {
              $set: {
                "info.results": infoData,
                "episode.results": episodeData,
              },
            },
            { upsert: true }
          );
        }
      } catch (err) {
        console.error("Error fetching data for new document:", err.message);
        infoData = null;
        episodeData = null;
      }
    }
  }

  return (
    <div>
      {categRoutes.find((item) => item === param.id) ? (
        <Category
          path={id}
          label={id.split("-")?.join(" ")}
          pagel={page}
          refer={refer}
        />
      ) : (
        <AnimeInfo idd={id} refer={refer} infoData={infoData} homeData={home} />
      )}
      <Advertize refer="" />
      {/* <Script
        src="//abackdamstubborn.com/b7/2f/b2/b72fb2e5a32c00a413ee2bb7ea85b317.js"
        strategy="afterInteractive"
        // "afterInteractive" means load script after page hydration
      /> */}
    </div>
  );
}
