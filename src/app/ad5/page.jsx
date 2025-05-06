import Script from "next/script";
import React from "react";

const Page = () => {
  return (
    <div>
      <Script
        src="//statespiecehooter.com/d192950f19f95bee7dc3351b263a7324/invoke.js"
        strategy="afterInteractive"
        async
        data-cfasync="false"
      />
      <div id="container-d192950f19f95bee7dc3351b263a7324" />
    </div>
  );
};

export default Page;
