"use client";
import { useEffect, useRef, useState } from "react";
import "./watch.css";
import { useLanguage } from "@/context/LanguageContext";
import { useHomeInfo } from "@/context/HomeInfoContext";
import { useWatch } from "@/hooks/useWatch";
import BouncingLoader from "@/component/ui/bouncingloader/Bouncingloader";
import Player from "@/component/player/Player";
import Episodelist from "@/component/episodelist/Episodelist";
import Sidecard from "@/component/sidecard/Sidecard";
import CategoryCard from "@/component/categorycard/CategoryCard";
import {
  faClosedCaptioning,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Servers from "@/component/servers/Servers";
import CategoryCardLoader from "@/component/Loader/CategoryCardLoader";
import { Skeleton } from "@/component/ui/Skeleton/Skeleton";
import SidecardLoader from "@/component/Loader/SidecardLoader";
import Voiceactor from "@/component/voiceactor/Voiceactor";
import Watchcontrols from "@/component/watchcontrols/Watchcontrols";
import useWatchControl from "@/hooks/useWatchControl";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { SessionProvider } from "next-auth/react";

const website_name = "Animoon";

export default function Watch(props) {
  const router = useRouter();
  const animeId = props.id;
  // const queryParams = new URLSearchParams(location.search);
  let initialEpisodeId = props.epId;
  const [tags, setTags] = useState([]);
  const { language } = useLanguage();
  const [error, setError] = useState(null);
  const [homeInfo, setHomeInfo] = useState(null);
  const [homeInfoLoading, setHomeInfoLoading] = useState(true);

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
  const isFirstSet = useRef(true);
  const [showNextEpisodeSchedule, setShowNextEpisodeSchedule] = useState(true);
  const {
    // error,
    buffering,
    streamInfo,
    animeInfo,
    episodes,
    nextEpisodeSchedule,
    animeInfoLoading,
    totalEpisodes,
    isFullOverview,
    setIsFullOverview,
    activeEpisodeNum,
    streamUrl,
    subtitles,
    thumbnail,
    intro,
    outro,
    seasons,
    episodeId,
    setEpisodeId,
    activeServerId,
    setActiveServerId,
    servers,
    serverLoading,
  } = useWatch(animeId, initialEpisodeId);
  const {
    autoPlay,
    setAutoPlay,
    autoSkipIntro,
    setAutoSkipIntro,
    autoNext,
    setAutoNext,
  } = useWatchControl();
  // Set episodeId to first episode if not provided in URL
  useEffect(() => {
    if (!episodeId && episodes && episodes.length > 0) {
      const firstEpisodeId = episodes[0].id.match(/ep=(\d+)/)?.[1];
      setEpisodeId(firstEpisodeId);
    }
  }, [episodes, episodeId]);

  // Handle URL updates when episodeId changes
  useEffect(() => {
    if (episodeId) {
      const newUrl = `/watch/${animeId}?ep=${episodeId}`;
      if (isFirstSet.current) {
        // Initial load: replace history entry
        router.push(newUrl, { replace: true });
        isFirstSet.current = false;
      } else {
        // Subsequent changes: push new history entry
        router.push(newUrl);
      }
    }
  }, [episodeId, animeId, router.push]);

  // Update typeof window !== "undefined" && document title
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (animeInfo) {
        document.title = `Watch ${animeInfo.title} English Sub/Dub online Free on ${website_name}`;
      }
      return () => {
        document.title = `${website_name} | Free anime streaming platform`;
      };
    }
  }, [animeId]);

  // Redirect if no episodes
  useEffect(() => {
    if (totalEpisodes !== null && totalEpisodes === 0) {
      router.push(`/${animeId}`);
    }
  }, [streamInfo, episodeId, animeId, totalEpisodes, router.push]);

  useEffect(() => {
    const adjustHeight = () => {
      if (typeof window !== "undefined" && window.innerWidth > 1200) {
        const player =
          typeof window !== "undefined" && document.querySelector(".player");
        const episodes =
          typeof window !== "undefined" && document.querySelector(".episodes");
        if (player && episodes) {
          episodes.style.height = `${player.clientHeight}px`;
        }
      } else {
        const episodes =
          typeof window !== "undefined" && document.querySelector(".episodes");
        if (episodes) {
          episodes.style.height = "auto";
        }
      }
    };
    adjustHeight();
    typeof window !== "undefined" &&
      window.addEventListener("resize", adjustHeight);
    return () => {
      typeof window !== "undefined" &&
        window.removeEventListener("resize", adjustHeight);
    };
  });

  function Tag({ bgColor, index, icon, text }) {
    return (
      <div
        className={`flex space-x-1 justify-center items-center px-[4px] py-[1px] text-black font-semibold text-[13px] ${
          index === 0 ? "rounded-l-[4px]" : "rounded-none"
        }`}
        style={{ backgroundColor: bgColor }}
      >
        {icon && <FontAwesomeIcon icon={icon} className="text-[12px]" />}
        <p className="text-[12px]">{text}</p>
      </div>
    );
  }

  useEffect(() => {
    setTags([
      {
        condition: animeInfo?.animeInfo?.tvInfo?.rating,
        bgColor: "#ffffff",
        text: animeInfo?.animeInfo?.tvInfo?.rating,
      },
      {
        condition: animeInfo?.animeInfo?.tvInfo?.quality,
        bgColor: "#FFBADE",
        text: animeInfo?.animeInfo?.tvInfo?.quality,
      },
      {
        condition: animeInfo?.animeInfo?.tvInfo?.sub,
        icon: faClosedCaptioning,
        bgColor: "#B0E3AF",
        text: animeInfo?.animeInfo?.tvInfo?.sub,
      },
      {
        condition: animeInfo?.animeInfo?.tvInfo?.dub,
        icon: faMicrophone,
        bgColor: "#B9E7FF",
        text: animeInfo?.animeInfo?.tvInfo?.dub,
      },
    ]);
  }, [animeId, animeInfo]);

  const pathname = usePathname();

  useEffect(() => {
    const adContainer = document.getElementById("ad-container");

    if (typeof window !== "undefined" && adContainer) {
      adContainer.style.display = "none"; // Hide by default
      adContainer.style.height = "0"; // Set height to 0 to remove space

      adContainer.innerHTML = `
        <iframe
          id="ad-iframe"
          src="/ad"
          style="width: fit-content; height: 100px; border: none; overflow: hidden;"
          scrolling="no"
        ></iframe>
      `;

      const iframe = adContainer.querySelector("#ad-iframe");

      if (iframe) {
        iframe.addEventListener("load", () => {
          setTimeout(() => {
            adContainer.style.display = "block"; // Show when loaded
            adContainer.style.height = "100px"; // Set height back to 100px
          }, 100);
        });

        iframe.addEventListener("error", () => {
          adContainer.style.display = "none"; // Hide the container if it fails
          adContainer.style.height = "0"; // Set height to 0 to remove space
        });
      }
    }
  }, [pathname]);
  return (
    <>
      <SessionProvider>
        <Navbar />
        <div className="w-full h-fit flex flex-col justify-center items-center relative">
          <div className="w-full relative max-[1400px]:px-[30px] max-[1200px]:px-[80px] max-[1024px]:px-0">
            <img
              src={
                !animeInfoLoading
                  ? `https://wsrv.nl/?url=${animeInfo?.poster}`
                  : "https://i.postimg.cc/rFZnx5tQ/2-Kn-Kzog-md.webp"
              }
              alt={`${animeInfo?.title} Poster`}
              className="backgroundImage"
            />
            <div className="backgroundOverlay"></div>
            <div id="ad-container"></div>
            <div className="layoutWrapper">
              {animeInfo && (
                <ul className="flex absolute left-4 top-[-40px] gap-x-2 items-center w-fit max-[1200px]:hidden">
                  {[
                    ["Home", "home"],
                    [animeInfo?.showType, animeInfo?.showType],
                  ].map(([text, link], index) => (
                    <li key={index} className="flex gap-x-3 items-center">
                      <Link
                        href={`/${link}`}
                        className="text-white hover:text-[#FFBADE] text-[15px] font-semibold"
                      >
                        {text}
                      </Link>
                      <div className="dot mt-[1px] bg-white"></div>
                    </li>
                  ))}
                  <p className="font-light text-[15px] text-gray-300 line-clamp-1 max-[575px]:leading-5">
                    Watching{" "}
                    {language === "EN"
                      ? animeInfo?.title
                      : animeInfo?.japanese_title}
                  </p>
                </ul>
              )}
              <div className="flex w-full min-h-fit max-[1200px]:flex-col-reverse">
                <div className="episodes w-[35%] bg-[#191826] flex justify-center items-center max-[1400px]:w-[380px] max-[1200px]:w-full max-[1200px]:h-full max-[1200px]:min-h-[100px]">
                  {!episodes ? (
                    <BouncingLoader />
                  ) : (
                    <Episodelist
                      episodes={episodes}
                      currentEpisode={episodeId}
                      onEpisodeClick={(id) => setEpisodeId(id)}
                      totalEpisodes={totalEpisodes}
                    />
                  )}
                </div>
                <div className="player w-full h-fit bg-black flex flex-col">
                  <div className="w-full relative h-[480px] max-[1400px]:h-[40vw] max-[1200px]:h-[48vw] max-[1024px]:h-[58vw] max-[600px]:h-[65vw]">
                    {!buffering ? (
                      <Player
                        streamUrl={streamUrl}
                        subtitles={subtitles}
                        intro={intro}
                        outro={outro}
                        thumbnail={thumbnail}
                        autoSkipIntro={autoSkipIntro}
                        autoPlay={autoPlay}
                        autoNext={autoNext}
                        episodeId={episodeId}
                        episodes={episodes}
                        playNext={(id) => setEpisodeId(id)}
                        animeInfo={animeInfo}
                        episodeNum={activeEpisodeNum}
                        streamInfo={streamInfo}
                      />
                    ) : (
                      <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                        <BouncingLoader />
                      </div>
                    )}
                    <p className="text-center underline font-medium text-[15px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                      {!buffering && !streamInfo ? (
                        servers ? (
                          <>
                            Probably this server is down, try other servers
                            <br />
                            Either reload or try again after sometime
                          </>
                        ) : (
                          <>
                            Probably streaming server is down
                            <br />
                            Either reload or try again after sometime
                          </>
                        )
                      ) : null}
                    </p>
                  </div>

                  {!buffering && (
                    <Watchcontrols
                      autoPlay={autoPlay}
                      setAutoPlay={setAutoPlay}
                      autoSkipIntro={autoSkipIntro}
                      setAutoSkipIntro={setAutoSkipIntro}
                      autoNext={autoNext}
                      setAutoNext={setAutoNext}
                      episodes={episodes}
                      totalEpisodes={totalEpisodes}
                      episodeId={episodeId}
                      onButtonClick={(id) => setEpisodeId(id)}
                    />
                  )}
                  <Servers
                    servers={servers}
                    activeEpisodeNum={activeEpisodeNum}
                    activeServerId={activeServerId}
                    setActiveServerId={setActiveServerId}
                    serverLoading={serverLoading}
                  />
                  {seasons?.length > 0 && (
                    <div className="flex flex-col gap-y-2 bg-[#11101A] p-4">
                      <h1 className="w-fit text-lg max-[478px]:text-[18px] font-semibold">
                        Watch more seasons of this anime
                      </h1>
                      <div className="flex flex-wrap gap-4 max-[575px]:grid max-[575px]:grid-cols-3 max-[575px]:gap-3 max-[480px]:grid-cols-2">
                        {seasons.map((season, index) => (
                          <Link
                            href={`/${season.id}`}
                            key={index}
                            className={`relative w-[20%] h-[60px] rounded-lg overflow-hidden cursor-pointer group ${
                              animeId === String(season.id)
                                ? "border border-[#ffbade]"
                                : ""
                            } max-[1200px]:w-[140px] max-[575px]:w-full`}
                          >
                            <p
                              className={`text-[13px] text-center font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-2 z-30 line-clamp-2 group-hover:text-[#ffbade] ${
                                animeId === String(season.id)
                                  ? "text-[#ffbade]"
                                  : "text-white"
                              }`}
                            >
                              {season.season}
                            </p>
                            <div className="absolute inset-0 z-10 bg-[url('https://i.postimg.cc/pVGY6RXd/thumb.png')] bg-repeat"></div>
                            <img
                              src={`https://wsrv.nl/?url=${season.season_poster}`}
                              alt=""
                              className="w-full h-full object-cover blur-[3px] opacity-50"
                            />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  {nextEpisodeSchedule?.nextEpisodeSchedule &&
                    showNextEpisodeSchedule && (
                      <div className="p-4">
                        <div className="w-full px-4 rounded-md bg-[#0088CC] flex items-center justify-between gap-x-2">
                          <div className="w-full h-fit">
                            <span className="text-[18px]">🚀</span>
                            {" Estimated the next episode will come at "}
                            <span className="text-[13.4px] font-medium">
                              {new Date(
                                new Date(
                                  nextEpisodeSchedule.nextEpisodeSchedule
                                ).getTime() -
                                  new Date().getTimezoneOffset() * 60000
                              ).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                                hour12: true,
                              })}
                            </span>
                          </div>
                          <span
                            className="text-[25px] h-fit font-extrabold text-[#80C4E6] mb-1 cursor-pointer"
                            onClick={() => setShowNextEpisodeSchedule(false)}
                          >
                            ×
                          </span>
                        </div>
                      </div>
                    )}
                </div>
              </div>
              <div className="flex flex-col gap-y-4 items-start ml-8 max-[1400px]:ml-0 max-[1400px]:mt-10 max-[1400px]:flex-row max-[1400px]:gap-x-6 max-[1024px]:px-[30px] max-[1024px]:mt-8 max-[500px]:mt-4 max-[500px]:px-4">
                {animeInfo && animeInfo?.poster ? (
                  <img
                    src={`https://wsrv.nl/?url=${animeInfo?.poster}`}
                    alt=""
                    className="w-[100px] h-[150px] object-cover max-[500px]:w-[70px] max-[500px]:h-[90px]"
                  />
                ) : (
                  <Skeleton className="w-[100px] h-[150px] rounded-none" />
                )}
                <div className="flex flex-col gap-y-4 justify-start">
                  {animeInfo && animeInfo?.title ? (
                    <p className="text-[26px] font-medium leading-6 max-[500px]:text-[18px]">
                      {language ? animeInfo?.title : animeInfo?.japanese_title}
                    </p>
                  ) : (
                    <Skeleton className="w-[170px] h-[20px] rounded-xl" />
                  )}
                  <div className="flex flex-wrap w-fit gap-x-[2px] gap-y-[3px]">
                    {animeInfo ? (
                      tags.map(
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
                      )
                    ) : (
                      <Skeleton className="w-[70px] h-[20px] rounded-xl" />
                    )}
                    <div className="flex w-fit items-center ml-1">
                      {[
                        animeInfo?.animeInfo?.tvInfo?.showType,
                        animeInfo?.animeInfo?.tvInfo?.duration,
                      ].map(
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
                  {animeInfo ? (
                    animeInfo?.animeInfo?.Overview && (
                      <div className="max-h-[150px] overflow-hidden">
                        <div className="max-h-[110px] mt-2 overflow-y-auto">
                          <p className="text-[14px] font-[400]">
                            {animeInfo?.animeInfo?.Overview.length > 270 ? (
                              <>
                                {isFullOverview
                                  ? animeInfo?.animeInfo?.Overview
                                  : `${animeInfo?.animeInfo?.Overview.slice(
                                      0,
                                      270
                                    )}...`}
                                <span
                                  className="text-[13px] font-bold hover:cursor-pointer"
                                  onClick={() =>
                                    setIsFullOverview(!isFullOverview)
                                  }
                                >
                                  {isFullOverview ? "- Less" : "+ More"}
                                </span>
                              </>
                            ) : (
                              animeInfo?.animeInfo?.Overview
                            )}
                          </p>
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="flex flex-col gap-y-2">
                      <Skeleton className="w-[200px] h-[10px] rounded-xl" />
                      <Skeleton className="w-[160px] h-[10px] rounded-xl" />
                      <Skeleton className="w-[100px] h-[10px] rounded-xl" />
                      <Skeleton className="w-[80px] h-[10px] rounded-xl" />
                    </div>
                  )}
                  <p className="text-[14px] max-[575px]:hidden">
                    {`${website_name} is the best site to watch `}
                    <span className="font-bold">
                      {language ? animeInfo?.title : animeInfo?.japanese_title}
                    </span>
                    {` SUB online, or you can even watch `}
                    <span className="font-bold">
                      {language ? animeInfo?.title : animeInfo?.japanese_title}
                    </span>
                    {` DUB in HD quality.`}
                  </p>
                  <Link
                    href={`/${animeId}`}
                    className="w-fit text-[13px] bg-white rounded-[12px] px-[10px] py-1 text-black"
                  >
                    View detail
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex gap-x-4 items-center bg-[#191826] p-5 max-[575px]:px-3 max-[320px]:hidden">
            <img
              src="https://i.postimg.cc/d34WWyNQ/share-icon.gif"
              alt="Share Anime"
              className="w-[60px] h-auto rounded-full max-[1024px]:w-[40px] max-[575px]:hidden"
            />
            <div className="flex flex-col w-fit">
              <p className="text-[15px] font-bold text-[#FFBADE]">
                Share Anime
              </p>
              <p className="text-[16px] text-white">to your friends</p>
            </div>
          </div>
          <div className="contentWrapper">
            <div className="mt-[15px] flex flex-col gap-y-7">
              {animeInfo?.charactersVoiceActors.length > 0 && (
                <Voiceactor animeInfo={animeInfo} className="!mt-0" />
              )}
              {animeInfo?.recommended_data.length > 0 ? (
                <CategoryCard
                  label="Recommended for you"
                  data={animeInfo?.recommended_data}
                  limit={animeInfo?.recommended_data.length}
                  showViewMore={false}
                />
              ) : (
                <CategoryCardLoader className={"mt-[15px]"} />
              )}
            </div>
            <div>
              {animeInfo && animeInfo.related_data ? (
                <Sidecard
                  label="Related Anime"
                  data={animeInfo.related_data}
                  className="mt-[15px]"
                />
              ) : (
                <SidecardLoader className={"mt-[25px]"} />
              )}
              {homeInfo && homeInfo.most_popular && (
                <Sidecard
                  label="Most Popular"
                  data={homeInfo.most_popular.slice(0, 10)}
                  className="mt-[15px]"
                  limit={10}
                />
              )}
            </div>
          </div>
        </div>
        <Footer />
      </SessionProvider>
    </>
  );
}
