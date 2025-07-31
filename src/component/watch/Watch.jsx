"use client";
import { useEffect, useRef, useState } from "react";
import "./watch.css";
// import { useLanguage } from "@/context/LanguageContext";
// import { useHomeInfo } from "@/context/HomeInfoContext";
// import { useWatch } from "@/hooks/useWatch";
import BouncingLoader from "@/component/ui/bouncingloader/Bouncingloader";
import IframePlayer from "@/component/player/IframePlayer";
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
import Script from "next/script";
import getStreamInfo from "@/utils/getStreamInfo.utils";
import getServers from "@/utils/getServers.utils";
import Share from "../Share/Share";

const website_name = "Animoon";

export default function Watch(props) {
  const [selectL, setSelectL] = useState("EN");
  const lang = (lang) => {
    setSelectL(lang);
  };
  const router = useRouter();
  const animeId = props.id;
  // const queryParams = new URLSearchParams(location.search);
  let initialEpisodeId = props.epId;
  const [tags, setTags] = useState([]);
  const language = selectL;
  const [error, setError] = useState(null);
  const homeInfo = props.homeData;

  const isFirstSet = useRef(true);
  const [showNextEpisodeSchedule, setShowNextEpisodeSchedule] = useState(true);
  // const [error, setError] = useState(null);
  const [buffering, setBuffering] = useState(true);
  const [streamInfo, setStreamInfo] = useState(null);
  const [animeInfo, setAnimeInfo] = useState(null);
  const [episodes, setEpisodes] = useState(null);
  const [animeInfoLoading, setAnimeInfoLoading] = useState(false);
  const [totalEpisodes, setTotalEpisodes] = useState(null);
  const [seasons, setSeasons] = useState(null);
  const [servers, setServers] = useState(null);
  const [streamUrl, setStreamUrl] = useState(null);
  const [isFullOverview, setIsFullOverview] = useState(false);
  const [subtitles, setSubtitles] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [intro, setIntro] = useState(null);
  const [outro, setOutro] = useState(null);
  const [episodeId, setEpisodeId] = useState(null);
  const [activeEpisodeNum, setActiveEpisodeNum] = useState(null);
  const [activeServerId, setActiveServerId] = useState(null);
  const [activeServerType, setActiveServerType] = useState(null);
  const [activeServerName, setActiveServerName] = useState(null);
  const [serverLoading, setServerLoading] = useState(true);
  const nextEpisodeSchedule = props.scheduleData;
  const isServerFetchInProgress = useRef(false);
  const isStreamFetchInProgress = useRef(false);

  let message;

  if (props.scheduleData?.releaseDate && props.scheduleData?.time) {
    // Combine release date and time (UTC-safe)
    const dateStr = `${props.scheduleData?.releaseDate}T${props.scheduleData?.time}:00Z`;

    const nextEpisodeDate = new Date(dateStr);

    if (isNaN(nextEpisodeDate)) {
      message = "🚨 There was an error with the episode schedule date.";
    } else {
      const formattedDate = nextEpisodeDate.toLocaleString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

      message = `${formattedDate}`;
    }
  } else {
    message = "";
  }

  useEffect(() => {
    setEpisodes(null);
    setEpisodeId(null);
    setActiveEpisodeNum(null);
    setServers(null);
    setActiveServerId(null);
    setActiveServerType(null);
    setActiveServerName(null);
    setStreamInfo(null);
    setStreamUrl(null);
    setSubtitles([]);
    setThumbnail(null);
    setIntro(null);
    setOutro(null);
    setBuffering(true);
    setServerLoading(true);
    setError(null);
    setAnimeInfo(null);
    setSeasons(null);
    setTotalEpisodes(null);
    setAnimeInfoLoading(true);
    isServerFetchInProgress.current = false;
    isStreamFetchInProgress.current = false;
  }, [props.id]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setAnimeInfoLoading(true);

        const animeData = props.infoData;
        const episodesData = props.episodeData;

        setAnimeInfo(animeData?.data);
        setSeasons(animeData?.seasons);
        setEpisodes(episodesData?.episodes);
        setTotalEpisodes(episodesData?.totalEpisodes);

        const newEpisodeId =
          initialEpisodeId ||
          (episodesData?.episodes?.length > 0
            ? episodesData.episodes[0].id.match(/ep=(\d+)/)?.[1]
            : null);

        setEpisodeId(newEpisodeId);
      } catch (err) {
        console.error("Error setting initial data:", err);
        setError(err.message || "An error occurred.");
      } finally {
        setAnimeInfoLoading(false);
      }
    };

    fetchInitialData();
  }, [props.id]);

  useEffect(() => {
    if (!episodes || !episodeId) {
      setActiveEpisodeNum(null);
      return;
    }
    const activeEpisode = episodes.find((episode) => {
      const match = episode.id.match(/ep=(\d+)/);
      return match && match[1] === episodeId;
    });
    const newActiveEpisodeNum = activeEpisode ? activeEpisode.episode_no : null;
    if (activeEpisodeNum !== newActiveEpisodeNum) {
      setActiveEpisodeNum(newActiveEpisodeNum);
    }
  }, [episodeId, episodes]);

  useEffect(() => {
    if (!episodeId || !episodes || isServerFetchInProgress.current) return;

    const fetchServers = async () => {
      isServerFetchInProgress.current = true;
      setServerLoading(true);
      try {
        const data = await getServers(animeId, episodeId);
        const filteredServers = data?.filter(
          (server) =>
            server.serverName === "HD-3" ||
            server.serverName === "HD-1" ||
            server.serverName === "HD-2"
        );
        const savedServerName =
          typeof window !== "undefined" && localStorage.getItem("server_name");
        const savedServerType =
          typeof window !== "undefined" && localStorage.getItem("server_type");
        let initialServer;
        initialServer = data.find(
          (server) =>
            server.serverName === savedServerName &&
            server.type === savedServerType
        );
        if (!initialServer) {
          initialServer = data.find(
            (server) =>
              server.serverName === savedServerName &&
              server.type !== savedServerType
          );
        }
        if (!initialServer) {
          initialServer =
            data.find(
              (server) =>
                server.type === savedServerType && server.serverName === "HD-3"
            ) ||
            data.find(
              (server) =>
                server.type === savedServerType && server.serverName === "HD-1"
            ) ||
            data.find(
              (server) =>
                server.type === savedServerType && server.serverName === "HD-2"
            );
        }
        if (!initialServer) {
          initialServer = filteredServers[0];
        }
        setServers(filteredServers);
        setActiveServerId(initialServer?.data_id);
        setActiveServerType(initialServer?.type);
        setActiveServerName(initialServer?.serverName);
      } catch (error) {
        console.error("Error fetching servers:", error);
        setError(error.message || "An error occurred.");
      } finally {
        setServerLoading(false);
        isServerFetchInProgress.current = false;
      }
    };
    fetchServers();
  }, [episodeId, episodes]);

  // Fetch stream info only when episodeId, activeServerId, and servers are ready
  useEffect(() => {
    if (
      !episodeId ||
      !activeServerId ||
      !servers ||
      isServerFetchInProgress.current ||
      isStreamFetchInProgress.current
    )
      return;

    const fetchStreamInfo = async () => {
      isStreamFetchInProgress.current = true;
      setBuffering(true);
      try {
        const server = servers.find((srv) => srv.data_id === activeServerId);
        if (server) {
          const data = await getStreamInfo(
            animeId,
            episodeId,
            server.serverName.toLowerCase(),
            server.type.toLowerCase()
          );
          setStreamInfo(data);
          console.log(data);
          setStreamUrl(data?.streamingLink?.link?.file || null);
          setIntro(data?.streamingLink?.intro || null);
          setOutro(data?.streamingLink?.outro || null);
          const subtitles =
            data?.streamingLink?.tracks
              ?.filter((track) => track.kind === "captions")
              .map(({ file, label }) => ({ file, label })) || [];
          setSubtitles(subtitles);
          const thumbnailTrack = data?.streamingLink?.tracks?.find(
            (track) => track.kind === "thumbnails" && track.file
          );
          if (thumbnailTrack) setThumbnail(thumbnailTrack.file);
        } else {
          setError("No server found with the activeServerId.");
        }
      } catch (err) {
        console.error("Error fetching stream info:", err);
        setError(err.message || "An error occurred.");
      } finally {
        setBuffering(false);
        isStreamFetchInProgress.current = false;
      }
    };
    fetchStreamInfo();
  }, [episodeId, activeServerId, servers]);
  // const {
  //   // error,
  //   buffering,
  //   streamInfo,
  //   animeInfo,
  //   episodes,
  //   nextEpisodeSchedule,
  //   animeInfoLoading,
  //   totalEpisodes,
  //   isFullOverview,
  //   setIsFullOverview,
  //   activeEpisodeNum,
  //   streamUrl,
  //   subtitles,
  //   thumbnail,
  //   intro,
  //   outro,
  //   seasons,
  //   episodeId,
  //   setEpisodeId,
  //   activeServerId,
  //   setActiveServerId,
  //   servers,
  //   serverLoading,
  // } = useWatch(animeId, initialEpisodeId);
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
      const newUrl = `/watch/${animeId}?ep=${episodeId}${
        props.refer ? `&refer=${props.refer}` : `?refer=weebsSecret`
      }`;
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

  // Redirect if no episodes
  useEffect(() => {
    if (totalEpisodes !== null && totalEpisodes === 0) {
      router.push(
        `/${animeId}${
          props.refer ? `?refer=${props.refer}` : `?refer=weebsSecret`
        }`
      );
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

  let WatchedEpisodes = [];

  if (typeof window !== "undefined") {
    if (animeId && episodeId) {
      const key = `watched-${animeId}`; // Key in localStorage
      let episodes = [];

      try {
        const existing = localStorage.getItem(key);
        if (existing) {
          episodes = JSON.parse(existing);
          if (!Array.isArray(episodes)) {
            episodes = []; // Ensure fallback to array
          }
        }
      } catch (err) {
        console.error("Failed to parse existing episodes:", err);
      }

      if (!episodes.includes(animeId + "?ep=" + episodeId)) {
        episodes.push(animeId + "?ep=" + episodeId);
        localStorage.setItem(key, JSON.stringify(episodes));
      }

      WatchedEpisodes = episodes;
    }
  }

  return (
    <>
      <SessionProvider>
        <Navbar lang={lang} selectL={selectL} />
        <div className="w-full h-fit flex flex-col justify-center items-center relative mt-[70px]">
          <div className="w-full relative max-[1400px]:px-[30px] max-[1200px]:px-[80px] max-[1024px]:px-0 z-10">
            <img
              src={
                !animeInfoLoading
                  ? animeInfo?.poster
                  : "https://i.postimg.cc/rFZnx5tQ/2-Kn-Kzog-md.webp"
              }
              alt={`${animeInfo?.title} Poster`}
              className="absolute inset-0 w-full h-full object-cover filter grayscale z-[-900]"
            />
            <div className="absolute inset-0 bg-[#3a3948]/80 backdrop-blur-md z-[-800]"></div>
            <div className="layoutWrapper">
              {animeInfo && (
                <ul className="flex absolute left-4 top-[-40px] gap-x-2 items-center w-fit max-[1200px]:hidden">
                  {[
                    ["Home", "home"],
                    [animeInfo?.showType, animeInfo?.showType],
                  ].map(([text, link], index) => (
                    <li key={index} className="flex gap-x-3 items-center">
                      <Link
                        href={`/${link}${
                          props.refer
                            ? `?refer=${props.refer}`
                            : `?refer=weebsSecret`
                        }`}
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
                      animeId={animeId}
                      WatchedEpisodes={WatchedEpisodes}
                      onEpisodeClick={(id) => setEpisodeId(id)}
                      totalEpisodes={totalEpisodes}
                      selectL={selectL}
                    />
                  )}
                </div>
                <div className="player w-full h-fit bg-black flex flex-col">
                  <div className="w-full relative h-[480px] max-[1400px]:h-[40vw] max-[1200px]:h-[48vw] max-[1024px]:h-[58vw] max-[600px]:h-[65vw]">
                    {!buffering ? (
                      activeServerName.toLowerCase() === "hd-1" ||
                      activeServerName.toLowerCase() === "hd-4" ? (
                        <IframePlayer
                          animeId={animeId}
                          episodeId={episodeId}
                          servertype={activeServerType}
                          serverName={activeServerName}
                          animeInfo={animeInfo}
                          episodeNum={activeEpisodeNum}
                          episodes={episodes}
                          playNext={(id) => setEpisodeId(id)}
                          autoNext={autoNext}
                        />
                      ) : (
                        <Player
                          streamUrl={streamUrl}
                          subtitles={subtitles}
                          intro={intro}
                          animeId={animeId}
                          outro={outro}
                          serverName={activeServerName.toLowerCase()}
                          thumbnail={thumbnail}
                          autoSkipIntro={autoSkipIntro}
                          autoPlay={autoPlay}
                          autoNext={autoNext}
                          episodeId={episodeId}
                          episodes={episodes}
                          playNext={(id) =>
                            setEpisodeId(id) & setServerLoading(true)
                          }
                          animeInfo={animeInfo}
                          episodeNum={activeEpisodeNum}
                          streamInfo={streamInfo}
                          selectL={selectL}
                        />
                      )
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
                      selectL={selectL}
                    />
                  )}
                  <Servers
                    servers={servers}
                    activeEpisodeNum={activeEpisodeNum}
                    activeServerId={activeServerId}
                    animeId={animeId}
                    episodeId={episodeId}
                    WatchedEpisodes={WatchedEpisodes}
                    setActiveServerId={setActiveServerId}
                    setActiveServerType={setActiveServerType}
                    activeServerName={activeServerName}
                    setActiveServerName={setActiveServerName}
                    serverLoading={serverLoading}
                    selectL={selectL}
                  />
                  {seasons?.length > 0 && (
                    <div className="flex flex-col gap-y-2 bg-[#11101A] p-4">
                      <h1 className="w-fit text-lg max-[478px]:text-[18px] font-semibold">
                        Watch more seasons of this anime
                      </h1>
                      <div className="flex flex-wrap gap-4 max-[575px]:grid max-[575px]:grid-cols-3 max-[575px]:gap-3 max-[480px]:grid-cols-2">
                        {seasons.map((season, index) => (
                          <Link
                            href={`/${season.id.replace("/", "")}${
                              props.refer
                                ? `?refer=${props.refer}`
                                : `?refer=weebsSecret`
                            }`}
                            key={index}
                            className={`relative w-[20%] h-[60px] rounded-lg overflow-hidden cursor-pointer group ${
                              animeId === season.id.replace("/", "")
                                ? "border border-[#ffbade]"
                                : ""
                            } max-[1200px]:w-[140px] max-[575px]:w-full`}
                          >
                            <p
                              className={`text-[13px] text-center font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-2 z-30 line-clamp-2 group-hover:text-[#ffbade] ${
                                animeId === season.id.replace("/", "")
                                  ? "text-[#ffbade]"
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
                  {message && showNextEpisodeSchedule && (
                    <div className="p-4">
                      <div className="w-full px-4 rounded-md bg-[#0088CC] flex items-center justify-between gap-x-2">
                        <div className="w-full h-fit">
                          <span className="text-[18px]">🚀</span>
                          {" Estimated the next episode will come at "}
                          <span className="text-[13.4px] font-medium">
                            {message}
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
                    src={animeInfo?.poster}
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
                    href={`/${animeId}${
                      props.refer
                        ? `?refer=${props.refer}`
                        : `?refer=weebsSecret`
                    }`}
                    className="w-fit text-[13px] bg-white rounded-[12px] px-[10px] py-1 text-black"
                  >
                    View detail
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "10px 0",
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
          <div className="w-full">
            <Share
              ShareUrl={`https://shoko.fun/watch/${
                animeId + "?ep=" + episodeId
              }${props.refer ? `?refer=${props.refer}` : `?refer=weebsSecret`}`}
              arise="this Anime"
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "10px 0",
            }}
          >
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
          <div className="contentWrapper">
            <div className="mt-[15px] flex flex-col gap-y-7">
              {animeInfo?.charactersVoiceActors.length > 0 && (
                <>
                  <Voiceactor animeInfo={animeInfo} className="!mt-0" />
                </>
              )}

              {animeInfo?.recommended_data.length > 0 ? (
                <>
                  <CategoryCard
                    label="Recommended for you"
                    data={animeInfo?.recommended_data}
                    limit={animeInfo?.recommended_data.length}
                    showViewMore={false}
                    selectL={selectL}
                    refer={props.refer}
                    home={"1"}
                  />
                </>
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
                  selectL={selectL}
                  refer={props.refer}
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
                  selectL={selectL}
                  refer={props.refer}
                />
              )}
            </div>
          </div>
        </div>
        <Footer refer={props.refer} />
      </SessionProvider>
    </>
  );
}
