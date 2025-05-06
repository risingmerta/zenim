import Script from "next/script";
import React from "react";

const Page = () => {
  return (
    <div>
      <Script
        src="//statespiecehooter.com/6b172acf86dbb48bbeb5e68c6e726c81/invoke.js"
        strategy="afterInteractive"
        async
        data-cfasync="false"
      />
      <div id="container-6b172acf86dbb48bbeb5e68c6e726c81" />
    </div>
  );
};

export default Page;
