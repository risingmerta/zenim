import Advertize from "@/component/Advertize/Advertize";
import SplashScreen from "@/component/splashscreen/SplashScreen";
import Script from "next/script";
import React from "react";

const page = () => {
  return (
    <div>
      <SplashScreen />
      {/* {refer && <Advertize refer={refer} />} */}
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
};

export default page;
