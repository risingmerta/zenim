"use client";

import React, { useEffect, useState } from "react";

const AdBetweenImages2 = () => {
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    const existing = document.getElementById("adsterra-script");
    if (existing) existing.remove();

    const container = document.getElementById(
      "container-f9941507e70662e23cf6b84168d80e0f"
    );
    if (container) container.innerHTML = "";

    const script = document.createElement("script");
    script.id = "adsterra-script";
    script.setAttribute("data-cfasync", "false");
    script.src = "//embeddedoxide.com/f9941507e70662e23cf6b84168d80e0f/invoke.js";
    script.async = true;

    script.onload = () => setAdLoaded(true);
    document.body.appendChild(script);

    const timer = setTimeout(() => {
      if (!adLoaded) setAdLoaded(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-auto pb-[115%] relative inline-block overflow-hidden max-[575px]:pb-[150%]">
      {/* Side label similar to image cards */} 
      <div className="absolute left-0 top-0 bottom-0 overflow-hidden w-[40px] text-center font-semibold bg-[#201F31] max-[575px]:top-0 max-[575px]:h-[30px] max-[575px]:z-[9] max-[575px]:bg-white">
        <span className="absolute left-0 right-0 bottom-0 text-[24px] leading-[1.1em] text-center z-[9] transform -rotate-90 max-[575px]:transform max-[575px]:rotate-0 max-[575px]:text-[#111] max-[575px]:text-[18px] max-[575px]:leading-[30px]">
          Ad
        </span>
        <div className="w-[150px] h-fit text-left transform -rotate-90 absolute bottom-[100px] left-[-55px] leading-[40px] text-ellipsis whitespace-nowrap overflow-hidden text-white text-[16px] font-medium">
          Sponsored
        </div>
      </div>

      {/* Ad container like image */}
      <div className="inline-block bg-[#2a2c31] absolute w-auto left-[40px] right-0 top-0 bottom-0 max-[575px]:left-0 max-[575px]:top-0 max-[575px]:bottom-0">
        <div
          id="container-f9941507e70662e23cf6b84168d80e0f"
          className="w-full h-full"
        ></div>

        {!adLoaded && (
          <div className="w-full h-full flex justify-center items-center text-white text-xl bg-black">
            💖 Click to support
          </div>
        )}
      </div>
    </div>
  );
};

export default AdBetweenImages2;
