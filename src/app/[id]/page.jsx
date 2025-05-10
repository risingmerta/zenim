import AdInjector from "@/component/AdInjector/AdInjector";
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
      description: `Watch ${label} Anime online free on ${siteName}.`,
    };
  }

  return {
    title: `Watch ${idToCheck
      .split("-")
      .slice(0, -1)
      .join(" ")} English Sub/Dub online free on ${siteName}`,
    description: `${siteName} is the best site to watch ${idToCheck
      .split("-")
      .slice(0, -1)
      .join(" ")} SUB online, or you can even watch ${idToCheck
      .split("-")
      .slice(0, -1)
      .join(
        " "
      )} DUB in HD quality. You can also watch underrated anime on ${siteName}.`,
  };
}

export default async function page({ params, searchParams }) {
  const param = await params;
  const searchParam = await searchParams;
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
        <Category path={id} label={id.split("-")?.join(" ")} pagel={page} />
      ) : (
        <AnimeInfo idd={id} />
      )}
      <Advertize />
      <AdInjector/>
    </div>
  );
}
