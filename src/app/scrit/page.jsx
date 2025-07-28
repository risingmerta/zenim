"use client";

import { useEffect } from "react";

const adUnits = [
  {
    scriptSrc: "//embeddedoxide.com/c809959ef4d8f3ad5e1ec5708f4439d6/invoke.js",
    containerId: "container-c809959ef4d8f3ad5e1ec5708f4439d6",
  },
  {
    scriptSrc: "//embeddedoxide.com/31d3850c905ac096ccfbc9ac7aee5c00/invoke.js",
    containerId: "container-31d3850c905ac096ccfbc9ac7aee5c00",
  },
  {
    scriptSrc: "//embeddedoxide.com/247f274ff033c8c535bb867db1af935d/invoke.js",
    containerId: "container-247f274ff033c8c535bb867db1af935d",
  },
  {
    scriptSrc: "//embeddedoxide.com/acb4c6f0cb771933036f9bbbfdfbb5af/invoke.js",
    containerId: "container-acb4c6f0cb771933036f9bbbfdfbb5af",
  },
  {
    scriptSrc: "//embeddedoxide.com/83c5d632e0982c51342f6437a748dc55/invoke.js",
    containerId: "container-83c5d632e0982c51342f6437a748dc55",
  },
  {
    scriptSrc: "//embeddedoxide.com/105fe9e2fdacf29b65185122dd4ffbb9/invoke.js",
    containerId: "container-105fe9e2fdacf29b65185122dd4ffbb9",
  },
  {
    scriptSrc: "//embeddedoxide.com/2643529c182798cf5d7fc6713ea559bb/invoke.js",
    containerId: "container-2643529c182798cf5d7fc6713ea559bb",
  },
];

export default function ScriptPage({ searchParams }) {
  const page = parseInt(searchParams?.page || "0");
  const ad = adUnits[page] || adUnits[0];

  useEffect(() => {
    const existing = document.getElementById("ad-script");
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.id = "ad-script";
    script.src = ad.scriptSrc;
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    document.body.appendChild(script);
  }, [page]);

  return (
    <div
      style={{
        width: "99vw",
        height: "99vh",
        margin: 0,
        padding: 0,
        backgroundColor: "#2a2c31",
      }}
    >
      <div id={ad.containerId} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
