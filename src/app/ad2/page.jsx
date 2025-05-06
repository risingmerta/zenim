import Script from "next/script";
import React from "react";

const Page = () => {
  return (
    <div>
      {/* Ad Script */}
      <Script
        src="/statespiecehooter.com/e7adc5efcea4f0969cce1ae3fbb08178/invoke.js"
        strategy="afterInteractive"
        async 
      />

      {/* Ad Container */}
      <div id="container-e7adc5efcea4f0969cce1ae3fbb08178" />
    </div>
  );
};

export default Page;
