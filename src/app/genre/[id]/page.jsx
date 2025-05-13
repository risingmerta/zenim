import Advertize from "@/component/Advertize/Advertize";
import Category from "@/component/category/Category";
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
    </div>
  );
}
