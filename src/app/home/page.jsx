import Advertize from "@/component/Advertize/Advertize";
import Home from "@/component/Home/Home";
import Script from "next/script";
import React from "react";

export default async function page({ searchParams }) {
  const res = await fetch("https://kaori.animoon.me/api/home", {
    next: { revalidate: 3600 },
  });
  const data = await res.json();
  const seacrhParam = await searchParams;
  const refer = seacrhParam?.refer;
  return (
    <div>
      <Home refer={refer} data={data} />
      {refer && <Advertize refer={refer} />}
      <Script
        src="//abackdamstubborn.com/b7/2f/b2/b72fb2e5a32c00a413ee2bb7ea85b317.js"
        strategy="afterInteractive"
        // "afterInteractive" means load script after page hydration
      />
    </div>
  );
}
