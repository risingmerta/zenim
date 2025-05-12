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

export default function Home() {
  const [selectL, setSelectL] = useState("EN");
  const lang = (lang) => {
    setSelectL(lang);
  }; 
  const website_name = "Animoon";
  const [homeInfo, setHomeInfo] = useState(null);
  const [homeInfoLoading, setHomeInfoLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeInfo = async () => {
      try {
        const res = await fetch("/api/home");
        const data = await res.json();
        setHomeInfo(data);
      } catch (err) {
        console.error("Error fetching home info:", err);
        setError(err);
      } finally {
        setHomeInfoLoading(false);
      }
    };
    fetchHomeInfo();
  }, []);

  if (homeInfoLoading) return <Loader type="home" />;
  if (error) return <Error />;
  if (!homeInfo) return <Error error="404" />;

  return (
    <>
      <SessionProvider>
        <Navbar lang={lang} selectL={selectL} />
        <div className="home-container">
          <Spotlight spotlights={homeInfo.spotlights} selectL={selectL} />

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
          </div>
          <ContinueWatching selectL={selectL} />
          <div
            id="ad-container6"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              margin: "10px 0",
            }}
          ></div>
          <Trending trending={homeInfo.trending} selectL={selectL} />
          <div
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
          </div>

          <div className="mt-10 flex gap-6 max-[1200px]:px-4 max-[1200px]:grid max-[1200px]:grid-cols-2 max-[1200px]:mt-12 max-[1200px]:gap-y-10 max-[680px]:grid-cols-1">
            <Cart
              label="Top Airing"
              data={homeInfo.top_airing}
              path="top-airing"
              selectL={selectL}
            />
            <Cart
              label="Most Popular"
              data={homeInfo.most_popular}
              path="most-popular"
              selectL={selectL}
            />
            <Cart
              label="Most Favorite"
              data={homeInfo.most_favorite}
              path="most-favorite"
              selectL={selectL}
            />
            <Cart
              label="Latest Completed"
              data={homeInfo.latest_completed}
              path="completed"
              selectL={selectL}
            />
          </div>

          <div
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
          </div>

          <div className="main-content-grid">
            <div className="left-content">
              <CategoryCard
                label="Latest Episode"
                data={homeInfo.latest_episode}
                className={"mt-[60px]"}
                path="recently-updated"
                limit={12}
                selectL={selectL}
              />
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  margin: "10px 0",
                }}
              >
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
              <CategoryCard
                label={`New On ${website_name}`}
                data={homeInfo.recently_added}
                className={"mt-[60px]"}
                path="recently-added"
                limit={12}
                selectL={selectL}
              />
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  margin: "10px 0",
                }}
              >
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
              <Schedule selectL={selectL} />
              <div
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
              </div>
              <CategoryCard
                label="Top Upcoming"
                data={homeInfo.top_upcoming}
                className={"mt-[30px]"}
                path="top-upcoming"
                limit={12}
                selectL={selectL}
              />
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
              </div>
            </div>

            <div className="right-sidebar">
              <Genre data={homeInfo.genres} />
              <div
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
              </div>
              <Topten
                data={homeInfo.topten}
                className={"mt-12"}
                selectL={selectL}
              />
              <div
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
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </SessionProvider>
    </>
  );
}
