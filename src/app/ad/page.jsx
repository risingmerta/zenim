"use client";
import Script from "next/script";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [adVisible, setAdVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const adContainer = document.getElementById(
        "container-0859fb809e643c637c15e0aeb8d5b17a"
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
        backgroundColor: "#1a1a1a", // dark background
      }}
    >
      <Script
        src="//abackdamstubborn.com/0859fb809e643c637c15e0aeb8d5b17a/invoke.js"
        strategy="afterInteractive"
        data-cfasync="false"
        async
      />
      <div id="container-0859fb809e643c637c15e0aeb8d5b17a" />
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
            backgroundColor: "#1a1a1a", // dark background
            border: "1px solid #00f2fe", // theme border
            padding: "8px",
            borderRadius: "6px",
          }}
        >
          <div>Click to supports Animoon 💖</div>
        </div>
      )}
    </div>
  );
};

export default Page;
