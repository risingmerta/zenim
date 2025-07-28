"use client";

import React, { useEffect, useState } from "react";

const AdBetweenImages = () => {
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    const existing = document.getElementById('adsterra-script');
    if (existing) existing.remove(); // cleanup if already injected

    const container = document.getElementById('container-b29918b4e5fbf3e4c13e32f24c7c143c');
    if (container) container.innerHTML = '';

    const script = document.createElement('script');
    script.id = 'adsterra-script';
    script.setAttribute('data-cfasync', 'false');
    script.src = '//embeddedoxide.com/b29918b4e5fbf3e4c13e32f24c7c143c/invoke.js';
    script.async = true;

    script.onload = () => setAdLoaded(true);
    document.body.appendChild(script);

    // fallback timeout
    const timer = setTimeout(() => {
      if (!adLoaded) setAdLoaded(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-auto pb-[140%] relative inline-block overflow-hidden bg-black">
      <div className="absolute left-0 top-0 w-full h-full flex flex-col overflow-hidden">
        <div
          id="container-b29918b4e5fbf3e4c13e32f24c7c143c"
          className="w-full h-full"
        ></div>

        {!adLoaded && (
          <div className="w-full text-center text-white text-xl p-2">
            💖 Click to support
          </div>
        )}
      </div>
    </div>
  );
};

export default AdBetweenImages;
