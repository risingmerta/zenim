import AtoZ from "@/component/a2z/AtoZ";
import Advertize from "@/component/Advertize/Advertize";
import Script from "next/script";
import React from "react";

export async function generateMetadata({ params }) {
  const param = await params;
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Animoon";
  const idToCheck = param.id;

  const label = "A to Z";
  return {
    title: `${label} Anime - ${siteName}`,
    // description: `Watch ${label} Anime online free on ${siteName}.`,
  };
}

export default async function page({ params, searchParams }) {
  const param = await params;
  const search = await searchParams;
  const refer = search?.refer;
  const id = param.id;
  const page = search.page || 1;
  return (
    <div>
      <AtoZ path={`az-list/${id}`} page={page} />
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
