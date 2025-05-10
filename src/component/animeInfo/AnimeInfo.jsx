"use client";
// import getAnimeInfo from "@/utils/getAnimeInfo.utils";
import "./animeInfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faClosedCaptioning,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import CategoryCard from "@/component/categorycard/CategoryCard";
import Sidecard from "@/component/sidecard/Sidecard";
import Loader from "@/component/Loader/Loader";
import Error from "@/component/error/Error";
import { useLanguage } from "@/context/LanguageContext";
// import { useHomeInfo } from "@/context/HomeInfoContext";
import Voiceactor from "@/component/voiceactor/Voiceactor";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";

const website_name = "Animoon";

function InfoItem({ label, value, isProducer = true, adDiv }) {
  return (
    value && (
      <div className="text-[14px] font-bold">
        {`${label}: `}
        <span className="font-light">
          {Array.isArray(value) ? (
            value.map((item, index) =>
              isProducer ? (
                <Link
                  href={`/producer/${item
                    .replace(/[&'"^%$#@!()+=<>:;,.?/\\|{}[\]`~*_]/g, "")
                    .split(" ")
                    .join("-")
                    .replace(/-+/g, "-")}`}
                  key={index}
                  className="cursor-pointer hover:text-[#00f2fe]"
                >
                  {item}
                  {index < value.length - 1 && ", "}
                </Link>
              ) : (
                <span key={index} className="cursor-pointer">
                  {item}
                </span>
              )
            )
          ) : isProducer ? (
            <Link
              href={`/producer/${value
                .replace(/[&'"^%$#@!()+=<>:;,.?/\\|{}[\]`~*_]/g, "")
                .split(" ")
                .join("-")
                .replace(/-+/g, "-")}`}
              className="cursor-pointer hover:text-[#00f2fe]"
            >
              {value}
            </Link>
          ) : (
            <span className="cursor-pointer">{value}</span>
          )}
        </span>
      </div>
    )
  );
}

function Tag({ bgColor, index, icon, text }) {
  return (
    <div
      className={`flex space-x-1 justify-center items-center px-[4px] py-[1px] text-black font-bold text-[13px] ${
        index === 0 ? "rounded-l-[4px]" : "rounded-none"
      }`}
      style={{ backgroundColor: bgColor }}
    >
      {icon && <FontAwesomeIcon icon={icon} className="text-[12px]" />}
      <p className="text-[12px]">{text}</p>
    </div>
  );
}

export default function AnimeInfo({ random = false, idd, adDiv }) {
  const { language } = useLanguage();
  const id = random ? null : idd;
  const [isFull, setIsFull] = useState(false);
  const [animeInfo, setAnimeInfo] = useState(null);
  const [seasons, setSeasons] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [homeInfo, setHomeInfo] = useState(null);
  const [homeInfoLoading, setHomeInfoLoading] = useState(true);

  const pathname = usePathname();

  // useEffect(() => {
  //   // Function to load the script
  //   const loadScript = () => {
  //     const script = document.createElement("script");
  //     script.async = true;
  //     script.src =
  //       "//abackdamstubborn.com/a6053b92a96db67507afac0ea870db33/invoke.js";
  //     script.setAttribute("data-cfasync", "false");
  //     document.body.appendChild(script);

  //     // Optionally remove the previous script before adding new
  //     const container = document.getElementById(
  //       "container-a6053b92a96db67507afac0ea870db33"
  //     );
  //     if (container) {
  //       container.innerHTML = ""; // Clear container if necessary
  //     }
  //   };

  //   // Call loadScript when the component mounts or when pathname changes
  //   loadScript();

  //   // Cleanup on component unmount or route change
  //   return () => {
  //     const scripts = document.querySelectorAll(
  //       `script[src="//abackdamstubborn.com/a6053b92a96db67507afac0ea870db33/invoke.js"]`
  //     );
  //     scripts.forEach((script) => script.remove());
  //   };
  // }, [pathname]); // Depend on router.pathname to reload when path changes

  useEffect(() => {
    if (typeof window !== "undefined") {
      const adContainer = document.getElementById("ad-container");
      if (adContainer) {
        adContainer.innerHTML = `
              <iframe
                src="/ad"
                style="width: fit-content; height: 100px; border: none; overflow: hidden;"
                scrolling="no"
              ></iframe>
            `;
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const adContainer = document.getElementById("ad-container2");
      if (adContainer) {
        adContainer.innerHTML = `
              <iframe
                src="/ad2"
                style="width: fit-content; height: 100px; border: none; overflow: hidden;"
                scrolling="no"
              ></iframe>
            `;
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const adContainer = document.getElementById("ad-container3");
      if (adContainer) {
        adContainer.innerHTML = `
              <iframe
                src="/ad3"
                style="width: fit-content; height: 100px; border: none; overflow: hidden;"
                scrolling="no"
              ></iframe>
            `;
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const adContainer = document.getElementById("ad-container4");
      if (adContainer) {
        adContainer.innerHTML = `
              <iframe
                src="/ad4"
                style="width: fit-content; height: 100px; border: none; overflow: hidden;"
                scrolling="no"
              ></iframe>
            `;
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const adContainer = document.getElementById("ad-container5");
      if (adContainer) {
        adContainer.innerHTML = `
              <iframe
                src="/ad5"
                style="width: fit-content; height: 100px; border: none; overflow: hidden;"
                scrolling="no"
              ></iframe>
            `;
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const adContainer = document.getElementById("ad-container6");
      if (adContainer) {
        adContainer.innerHTML = `
              <iframe
                src="/ad6"
                style="width: fit-content; height: 100px; border: none; overflow: hidden;"
                scrolling="no"
              ></iframe>
            `;
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const adContainer = document.getElementById("ad-container7");
      if (adContainer) {
        adContainer.innerHTML = `
              <iframe
                src="/ad6"
                style="width: fit-content; height: 100px; border: none; overflow: hidden;"
                scrolling="no"
              ></iframe>
            `;
      }
    }
  }, [pathname]);

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
  const router = useRouter();
  useEffect(() => {
    if (id === "404-not-found-page") {
      console.log("404 got!");
      return null;
    } else {
      const fetchAnimeInfo = async () => {
        setLoading(true);
        try {
          const url = random ? `/api/info?random=true` : `/api/info?id=${id}`;
          const response = await fetch(url);
          const data = await response.json();
          setSeasons(data?.seasons);
          setAnimeInfo(data.data);
        } catch (err) {
          console.error("Error fetching anime info:", err);
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      fetchAnimeInfo();
      typeof window !== "undefined" &&
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [id, random]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (animeInfo && location.pathname === `/${animeInfo.id}`) {
        document.title = `Watch ${animeInfo.title} English Sub/Dub online Free on ${website_name}`;
      }
      return () => {
        document.title = `${website_name} | Free anime streaming platform`;
      };
    }
  }, [animeInfo]);

  if (loading) return <Loader type="animeInfo" />;
  if (error) {
    return <Error />;
  }
  if (!animeInfo) {
    router.push("/404-not-found-page");
    return undefined;
  }
  const { title, japanese_title, poster, animeInfo: info } = animeInfo;
  const tags = [
    {
      condition: info.tvInfo?.rating,
      bgColor: "#ffffff",
      text: info.tvInfo.rating,
    },
    {
      condition: info.tvInfo?.quality,
      bgColor: "#00f2fe",
      text: info.tvInfo.quality,
    },
    {
      condition: info.tvInfo?.sub,
      icon: faClosedCaptioning,
      bgColor: "#B0E3AF",
      text: info.tvInfo.sub,
    },
    {
      condition: info.tvInfo?.dub,
      icon: faMicrophone,
      bgColor: "#B9E7FF",
      text: info.tvInfo.dub,
    },
  ];

  return (
    <>
      <SessionProvider>
        <Navbar />

        <div className="infoContainer">
          <img
            src={`https://wsrv.nl/?url=${poster}`}
            alt={`${title} Poster`}
            className="backgroundPoster"
          />

          <div className="animeInfoBox">
            <div className="relative w-[180px] h-[270px] max-[575px]:w-[140px] max-[575px]:h-[200px] flex-shrink-0">
              <div
                id="ad-container"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  margin: "10px 0",
                }}
              ></div>
              {/* <script
                async="async"
                data-cfasync="false"
                src="//abackdamstubborn.com/a6053b92a96db67507afac0ea870db33/invoke.js"
              ></script> */}
              {adDiv}
              <img
                src={`https://wsrv.nl/?url=${poster}`}
                alt={`${title} Poster`}
                className="w-full h-full object-cover object-center flex-shrink-0"
              />
              {animeInfo.adultContent && (
                <div className="text-white px-2 rounded-md bg-[#FF5700] absolute top-2 left-2 flex items-center justify-center text-[14px] font-bold">
                  18+
                </div>
              )}
            </div>
            <div className="flex flex-col ml-4 gap-y-5 max-[575px]:items-center max-[575px]:justify-center max-[575px]:mt-6 max-[1200px]:ml-0">
              <ul className="flex gap-x-2 items-center w-fit max-[1200px]:hidden">
                {[
                  ["Home", "home"],
                  [info.tvInfo?.showType, info.tvInfo?.showType],
                ].map(([text, link], index) => (
                  <li key={index} className="flex gap-x-3 items-center">
                    <Link
                      href={`/${link}`}
                      className="text-white hover:text-[#00f2fe] text-[15px] font-semibold"
                    >
                      {text}
                    </Link>
                    <div className="dot mt-[1px] bg-white"></div>
                  </li>
                ))}
                <p className="font-light text-[15px] text-gray-300 line-clamp-1 max-[575px]:leading-5">
                  {language === "EN" ? title : japanese_title}
                </p>
              </ul>
              <h1 className="text-4xl font-semibold max-[1200px]:text-3xl max-[575px]:text-2xl max-[575px]:text-center  max-[575px]:leading-7">
                {language === "EN" ? title : japanese_title}
              </h1>
              <div className="flex flex-wrap w-fit gap-x-[2px] mt-3 max-[575px]:mx-auto max-[575px]:mt-0 gap-y-[3px] max-[320px]:justify-center">
                {tags.map(
                  ({ condition, icon, bgColor, text }, index) =>
                    condition && (
                      <Tag
                        key={index}
                        index={index}
                        bgColor={bgColor}
                        icon={icon}
                        text={text}
                      />
                    )
                )}
                <div className="flex w-fit items-center ml-1">
                  {[info.tvInfo?.showType, info.tvInfo?.duration].map(
                    (item, index) =>
                      item && (
                        <div
                          key={index}
                          className="px-1 h-fit flex items-center gap-x-2 w-fit"
                        >
                          <div className="dot mt-[2px]"></div>
                          <p className="text-[14px]">{item}</p>
                        </div>
                      )
                  )}
                </div>
              </div>
              {animeInfo?.animeInfo?.Status?.toLowerCase() !==
              "not-yet-aired" ? (
                <Link
                  href={`/watch/${animeInfo.id}`}
                  className="flex gap-x-2 px-6 py-2 bg-[#00f2fe] w-fit text-black items-center rounded-3xl mt-5"
                >
                  <FontAwesomeIcon
                    icon={faPlay}
                    className="text-[14px] mt-[1px]"
                  />
                  <p className="text-lg font-medium">Watch Now</p>
                </Link>
              ) : (
                <Link
                  href={`/${animeInfo.id}`}
                  className="flex gap-x-2 px-6 py-2 bg-[#00f2fe] w-fit text-black items-center rounded-3xl mt-5"
                >
                  <p className="text-lg font-medium">Not released</p>
                </Link>
              )}
              {info?.Overview && (
                <div className="text-[14px] mt-2 max-[575px]:hidden">
                  {info.Overview.length > 270 ? (
                    <>
                      {isFull
                        ? info.Overview
                        : `${info.Overview.slice(0, 270)}...`}
                      <span
                        className="text-[13px] font-bold hover:cursor-pointer"
                        onClick={() => setIsFull(!isFull)}
                      >
                        {isFull ? "- Less" : "+ More"}
                      </span>
                    </>
                  ) : (
                    info.Overview
                  )}
                </div>
              )}
              <p className="text-[14px] max-[575px]:hidden">
                {`${website_name} is the best site to watch `}
                <span className="font-bold">{title}</span>
                {` SUB online, or you can even watch `}
                <span className="font-bold">{title}</span>
                {` DUB in HD quality.`}
              </p>
              <div className="flex gap-x-4 items-center mt-4 max-[575px]:w-full max-[575px]:justify-center max-[320px]:hidden">
                <img
                  src="https://i.postimg.cc/d34WWyNQ/share-icon.gif"
                  alt="Share Anime"
                  className="w-[60px] h-auto rounded-full max-[1024px]:w-[40px]"
                />
                <div className="flex flex-col w-fit">
                  <p className="text-[15px] font-bold text-[#00f2fe]">
                    Share Anime
                  </p>
                  <p className="text-[16px] text-white">to your friends</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#4c4b57c3] flex items-center px-8 max-[1200px]:py-10 max-[1200px]:bg-[#363544e0] max-[575px]:p-4">
            <div className="w-full flex flex-col h-fit gap-y-3">
              {/* {info?.Overview && (
              <div className="custom-xl:hidden max-h-[150px] overflow-hidden">
                <p className="text-[13px] font-bold">Overview:</p>
                <div className="max-h-[110px] mt-2 overflow-y-scroll">
                  <p className="text-[14px] font-light">{info.Overview}</p>
                </div>
              </div>
            )} */}
              {[
                { label: "Japanese", value: info?.Japanese },
                { label: "Synonyms", value: info?.Synonyms },
                { label: "Aired", value: info?.Aired },
                { label: "Premiered", value: info?.Premiered },
                { label: "Duration", value: info?.Duration },
                { label: "Status", value: info?.Status },
                { label: "MAL Score", value: info?.["MAL Score"] },
              ].map(({ label, value }, index) => (
                <InfoItem
                  key={index}
                  label={label}
                  value={value}
                  isProducer={false}
                />
              ))}
              {info?.Genres && (
                <div className="flex gap-x-2 py-2 custom-xl:border-t custom-xl:border-b custom-xl:border-white/20 max-[1200px]:border-none">
                  <p>Genres:</p>
                  <div className="flex flex-wrap gap-2">
                    {info.Genres.map((genre, index) => (
                      <Link
                        href={`/genre/${genre.split(" ").join("-")}`}
                        key={index}
                        className="text-[14px] font-semibold px-2 py-[1px] border border-gray-400 rounded-2xl hover:text-[#00f2fe]"
                      >
                        {genre}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {[
                { label: "Studios", value: info?.Studios },
                { label: "Producers", value: info?.Producers },
              ].map(({ label, value }, index) => (
                <InfoItem key={index} label={label} value={value} />
              ))}
              {/* <p className="text-[14px] mt-4 custom-xl:hidden">
              {`${website_name} is the best site to watch `}
              <span className="font-bold">{title}</span>
              {` SUB online, or you can even watch `}
              <span className="font-bold">{title}</span>
              {` DUB in HD quality.`}
            </p> */}
            </div>
          </div>
        </div>
        <div
          id="ad-container6"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            margin: "10px 0",
          }}
        ></div>
        {/* <script
          async="async"
          data-cfasync="false"
          src="//abackdamstubborn.com/a6053b92a96db67507afac0ea870db33/invoke.js"
        ></script> */}
        <div id="container-a6053b92a96db67507afac0ea870db33"></div>
        <div className="mainLayoutGrid">
          <div>
            {seasons?.length > 0 && (
              <div className="flex flex-col gap-y-7 mt-8">
                <h1 className="w-fit text-2xl text-[#00f2fe] max-[478px]:text-[18px] font-bold">
                  More Seasons
                </h1>
                <div className="flex flex-wrap gap-4 max-[575px]:grid max-[575px]:grid-cols-3 max-[575px]:gap-3 max-[480px]:grid-cols-2">
                  {seasons.map((season, index) => (
                    <Link
                      href={`/${season.id}`}
                      key={index}
                      className={`relative w-[20%] h-[60px] rounded-lg overflow-hidden cursor-pointer group ${
                        id === String(season.id)
                          ? "border border-[#00f2fe]"
                          : ""
                      } max-[1200px]:w-[140px] max-[575px]:w-full`}
                    >
                      <p
                        className={`text-[13px] text-center font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-2 z-30 line-clamp-2 group-hover:text-[#00f2fe] ${
                          id === String(season.id)
                            ? "text-[#00f2fe]"
                            : "text-white"
                        }`}
                      >
                        {season.season}
                      </p>
                      <div className="absolute inset-0 z-10 bg-[url('https://i.postimg.cc/pVGY6RXd/thumb.png')] bg-repeat"></div>
                      <img
                        src={season.season_poster}
                        alt=""
                        className="w-full h-full object-cover blur-[3px] opacity-50"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <div
              id="ad-container2"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                margin: "10px 0",
              }}
            ></div>
            {animeInfo?.charactersVoiceActors.length > 0 && (
              <Voiceactor animeInfo={animeInfo} />
            )}
            <div
              id="ad-container3"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                margin: "10px 0",
              }}
            ></div>
            {animeInfo.recommended_data.length > 0 && (
              <CategoryCard
                label="Recommended for you"
                data={animeInfo.recommended_data}
                limit={animeInfo.recommended_data.length}
                showViewMore={false}
                className={"mt-8"}
              />
            )}
          </div>
          <div
            id="ad-container4"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              margin: "10px 0",
            }}
          ></div>
          <div>
            {animeInfo.related_data.length > 0 && (
              <Sidecard
                label="Related Anime"
                data={animeInfo.related_data}
                className="mt-8"
              />
            )}
            <div
              id="ad-container5"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                margin: "10px 0",
              }}
            ></div>
            {homeInfo && homeInfo.most_popular && (
              <Sidecard
                label="Most Popular"
                data={homeInfo.most_popular.slice(0, 10)}
                className="mt-[40px]"
                limit={10}
              />
            )}
            <div
              id="ad-container7"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                margin: "10px 0",
              }}
            ></div>
          </div>
        </div>
        <Footer />
      </SessionProvider>
    </>
  );
}
