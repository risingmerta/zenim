"use client";

import React, { useEffect, useRef, useState } from "react";

const AdIframe = ({ index }) => {
  const iframeRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (iframeRef.current) {
      observer.observe(iframeRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="flex flex-col transition-transform duration-300 ease-in-out"
      style={{ height: "fit-content" }}
    >
      <div
        ref={iframeRef}
        className="relative w-full overflow-hidden rounded-lg transition duration-300 ease-in-out group h-[250px] bg-[#2a2c31]"
        style={{ overflow: "hidden" }}
      >
        <span className="absolute top-2 left-2 bg-orange-600 text-white text-sm font-semibold px-2 py-1 rounded z-10">
          Ad
        </span>
        {inView && (
          <iframe
            src={`/scrit?page=${index}`}
            title={`Ad-${index}`}
            className="w-full h-full rounded-lg"
            loading="lazy"
            style={{
              border: "none",
              pointerEvents: "none", // Optional: prevents interaction with iframe content
            }}
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default AdIframe;
