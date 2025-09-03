"use client";
import Script from "next/script";
import React, { useEffect, useState } from "react";

// Shoko.fun

const Page = () => {
  const [adVisible, setAdVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const adContainer = document.getElementById(
        "container-4d1bb62e3a55d2423e3d74a56299aa6e"
      );
      if (adContainer && adContainer.childNodes.length > 0) {
        setAdVisible(true);
      } else {
        setAdVisible(false);
      }
    }, 1000); // Give the script some time to inject content

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#201f31", // dark background
      }}
    >
      <Script
        src="//abdicateeffectlucky.com/4d1bb62e3a55d2423e3d74a56299aa6e/invoke.js"
        strategy="afterInteractive"
        data-cfasync="false"
        async
      />
      <div id="container-4d1bb62e3a55d2423e3d74a56299aa6e" />
      {!adVisible && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            height: "100px",
            color: "#00f2fe",
            fontSize: "14px",
            backgroundColor: "#201f31", // dark background
            border: "1px solid #00f2fe", // theme border
            padding: "8px",
            borderRadius: "6px",
          }}
        >
          <div>Click to supports Shoko 💖</div>
        </div>
      )}
    </div>
  );
};

export default Page;
