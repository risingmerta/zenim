/* eslint-disable react/prop-types */
"use client";
import { useEffect, useState } from "react";
import BouncingLoader from "../ui/bouncingloader/Bouncingloader";
import axios from "axios";

export default function IframePlayer({
  animeId,
  episodeId,
  serverName,
  servertype,
  animeInfo,
  episodeNum,
  episodes,
  playNext,
  autoNext,
}) {
  const apis = [
    "https://api.shoko.fun/api",
    "https://api2.shoko.fun/api",
    "https://api3.shoko.fun/api",
  ];

  const API_URL = apis[Math.floor(Math.random() * apis.length)];
  const baseURL =
    serverName.toLowerCase() === "hd-5"
      ? "https://megaplay.buzz/stream/s-2"
      : serverName.toLowerCase() === "hd-4"
      ? "https://vidwish.live/stream/s-2"
      : serverName.toLowerCase() === "hd-1"
      ? "https://vidnest.fun/animepahe"
      : undefined;

  const [loading, setLoading] = useState(true);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeSrc, setIframeSrc] = useState("");
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(
    episodes?.findIndex(
      (episode) => episode.id.match(/ep=(\d+)/)?.[1] === episodeId
    )
  );

  useEffect(() => {
    const loadIframeUrl = async () => {
      setLoading(true);
      setIframeLoaded(false);
      setIframeSrc("");
      const lowerName = serverName.toLowerCase();

      if (lowerName === "hd-5" || lowerName === "hd-4") {
        setIframeSrc(`${baseURL}/${episodeId}/${servertype}`);
      } else if (lowerName === "hd-1") {
        setIframeSrc(
          `${baseURL}/${animeInfo?.anilistId}/${episodeNum}/${servertype}`
        );
      } else if (
        lowerName === "vidstreaming" ||
        lowerName === "vidcloud" ||
        lowerName === "douvideo"
      ) {
        const { data } = await axios.get(
          `${API_URL}/stream?id=${animeId}?ep=${episodeId}&server=${lowerName}&type=${servertype}`
        );
        setIframeSrc(data?.results?.streamingLink?.iframe);
      }
    };

    loadIframeUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [episodeId, servertype, serverName, animeInfo]);

  useEffect(() => {
    if (episodes?.length > 0) {
      const newIndex = episodes.findIndex(
        (episode) => episode.id.match(/ep=(\d+)/)?.[1] === episodeId
      );
      setCurrentEpisodeIndex(newIndex);
    }
  }, [episodeId, episodes]);

  useEffect(() => {
    const handleMessage = (event) => {
      const { currentTime, duration } = event.data;
      if (typeof currentTime === "number" && typeof duration === "number") {
        if (
          currentTime >= duration &&
          currentEpisodeIndex < episodes?.length - 1 &&
          autoNext
        ) {
          playNext(episodes[currentEpisodeIndex + 1].id.match(/ep=(\d+)/)?.[1]);
        }
      }
    };
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [autoNext, currentEpisodeIndex, episodes, playNext]);

  useEffect(() => {
    setLoading(true);
    setIframeLoaded(false);
    return () => {
      const continueWatching =
        JSON.parse(localStorage.getItem("continueWatching")) || [];
      const newEntry = {
        id: animeInfo?.id,
        data_id: animeInfo?.data_id,
        episodeId,
        episodeNum,
        adultContent: animeInfo?.adultContent,
        poster: animeInfo?.poster,
        title: animeInfo?.title,
        japanese_title: animeInfo?.japanese_title,
      };
      if (!newEntry.data_id) return;
      const existingIndex = continueWatching.findIndex(
        (item) => item.data_id === newEntry.data_id
      );
      if (existingIndex !== -1) {
        continueWatching[existingIndex] = newEntry;
      } else {
        continueWatching.push(newEntry);
      }
      localStorage.setItem(
        "continueWatching",
        JSON.stringify(continueWatching)
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [episodeId, servertype]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Loader Overlay */}
      <div
        className={`absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10 transition-opacity duration-500 ${
          loading
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <BouncingLoader />
      </div>

      <iframe
        key={`${episodeId}-${servertype}-${serverName}-${iframeSrc}`}
        src={iframeSrc}
        allowFullScreen
        className={`w-full h-full transition-opacity duration-500 ${
          iframeLoaded ? "opacity-100" : "opacity-0"
        }`}
        sandbox="allow-scripts allow-forms"
        onLoad={() => {
          setIframeLoaded(true);
          setTimeout(() => setLoading(false), 1000);
        }}
      ></iframe>
    </div>
  );
}
