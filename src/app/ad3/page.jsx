import Script from "next/script";
import React from "react";

const Page = () => {
  return (
    <div>
      <Script
        src="//statespiecehooter.com/681a6fb63719eacf9acd7a7850694d10/invoke.js"
        strategy="afterInteractive"
        async
        data-cfasync="false"
      />
      <div id="container-681a6fb63719eacf9acd7a7850694d10" />
    </div>
  );
};

export default Page;
