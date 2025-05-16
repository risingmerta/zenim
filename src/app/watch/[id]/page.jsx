import Advertize from "@/component/Advertize/Advertize";
import Watch from "@/component/watch/Watch";
import Script from "next/script";
import React from "react";

export async function generateMetadata({ params, searchParams }) {
  const param = await params;
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Animoon";
  const idToCheck = param.id;

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
  const { id } = param;
  const { ep } = searchParam;
  const refer = searchParam?.refer;
  return (
    <div>
      <Watch id={id} epId={ep} refer={refer} />
      {refer && <Advertize refer={refer} />}
      {/* <Script
        src="//abackdamstubborn.com/b7/2f/b2/b72fb2e5a32c00a413ee2bb7ea85b317.js"
        strategy="afterInteractive"
        // "afterInteractive" means load script after page hydration
      /> */}
    </div>
  );
}
