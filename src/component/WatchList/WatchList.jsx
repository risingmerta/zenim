"use client";
import CategoryCard from "@/component/categorycard/CategoryCard";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import "./watchList.css";
import PageSlider from "@/component/pageslider/PageSlider";

const getOptionName = (type) => {
  switch (type) {
    case "1": return "Watching";
    case "2": return "On-Hold";
    case "3": return "Plan to Watch";
    case "4": return "Dropped";
    case "5": return "Completed";
    default: return "All";
  }
};

const mapTypeToStatus = {
  1: "Watching",
  2: "On-Hold",
  3: "Plan to Watch",
  4: "Dropped",
  5: "Completed",
};

const WatchList = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const status = mapTypeToStatus[props.type] || null;

  const fetchData = async (currentPage) => {
    try {
      setLoading(true);
      const url = `/api/user-anime-list${status ? `?type=${status}&page=${currentPage}` : `?page=${currentPage}`}`;
      const res = await fetch(url);
      const json = await res.json();

      setData(json.anime || []);
      setPage(json.page || 1);
      setTotalPages(json.totalPages || 1);
      setTotalItems(json.total || 0);
    } catch (err) {
      console.error("Error fetching watch list", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1); // Reset to page 1 when type changes
    fetchData(1);
  }, [props.type]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchData(newPage);
  };

  return (
    <div className="alltio">
      <div className="allInnr">
        <div className="entFa">
          <div className="watCFa">
            <div className="watC">
              <FaHeart />
              Watch List ({totalItems})
            </div>
          </div>

          <div className="butM">
            <div className="butInnM">
              <Link
                href={`/user/watch-list${props.refer ? `?refer=${props.refer}` : `?refer=weebsSecret`}`}
                className={`namil ${!props.type ? "selectedNO" : ""}`}
              >
                All
              </Link>
              {[1, 2, 3, 4, 5].map((type) => (
                <Link
                  key={type}
                  href={`/user/watch-list?type=${type}${props.refer ? `&refer=${props.refer}` : `&refer=weebsSecret`}`}
                  className={`oamil ${props.type === `${type}` ? "selectedNO" : ""}`}
                >
                  {getOptionName(`${type}`)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="ddidd">
        <div className="drd-col">
          <div className="darg d-flex a-center j-center">
            {loading ? (
              <div className="listEmp">Loading...</div>
            ) : data.length > 0 ? (
              <div className="px-4">
                <CategoryCard
                  label=""
                  data={data}
                  showViewMore={false} 
                  categoryPage={false}
                  refer={props.refer}
                  className="mt-0"
                  home="2"
                />
                <PageSlider
                  page={page}
                  totalPages={totalPages}
                  handlePageChange={handlePageChange}
                  refer={props.refer}
                />
              </div>
            ) : (
              <div className="EmLi">
                <div className="listEmp">{getOptionName(props.type)} list is empty</div>
                <div className="adviso">{"<^ Add some animes to the list ^>"}</div>
                <div className="flex adviso-1">
                  <div>\__---</div>
                  <div className="adviso">/\/\/\/\/\/\</div>
                  <div>---__/</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchList;
