"use client";
import React, { useState, useEffect } from "react";
import "./continueWatching.css";
import Card from "../Card/Card";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
  FaHistory,
} from "react-icons/fa";
import Link from "next/link";

const ContinueWatching = (props) => {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const currentPage = parseInt(props.page) || 1;
  const pageSize = 24;

  useEffect(() => {
    if (typeof window !== "undefined") {
      loadData();
    }
  }, []);

  const loadData = () => {
    const raw = localStorage.getItem("continueWatching");
    const list = raw ? JSON.parse(raw) : [];

    const formattedData = list.map((item) => {
      const episodeId = item.episodeId;
      const watchedSec = parseInt(localStorage.getItem(`${episodeId}-time`)) || 0;
      const totalSec = parseInt(localStorage.getItem(`${episodeId}-duration`)) || 0;

      const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s.toString().padStart(2, "0")}`;
      };

      const watchProgress =
        totalSec > 0 ? `${formatTime(watchedSec)} / ${formatTime(totalSec)}` : null;

      const progressPercent =
        totalSec > 0 ? Math.min(100, Math.floor((watchedSec / totalSec) * 100)) : 0;

      return { ...item, watchProgress, progressPercent };
    });

    setData(formattedData);
    setTotalPages(Math.ceil(formattedData.length / pageSize));
  };

  const handleRemove = (episodeId) => {
    const raw = localStorage.getItem("continueWatching");
    const list = raw ? JSON.parse(raw) : [];

    const updated = list.filter((item) => item.episodeId !== episodeId);
    localStorage.setItem("continueWatching", JSON.stringify(updated));

    localStorage.removeItem(`${episodeId}-time`);
    localStorage.removeItem(`${episodeId}-duration`);

    loadData();
  };

  const getPage = (pageNumber) => {
    return data.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  };

  const pagedData = getPage(currentPage);

  let useArr = [];
  if (totalPages <= 3) {
    useArr = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else if (currentPage < 3) {
    useArr = [1, 2, 3];
  } else if (currentPage >= totalPages - 1) {
    useArr = [totalPages - 2, totalPages - 1, totalPages];
  } else {
    useArr = [currentPage - 1, currentPage, currentPage + 1];
  }

  if (data.length === 0) return null;

  return (
    <div className="contiAll">
      <div className="conticFa">
        <div className="contic">
          <FaHistory />
          Continue Watching
        </div>
      </div>

      <div className="midd">
        <div className="crd-col">
          <div className="carg d-flex a-center j-center">
            {pagedData.map((anime, idx) => (
              <div key={anime.episodeId} className="relative">
                <button
                  onClick={() => handleRemove(anime.episodeId)}
                  className="absolute top-1 right-1 z-10 text-white bg-black/70 hover:bg-red-600 px-2 py-1 rounded-full text-xs"
                >
                  ✖
                </button>

                <Card
                  data={anime}
                  delay={idx * 0.05}
                  keepIt="true"
                />

                {anime.watchProgress && (
                  <div
                    className="w-full h-1 bg-gray-700 rounded mt-1 overflow-hidden"
                    title={anime.watchProgress}
                  >
                    <div
                      className="h-full bg-[#00f2fe]"
                      style={{ width: `${anime.progressPercent}%` }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="paginA">
          {currentPage > 1 && (
            <>
              <Link
                href={`/user/continue-watching?refer=${props.refer}`}
                className="pagin-tile"
              >
                <FaAngleDoubleLeft />
              </Link>
              <Link
                href={`/user/continue-watching?page=${currentPage - 1}&refer=${props.refer}`}
                className="pagin-tile"
              >
                <FaAngleLeft />
              </Link>
            </>
          )}

          {useArr.map((pageNum) => (
            <Link
              key={pageNum}
              href={`/user/continue-watching?page=${pageNum}&refer=${props.refer}`}
              className={`pagin-tile ${currentPage === pageNum ? "pagin-colo" : ""}`}
            >
              {pageNum}
            </Link>
          ))}

          {currentPage < totalPages && (
            <>
              <Link
                href={`/user/continue-watching?page=${currentPage + 1}&refer=${props.refer}`}
                className="pagin-tile"
              >
                <FaAngleRight />
              </Link>
              <Link
                href={`/user/continue-watching?page=${totalPages}&refer=${props.refer}`}
                className="pagin-tile"
              >
                <FaAngleDoubleRight />
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ContinueWatching;
