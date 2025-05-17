"use client";
import Script from "next/script";
import { useEffect } from "react";

export default function AdComponent({ id }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        window?.invoke?.(); // trigger ad render
      } catch (e) {
        console.error(`Ad invoke error for ${id}:`, e);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [id]);

  return (
    <>
      <div id={`container-${id}`} />
      <Script
        src={`//abackdamstubborn.com/${id}/invoke.js`}
        strategy="lazyOnload"
        data-cfasync="false"
        async
      />
    </>
  );
}
