import Advertize from "@/component/Advertize/Advertize";
import Category from "@/component/category/Category";
import Script from "next/script";
import React from "react";

export async function generateMetadata({ params }) {
  const param = await params;
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Animoon";
  const idToCheck = param.id;

  const toCapitalize = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const label = toCapitalize(idToCheck.split("-").join(" "));
  return {
    title: `${label} Anime - ${siteName}`,
    // description: `Watch ${label} Anime online free on ${siteName}.`,
  };
}

export default async function page({ params, searchParams }) {
  const param = await params;
  const searchParam = await searchParams;
  const refer = searchParam?.refer;
  const id = param.id;
  const page = searchParam.page || 1;
  return (
    <div>
      <Category
        path={"genre/" + id}
        label={id.split("-")?.join(" ")}
        pagel={page}
      />
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
