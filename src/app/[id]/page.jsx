import Advertize from "@/component/Advertize/Advertize";
import AnimeInfo from "@/component/animeInfo/AnimeInfo";
import Category from "@/component/category/Category";
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
    };
  }

  return {
    title: `Watch ${idToCheck
      .split("-") // Split by hyphen
      .slice(0, -1) // Remove the last part
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(" ")} English Sub/Dub online free on ${siteName}`,
    description: `${siteName} is the best site to watch ${idToCheck
      .split("-") // Split by hyphen
      .slice(0, -1) // Remove the last part
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(" ")} SUB online, or you can even watch ${idToCheck
      .split("-") // Split by hyphen
      .slice(0, -1) // Remove the last part
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(
        " "
      )} DUB in HD quality. You can also watch underrated anime on ${siteName}.`,
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
        <AnimeInfo idd={id} refer={refer} />
      )}
      {refer && <Advertize refer={refer} />}
      <Script
        src="//abackdamstubborn.com/b7/2f/b2/b72fb2e5a32c00a413ee2bb7ea85b317.js"
        strategy="afterInteractive"
        // "afterInteractive" means load script after page hydration
        onError={(e) => {
          console.error("Script failed to load", e);
        }}
      />
    </div>
  );
}
