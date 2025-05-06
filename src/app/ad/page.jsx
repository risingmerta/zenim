"use client";
import Script from "next/script";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [adVisible, setAdVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const adContainer = document.getElementById("container-89e983895b722d720163a9cbbe699e17");
      if (adContainer && adContainer.childNodes.length > 0) {
        setAdVisible(true);
      } else {
        setAdVisible(false);
      }
    }, 1000); // Give the script some time to inject content

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      <Script
        src="//statespiecehooter.com/89e983895b722d720163a9cbbe699e17/invoke.js"
        strategy="afterInteractive"
        data-cfasync="false"
        async
      />
      <div id="container-89e983895b722d720163a9cbbe699e17"/>
      {!adVisible && (
        <div style={{ textAlign: "center", marginTop: "8px", color: "#999", fontSize: "14px" }}>
          This ad supports Animoon 💖
        </div>
      )}
    </div>
  );
};

export default Page;
