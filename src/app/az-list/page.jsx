import AtoZ from "@/component/a2z/AtoZ";
import Advertize from "@/component/Advertize/Advertize";
import React from "react";

export async function generateMetadata() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Animoon";
  const label = "A to Z";
  return {
    title: `${label} Anime - ${siteName}`,
    // description: `Watch ${label} Anime online free on ${siteName}.`,
  };
}

export default async function page({ searchParams }) {
  const search = await searchParams;
  const refer = search?.refer;
  const page = search.page || 1;
  return (
    <div>
      <AtoZ path={`az-list`} page={page} />
      {refer && <Advertize refer={refer} />}
    </div>
  );
}
