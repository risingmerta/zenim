"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AdInjector() {
  const pathname = usePathname();

  useEffect(() => {
    const adConfigs = [
      { id: "ad-container", src: "/ad" },
      { id: "ad-container2", src: "/ad2" },
      { id: "ad-container3", src: "/ad3" },
      { id: "ad-container4", src: "/ad4" },
      { id: "ad-container5", src: "/ad5" },
      { id: "ad-container6", src: "/ad6" },
      { id: "ad-container7", src: "/ad6" }, // Seems like a typo? Same as ad6
    ];

    adConfigs.forEach(({ id, src }) => {
      const container = document.getElementById(id);
      if (container) {
        container.innerHTML = `
          <iframe
            src="${src}"
            style="width: fit-content; height: 100px; border: none; overflow: hidden;"
            scrolling="no"
          ></iframe>
        `;
      }
    });
  }, [pathname]);

  return null; // This component is just for injecting ads
};

