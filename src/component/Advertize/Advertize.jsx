"use client";
import React, { useEffect, useState } from "react";
import "./advertize.css";
export default function Advertize(props) {
  const [time, setTime] = useState(new Date());
  const [showAd, setShowAd] = useState(false);
  const [directLink, setDirectLink] = useState(
    "https://www.effectivegatecpm.com/rhbukn35v?key=11de2237f91439a908295769e5b4f9ba"
  );

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await fetch(`/api/get-links?userId=${props?.refer}`);
        const result = await res.json();

        if (result?.directLink) {
          // setIsAffiliate(true);
          setDirectLink(result.directLink);
        }
        // if (result?.refLink) {
        //   setRefLink(result.refLink);
        // }
      } catch (err) {
        console.error("Error fetching user links:", err);
      }
    };
    fetchLinks();
  }, []);

  // LocalStorage wrapper
  const localStorageWrapper = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      return {
        getItem: (key) => localStorage.getItem(key),
        setItem: (key, value) => localStorage.setItem(key, value),
        removeItem: (key) => localStorage.removeItem(key),
        clear: () => localStorage.clear(),
      };
    } else {
      return {
        getItem: () => null,
        setItem: () => { },
        removeItem: () => { },
        clear: () => { },
      };
    }
  };

  const ls = localStorageWrapper();

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);

    const lastDisplay = ls.getItem("lastDisplay");
    const lastDate = ls.getItem("lastDate");
    const lastHour = ls.getItem("lastHour");

    const currentDate = time.getDate();
    const currentHour = time.getHours();

    const lastDisplayDate = new Date(lastDisplay);
    const secondsSinceLastDisplay = Math.floor((time - lastDisplayDate) / 1000);

    // Show ad every 30 seconds instead of 1 minute
    const shouldShowAd =
      secondsSinceLastDisplay >= 30 ||
      currentDate !== parseInt(lastDate) ||
      currentHour !== parseInt(lastHour);

    if (shouldShowAd) {
      setShowAd(true);
    } else {
      setShowAd(false);
    }

    return () => clearInterval(interval);
  }, [time]);

  function Newtab() {
    ls.setItem("lastDisplay", new Date().toISOString());
    ls.setItem("lastDate", time.getDate().toString());
    ls.setItem("lastHour", time.getHours().toString());
    ls.setItem("truth", "false");
    window.open(directLink);
  }

  return (
    <div
      className="Advertize"
      style={{ zIndex: showAd ? 100 : -1 }}
      onClick={() => {
        setShowAd(false);
        Newtab();
      }}
    ></div>
  );
}
