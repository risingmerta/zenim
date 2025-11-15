export const dynamic = "force-dynamic";

import AdComponent from "@/component/adComponent/adComponent";
import Advertize from "@/component/Advertize/Advertize";
import BottomLeftAd from "@/component/BottomLeftAd/BottomLeftAd";
import SplashScreen from "@/component/splashscreen/SplashScreen";
import Script from "next/script";
import React from "react";

export default async function Page({ searchParams }) {
  const searchParam = await searchParams;
  let results = [];
  try {
    const apis = [
      "https://newpi.henpro.fun/api",
      "https://newpi2.henpro.fun/api",
      "https://newpi3.henpro.fun/api",
    ];

    const baseUrl = apis[Math.floor(Math.random() * apis.length)];
    const res = await fetch(`${baseUrl}/top-search`);
    const data = await res.json();
    results = data?.results || [];
  } catch (error) {
    console.error("Error fetching top search data:", error);
  }
  return (
    <div>
      <SplashScreen results={results} refer={searchParam.refer} />
      <Advertize />
      {/* <BottomLeftAd /> */}
      {/* <Script
        src="//abackdamstubborn.com/b7/2f/b2/b72fb2e5a32c00a413ee2bb7ea85b317.js"
        strategy="afterInteractive"
        // "afterInteractive" means load script after page hydration
      /> */}
      {/* <Script
        src="//abackdamstubborn.com/0edc04a5374d9021ce8e6b9f5bb01d53/invoke.js"
        strategy="afterInteractive"
        data-cfasync="false"
        async
      />
      <div id="container-0edc04a5374d9021ce8e6b9f5bb01d53" /> */}
      {/* <AdComponent /> */}
    </div>
  );
}
