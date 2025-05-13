import SplashScreen from "@/component/splashscreen/SplashScreen";
import Script from "next/script";
import React from "react";

const page = () => {
  return (
    <div>
      <SplashScreen />
      <Script id="ad-config" strategy="afterInteractive">
        {`
          atOptions = {
            'key': '5a4702186f11d8612bd54788262c0734',
            'format': 'iframe',
            'height': 90,
            'width': 728,
            'params': {}
          };
        `}
      </Script>

      {/* External JS script */}
      <Script
        src="//abackdamstubborn.com/5a4702186f11d8612bd54788262c0734/invoke.js"
        strategy="afterInteractive"
      />
    </div>
  );
};

export default page;
