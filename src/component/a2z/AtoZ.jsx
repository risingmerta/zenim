"use client";
import { useEffect, useState } from "react";
import getCategoryInfo from "@/utils/getCategoryInfo.utils";
import CategoryCard from "@/component/categorycard/CategoryCard";
import Loader from "@/component/Loader/Loader";
import Error from "@/component/error/Error";
import PageSlider from "@/component/pageslider/PageSlider";
import Link from "next/link";
import "./atoz.css";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";

export default function AtoZ({ path, pagel ,refer }) {
  const [selectL, setSelectL] = useState("EN");
  const lang = (lang) => {
    setSelectL(lang);
  };
  const [searchParams, setSearchParams] = useState(pagel);
  const [categoryInfo, setCategoryInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const page = searchParams || 1;
  const currentLetter = path.split("/").pop() || "";

  useEffect(() => {
    const fetchAtoZInfo = async () => {
      setLoading(true);
      try {
        const data = await getCategoryInfo(path, page);
        setCategoryInfo(data.data);
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error("Error fetching category info:", err);
      }
    };
    fetchAtoZInfo();
    typeof window !== "undefined" && window.scrollTo(0, 0);
  }, [path, page]);

  if (loading) return <Loader type="AtoZ" />;
  if (error) {
    return <Error />;
  }
  if (!categoryInfo) {
    return null;
  }
  const handlePageChange = (newPage) => {
    setSearchParams(newPage);
  };

  return (
    <>
      <SessionProvider>
        <Navbar lang={lang} selectL={selectL} refer={refer}/>
        <div className="max-w-[1260px] mx-auto px-[15px] flex flex-col mt-[70px] max-md:mt-[70px]">
          <ul className="flex gap-x-2 mt-[50px] items-center w-fit max-[1200px]:hidden">
            <li className="flex gap-x-3 items-center">
              <Link
                href={`/home${refer ? `?refer=${refer}` : `?refer=weebhideout`}`}
                className="text-white hover:text-[#00f2fe] text-[17px]"
              >
                Home
              </Link>
              <div className="dot mt-[1px] bg-white"></div>
            </li>
            <li className="font-light">A-Z List</li>
          </ul>
          {/* <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              margin: "10px 0",
            }}
          >
            <iframe
              src="/ad6"
              style={{
                width: "fit-content",
                height: "100px",
                border: "none",
                overflow: "hidden",
              }}
              scrolling="no"
            ></iframe>
            <div className="adClusterMain">
              <iframe
                src="/ad"
                style={{
                  width: "fit-content",
                  height: "100px",
                  border: "none",
                  overflow: "hidden",
                }}
                scrolling="no"
              ></iframe>
            </div>
            <div className="adCluster">
              <iframe
                src="/ad2"
                style={{
                  width: "fit-content",
                  height: "100px",
                  border: "none",
                  overflow: "hidden",
                }}
                scrolling="no"
              ></iframe>
            </div>
          </div> */}
          <Script
            src="//abackdamstubborn.com/0edc04a5374d9021ce8e6b9f5bb01d53/invoke.js"
            strategy="afterInteractive"
            data-cfasync="false"
            async
          />
          <div id="container-0edc04a5374d9021ce8e6b9f5bb01d53" />
          <div className="flex flex-col gap-y-5 mt-6">
            <h1 className="font-bold text-2xl text-[#00f2fe] max-[478px]:text-[18px]">
              Sort By Letters
            </h1>
            <div className="flex gap-x-[7px] flex-wrap justify-start gap-y-2 max-md:justify-start">
              {[
                "All",
                "#",
                "0-9",
                ...Array.from({ length: 26 }, (_, i) =>
                  String.fromCharCode(65 + i)
                ),
              ].map((item, index) => {
                const linkPath =
                  item.toLowerCase() === "all"
                    ? ""
                    : item === "#"
                    ? "other"
                    : item;
                const isActive =
                  (currentLetter === "az-list" &&
                    item.toLowerCase() === "all") ||
                  (currentLetter === "other" && item === "#") ||
                  currentLetter.toLowerCase() === item.toLowerCase();

                return (
                  <Link
                    href={`/az-list/${linkPath}${
                      refer ? `?refer=${refer}` : `?refer=weebhideout`
                    }`}
                    key={index}
                    className={`custom-button ${isActive ? "active" : ""}`}
                  >
                    {item}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="w-full flex flex-col gap-y-8">
            <div>
              {categoryInfo && categoryInfo.length > 0 && (
                <CategoryCard
                  data={categoryInfo}
                  limit={categoryInfo.length}
                  showViewMore={false}
                  className="mt-0"
                  cardStyle="max-[1400px]:h-[35vw]"
                  selectL={selectL}
                  refer={refer}
                />
              )}
              {/* <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                  marginBottom: "-40px",
                }}
              >
                <iframe
                  src="/ad6"
                  style={{
                    width: "fit-content",
                    height: "100px",
                    border: "none",
                    overflow: "hidden",
                  }}
                  scrolling="no"
                ></iframe>
                <div className="adClusterMain">
                  <iframe
                    src="/ad"
                    style={{
                      width: "fit-content",
                      height: "100px",
                      border: "none",
                      overflow: "hidden",
                    }}
                    scrolling="no"
                  ></iframe>
                </div>
                <div className="adCluster">
                  <iframe
                    src="/ad2"
                    style={{
                      width: "fit-content",
                      height: "100px",
                      border: "none",
                      overflow: "hidden",
                    }}
                    scrolling="no"
                  ></iframe>
                </div>
              </div> */}
              <Script
                src="//abackdamstubborn.com/8ff2f9b0f1a544b4c8fe21a8086da14e/invoke.js"
                strategy="afterInteractive"
                data-cfasync="false"
                async
              />
              <div id="container-8ff2f9b0f1a544b4c8fe21a8086da14e" />
              <PageSlider
                page={page}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
                refer={refer}
              />
              {/* <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  margin: "20px 0",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    margin: "10px 0",
                  }}
                >
                  <iframe
                    src="/ad6"
                    style={{
                      width: "fit-content",
                      height: "100px",
                      border: "none",
                      overflow: "hidden",
                    }}
                    scrolling="no"
                  ></iframe>
                  <div className="adClusterMain">
                    <iframe
                      src="/ad"
                      style={{
                        width: "fit-content",
                        height: "100px",
                        border: "none",
                        overflow: "hidden",
                      }}
                      scrolling="no"
                    ></iframe>
                  </div>
                  <div className="adCluster">
                    <iframe
                      src="/ad2"
                      style={{
                        width: "fit-content",
                        height: "100px",
                        border: "none",
                        overflow: "hidden",
                      }}
                      scrolling="no"
                    ></iframe>
                  </div>
                </div>
              </div> */}
              <Script
                src="//abackdamstubborn.com/072578f5a4df72a3692182642476bbea/invoke.js"
                strategy="afterInteractive"
                data-cfasync="false"
                async
              />
              <div id="container-072578f5a4df72a3692182642476bbea" />
            </div>
          </div>
        </div>
        <Footer refer={refer}/>
      </SessionProvider>
    </>
  );
}
