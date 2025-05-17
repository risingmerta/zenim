"use client";
import Spotlight from "@/component/spotlight/Spotlight.jsx";
import Trending from "@/component/trending/Trending.jsx";
import Cart from "@/component/cart/Cart.jsx";
import CategoryCard from "@/component/categorycard/CategoryCard.jsx";
import Genre from "@/component/genres/Genre.jsx";
import Topten from "@/component/topten/Topten.jsx";
import Loader from "@/component/Loader/Loader.jsx";
import Error from "@/component/error/Error.jsx";
import Schedule from "@/component/schedule/Schedule";
import ContinueWatching from "@/component/continue/ContinueWatching";
import { useEffect, useState } from "react";
import "./home.css"; // Import the CSS file here
import Navbar from "../Navbar/Navbar";
import { SessionProvider } from "next-auth/react";
import Footer from "../Footer/Footer";
import { usePathname } from "next/navigation";
import Script from "next/script";

export default function Home({ refer, data, children }) {
  const childrenArray = Array.isArray(children) ? children : [children];
  const [selectL, setSelectL] = useState("EN");
  const lang = (lang) => {
    setSelectL(lang);
  };
  const website_name = "Animoon";
  // const [homeInfo, setHomeInfo] = useState(props.data);
  const homeInfo = data;
  const [homeInfoLoading, setHomeInfoLoading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchHomeInfo = async () => {
  //     try {
  //       const res = await fetch("/api/home");
  //       const data = await res.json();
  //       setHomeInfo(data);
  //     } catch (err) {
  //       console.error("Error fetching home info:", err);
  //       setError(err);
  //     } finally {
  //       setHomeInfoLoading(false);
  //     }
  //   };
  //   fetchHomeInfo();
  // }, []);

  if (homeInfoLoading) return <Loader type="home" />;
  if (error) return <Error />;
  if (!homeInfo) return <Error error="404" />;

  return (
    <>
      <SessionProvider>
        <Navbar lang={lang} selectL={selectL} refer={refer} />
        <div className="home-container">
          <Spotlight
            spotlights={homeInfo.spotlights}
            selectL={selectL}
            refer={refer}
          />
          {/* <Script
            src="//abackdamstubborn.com/0edc04a5374d9021ce8e6b9f5bb01d53/invoke.js"
            strategy="afterInteractive"
            data-cfasync="false"
            async
          />
          <div id="container-0edc04a5374d9021ce8e6b9f5bb01d53" /> */}
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
          {childrenArray[0]}
          <ContinueWatching selectL={selectL} refer={refer} />
          {/* <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              margin: "10px 0",
            }}
          >
            <iframe
              src="/ad5"
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
                src="/ad3"
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
                src="/ad4"
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
          <Trending
            trending={homeInfo.trending}
            selectL={selectL}
            refer={refer}
          />
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
          {/* <Script
            src="//abackdamstubborn.com/8ff2f9b0f1a544b4c8fe21a8086da14e/invoke.js"
            strategy="afterInteractive"
            data-cfasync="false"
            async
          />
          <div id="container-8ff2f9b0f1a544b4c8fe21a8086da14e" /> */}
          {childrenArray[1]}
          <div className="mt-10 flex gap-6 max-[1200px]:px-4 max-[1200px]:grid max-[1200px]:grid-cols-2 max-[1200px]:mt-12 max-[1200px]:gap-y-10 max-[680px]:grid-cols-1">
            <Cart
              label="Top Airing"
              data={homeInfo.top_airing}
              path="top-airing"
              selectL={selectL}
              refer={refer}
            />
            <Cart
              label="Most Popular"
              data={homeInfo.most_popular}
              path="most-popular"
              selectL={selectL}
              refer={refer}
            />
            <Cart
              label="Most Favorite"
              data={homeInfo.most_favorite}
              path="most-favorite"
              selectL={selectL}
              refer={refer}
            />
            <Cart
              label="Latest Completed"
              data={homeInfo.latest_completed}
              path="completed"
              selectL={selectL}
              refer={refer}
            />
          </div>

          {/* <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              margin: "10px 0",
            }}
          >
            <iframe
              src="/ad5"
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
                src="/ad3"
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
                src="/ad4"
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
          {/* <Script
            src="//abackdamstubborn.com/072578f5a4df72a3692182642476bbea/invoke.js"
            strategy="afterInteractive"
            data-cfasync="false"
            async
          />
          <div id="container-072578f5a4df72a3692182642476bbea" /> */}
          {childrenArray[2]}
          <div className="main-content-grid">
            <div className="left-content">
              <CategoryCard
                label="Latest Episode"
                data={homeInfo.latest_episode}
                className={"mt-[60px]"}
                path="recently-updated"
                limit={12}
                selectL={selectL}
                refer={refer}
              />
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
              {/* <Script
                src="//abackdamstubborn.com/cd746754796510a55d9ef4d9a4260a75/invoke.js"
                strategy="afterInteractive"
                data-cfasync="false"
                async
              />
              <div id="container-cd746754796510a55d9ef4d9a4260a75" /> */}
              {childrenArray[3]}
              <CategoryCard
                label={`New On ${website_name}`}
                data={homeInfo.recently_added}
                className={"mt-[60px]"}
                path="recently-added"
                limit={12}
                selectL={selectL}
                refer={refer}
              />
              {/* <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  margin: "10px 0",
                }}
              >
                <iframe
                  src="/ad5"
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
                    src="/ad4"
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
                    src="/ad3"
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
              {/* <Script
              src="//abackdamstubborn.com/dbafd6a4e452fd720e2121278664c057/invoke.js"
              strategy="afterInteractive"
              data-cfasync="false"
              async
            />
            <div id="container-dbafd6a4e452fd720e2121278664c057" /> */}
              {childrenArray[4]}
              <Schedule selectL={selectL} refer={refer} />
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
              {/* <Script
              src="//abackdamstubborn.com/747f4fcb7dc611b1e8d9ed8822f2c89c/invoke.js"
              strategy="afterInteractive"
              data-cfasync="false"
              async
            />
            <div id="container-747f4fcb7dc611b1e8d9ed8822f2c89c" /> */}
              {childrenArray[5]}
              <CategoryCard
                label="Top Upcoming"
                data={homeInfo.top_upcoming}
                className={"mt-[30px]"}
                path="top-upcoming"
                limit={12}
                selectL={selectL}
                refer={refer}
              />
              {/* <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  margin: "10px 0",
                }}
              >
                <iframe
                  src="/ad5"
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
                    src="/ad4"
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
                    src="/ad3"
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
              {/* <Script
                src="//abackdamstubborn.com/0edc04a5374d9021ce8e6b9f5bb01d53/invoke.js"
                strategy="afterInteractive"
                data-cfasync="false"
                async
              />
              <div id="container-0edc04a5374d9021ce8e6b9f5bb01d53" /> */}
            </div>

            <div className="right-sidebar">
              <Genre data={homeInfo.genres} refer={refer} />
              {/* <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  margin: "10px 0",
                }}
              >
                <iframe
                  src="/ad5"
                  style={{
                    width: "fit-content",
                    height: "100px",
                    border: "none",
                    overflow: "hidden",
                  }}
                  scrolling="no"
                ></iframe>
              </div> */}
              {/* <Script
                src="//abackdamstubborn.com/0edc04a5374d9021ce8e6b9f5bb01d53/invoke.js"
                strategy="afterInteractive"
                data-cfasync="false"
                async
              />
              <div id="container-0edc04a5374d9021ce8e6b9f5bb01d53" /> */}
              <Topten
                data={homeInfo.topten}
                className={"mt-12"}
                selectL={selectL}
                refer={refer}
              />
              {/* <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  margin: "10px 0",
                }}
              >
                <iframe
                  src="/ad4"
                  style={{
                    width: "fit-content",
                    height: "100px",
                    border: "none",
                    overflow: "hidden",
                  }}
                  scrolling="no"
                ></iframe>
              </div> */}
              {/* <Script
                src="//abackdamstubborn.com/0edc04a5374d9021ce8e6b9f5bb01d53/invoke.js"
                strategy="afterInteractive"
                data-cfasync="false"
                async
              />
              <div id="container-0edc04a5374d9021ce8e6b9f5bb01d53" /> */}
            </div>
          </div>
        </div>
        <Footer refer={refer} />
      </SessionProvider>
    </>
  );
}
