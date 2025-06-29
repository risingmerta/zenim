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
  const [watchList, setWatchList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const pageSize = 24;
  const currentPage = parseInt(props.page) || 1;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = JSON.parse(localStorage.getItem("continueWatching") || "[]");
      setWatchList(data);
      setTotalPages(Math.ceil(data.length / pageSize));
    }
  }, []);

  const getPage = (pageNumber) => {
    return watchList.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  };

  const data = getPage(currentPage);

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

  if (watchList.length === 0) return null;

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
            {data.map((anime, idx) => (
              <Card key={anime.id} data={anime} delay={idx * 0.05} keepIt="true" />
            ))}
          </div>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="paginA">
          {currentPage > 1 && (
            <>
              <Link href={`/user/continue-watching?refer=${props.refer}`} className="pagin-tile">
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
