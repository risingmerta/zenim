import Script from "next/script";
import React from "react";

const Page = () => {
  return (
    <div>
      <Script
        src="//statespiecehooter.com/89e983895b722d720163a9cbbe699e17/invoke.js"
        strategy="afterInteractive"
        data-cfasync="false"
        async
      />
      <div id="container-89e983895b722d720163a9cbbe699e17" />
    </div>
  );
};

export default Page;
