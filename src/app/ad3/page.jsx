"use client";

import React, { useEffect, useState } from "react";

const Ad3 = () => {
  const [adVisible, setAdVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setAdVisible(true), 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className="w-full h-full fixed inset-0 m-0 p-0 overflow-hidden bg-black text-white flex items-center justify-center text-2xl"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {adVisible ? "🚀 Dummy Ad Loaded!" : "💖 Loading Ad..."}
    </div>
  );
};

export default Ad3;
