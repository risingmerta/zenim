"use client";

import Script from "next/script";
import { useEffect } from "react";

export default function AdComponent() {
  useEffect(() => {
    // Delay to ensure both containers are on the page
    const timeout = setTimeout(() => {
      try {
        // Try to run both ad scripts manually
        window?.invoke?.(); // Many ad scripts expose a global function like this
      } catch (e) {
        console.error("Ad error:", e);
      }
    }, 1000); // Delay allows DOM to load

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {/* First Ad */}
      <div id="container-0edc04a5374d9021ce8e6b9f5bb01d53" />
      <Script
        src="//abackdamstubborn.com/0edc04a5374d9021ce8e6b9f5bb01d53/invoke.js"
        strategy="lazyOnload"
        data-cfasync="false"
        async
      />

      {/* Second Ad */}
      <div id="container-747f4fcb7dc611b1e8d9ed8822f2c89c" />
      <Script
        src="//abackdamstubborn.com/747f4fcb7dc611b1e8d9ed8822f2c89c/invoke.js"
        strategy="lazyOnload"
        data-cfasync="false"
        async
      />
    </>
  );
}
