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
import AdComponent from "../adComponent/adComponent";

export default function Home(props) {
  const [selectL, setSelectL] = useState("EN");
  const lang = (lang) => {
    setSelectL(lang);
  };
  const website_name = "Animoon";
  // const [homeInfo, setHomeInfo] = useState(props.data);
  const homeInfo = props.data;
  const [homeInfoLoading, setHomeInfoLoading] = useState(false);
  const [error, setError] = useState(null);

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
          <AdComponent id="0edc04a5374d9021ce8e6b9f5bb01d53" />
          <ContinueWatching selectL={selectL} refer={props.refer} />
          <Trending
            trending={homeInfo.trending}
            selectL={selectL}
            refer={props.refer}
          />
          <AdComponent id="8ff2f9b0f1a544b4c8fe21a8086da14e" />
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
          <AdComponent id="072578f5a4df72a3692182642476bbea" />
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
              />
              <AdComponent id="cd746754796510a55d9ef4d9a4260a75" />
              <CategoryCard
                label={`New On ${website_name}`}
                data={homeInfo.recently_added}
                className={"mt-[60px]"}
                path="recently-added"
                limit={12}
                selectL={selectL}
                refer={props.refer}
              />
              <AdComponent id="dbafd6a4e452fd720e2121278664c057" />
              <Schedule selectL={selectL} refer={props.refer} />
              <AdComponent id="747f4fcb7dc611b1e8d9ed8822f2c89c" />
              <CategoryCard
                label="Top Upcoming"
                data={homeInfo.top_upcoming}
                className={"mt-[30px]"}
                path="top-upcoming"
                limit={12}
                selectL={selectL}
                refer={props.refer}
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
