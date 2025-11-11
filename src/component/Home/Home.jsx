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
import Share from "../Share/Share";

export default function Home(props) {
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
        <Navbar lang={lang} selectL={selectL} refer={props.refer} />
        <div className="home-container"> 
          <Spotlight
            spotlights={homeInfo.spotlights}
            selectL={selectL}
            refer={props.refer}
          />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px 0",
            backgroundColor: "#201f31",
          }}
        >
          <iframe
            src="/ad"
            title="Sponsored Ad"
            scrolling="no"

            referrerPolicy="no-referrer-when-downgrade"
            style={{
              width: "100%",
              maxWidth: "728px",
              height: "90px",
              border: "none",
              borderRadius: "10px",
              overflow: "hidden",
              backgroundColor: "#201f31",
            }}
          />
        </div>
          <ContinueWatching selectL={selectL} refer={props.refer} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px 0",
            backgroundColor: "#201f31",
          }}
        >
          <iframe
            src="/ad"
            title="Sponsored Ad"
            scrolling="no"

            referrerPolicy="no-referrer-when-downgrade"
            style={{
              width: "100%",
              maxWidth: "728px",
              height: "90px",
              border: "none",
              borderRadius: "10px",
              overflow: "hidden",
              backgroundColor: "#201f31",
            }}
          />
        </div>
          <Trending
            trending={homeInfo.trending}
            selectL={selectL}
            refer={props.refer}
          />

          <Share
            ShareUrl={`https://shoko.fun/home${
              props.refer ? `?refer=${props.refer}` : `?refer=weebsSecret`
            }`}
          />

          <div className="mt-10 flex gap-6 max-[1200px]:px-4 max-[1200px]:grid max-[1200px]:grid-cols-2 max-[1200px]:mt-12 max-[1200px]:gap-y-10 max-[680px]:grid-cols-1">
            <Cart
              label="Top Airing"
              data={homeInfo.top_airing}
              path="top-airing"
              selectL={selectL}
              refer={props.refer}
            />
            <Cart
              label="Most Popular"
              data={homeInfo.most_popular}
              path="most-popular"
              selectL={selectL}
              refer={props.refer}
            />
            <Cart
              label="Most Favorite"
              data={homeInfo.most_favorite}
              path="most-favorite"
              selectL={selectL}
              refer={props.refer}
            />
            <Cart
              label="Latest Completed"
              data={homeInfo.latest_completed}
              path="completed"
              selectL={selectL}
              refer={props.refer}
            />
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
                refer={props.refer}
                home={"01"}
              />
              <CategoryCard
                label={`New On ${website_name}`}
                data={homeInfo.recently_added}
                className={"mt-[60px]"}
                path="recently-added"
                limit={12}
                selectL={selectL}
                refer={props.refer}
                home={"02"}
              />
              <Schedule selectL={selectL} refer={props.refer} />
              <CategoryCard
                label="Top Upcoming"
                data={homeInfo.top_upcoming}
                className={"mt-[30px]"}
                path="top-upcoming"
                limit={12}
                selectL={selectL}
                refer={props.refer}
                home={"03"}
              />
            </div>

            <div className="right-sidebar">
              <Genre data={homeInfo.genres} refer={props.refer} />
              <Topten
                data={homeInfo.topten}
                className={"mt-12"}
                selectL={selectL}
                refer={props.refer}
              />
            </div>
          </div>
        </div>
        <Footer refer={props.refer} />
      </SessionProvider>
    </>
  );
}
