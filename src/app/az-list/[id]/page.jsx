import AtoZ from "@/component/a2z/AtoZ";
import Advertize from "@/component/Advertize/Advertize";
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
      <Advertize refer={refer} />
    </div>
  );
}
