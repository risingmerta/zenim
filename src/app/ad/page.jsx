"use client";
import Script from "next/script";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [adVisible, setAdVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const adContainer = document.getElementById(
        "container-0edc04a5374d9021ce8e6b9f5bb01d53"
      );
      if (adContainer && adContainer.childNodes.length > 0) {
        setAdVisible(true);
      } else {
        setAdVisible(false);
      }
    }, 1000); // Wait for script to load

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#1a1a1a", // Match your dark theme
        minHeight: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <Script
        src="//abackdamstubborn.com/0edc04a5374d9021ce8e6b9f5bb01d53/invoke.js"
        strategy="afterInteractive"
        data-cfasync="false"
        async
      />
      <div
        id="container-0edc04a5374d9021ce8e6b9f5bb01d53"
        style={{
          width: "100%",
          maxWidth: "360px",
          height: "100px",
          display: adVisible ? "block" : "none",
        }}
      />
      {!adVisible && (
        <div
          style={{
            width: "100%",
            maxWidth: "360px",
            height: "100px",
            color: "#00f2fe",
            fontSize: "14px",
            backgroundColor: "#1a1a1a",
            border: "1px solid #00f2fe",
            padding: "8px",
            borderRadius: "6px",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>Click to support Animoon 💖</div>
        </div>
      )}
    </div>
  );
};

export default Page;
