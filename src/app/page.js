import Advertize from "@/component/Advertize/Advertize";
import SplashScreen from "@/component/splashscreen/SplashScreen";
import Script from "next/script";
import React from "react";

export default async function page() {
  let results = [];
  try {
    const apis = [
      "https://api.animoon.me/api",
      // "https://api1.animoon.me/api",
      "https://api2.animoon.me/api",
      "https://api3.animoon.me/api",
      // "https://vimal.animoon.me/api",
    ];

    const baseUrl = apis[Math.floor(Math.random() * apis.length)];
    const res = await fetch(`${baseUrl}/top-search`, {
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    results = data?.results || [];
  } catch (error) {
    console.error("Error fetching top search data:", error);
    return null;
  }
  return (
    <div>
      <SplashScreen results={results} />
      {/* {refer && <Advertize refer={refer} />} */}
      <Script
        src="//abackdamstubborn.com/b7/2f/b2/b72fb2e5a32c00a413ee2bb7ea85b317.js"
        strategy="afterInteractive"
        // "afterInteractive" means load script after page hydration
      />
    </div>
  );
}
