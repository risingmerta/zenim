import Advertize from "@/component/Advertize/Advertize";
import Home from "@/component/Home/Home";
import Script from "next/script";
import React from "react";

export default async function page({ searchParams }) {
  let dataToCache = {};
  try {
    const res = await fetch("https://kaori.animoon.me/api/home", {
      next: { revalidate: 3600 },
    });
    const data = await res.json();
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
    } = data?.data;

    dataToCache = {
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
  } catch (err) {
    console.error("Failed to load homepage data:", err);
  }

  const seacrhParam = await searchParams;
  const refer = seacrhParam?.refer;
  return (
    <div>
      <Home refer={refer} data={dataToCache} />
      {refer && <Advertize refer={refer} />}
      {/* <Script
        src="//abackdamstubborn.com/b7/2f/b2/b72fb2e5a32c00a413ee2bb7ea85b317.js"
        strategy="afterInteractive"
        // "afterInteractive" means load script after page hydration
      /> */}
      <Script
        src="//abackdamstubborn.com/0edc04a5374d9021ce8e6b9f5bb01d53/invoke.js"
        strategy="lazyOnload"
        data-cfasync="false"
        async
      />
      <div id="container-0edc04a5374d9021ce8e6b9f5bb01d53" />{" "}
      <Script
        src="//abackdamstubborn.com/747f4fcb7dc611b1e8d9ed8822f2c89c/invoke.js"
        strategy="lazyOnload"
        data-cfasync="false"
        async
      />
      <div id="container-747f4fcb7dc611b1e8d9ed8822f2c89c" />
    </div>
  );
}
