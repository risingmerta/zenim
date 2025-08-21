"use client";
// import getAnimeInfo from "@/utils/getAnimeInfo.utils";
import "./animeInfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faClosedCaptioning,
  faMicrophone,
  faChevronDown,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import CategoryCard from "@/component/categorycard/CategoryCard";
import Sidecard from "@/component/sidecard/Sidecard";
import Loader from "@/component/Loader/Loader";
import Error from "@/component/error/Error";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
// import { useHomeInfo } from "@/context/HomeInfoContext";
import Voiceactor from "@/component/voiceactor/Voiceactor";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Script from "next/script";
import Share from "../Share/Share";
import { useSession } from "next-auth/react";
import SignInSignUpModal from "../SignSignup/SignInSignUpModal";
import toast from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosAlert } from "react-icons/io";

const website_name = "Animoon";

function InfoItem({ label, value, isProducer = true, refer }) {
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
                    .replace(/-+/g, "-")}${
                    refer ? `?refer=${refer}` : `?refer=weebsSecret`
                  }`}
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
                .replace(/-+/g, "-")}${
                refer ? `?refer=${refer}` : `?refer=weebsSecret`
              }`}
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

// ✅ Custom Notification Component
function Notification({ message, type, onClose }) {
  const isSuccess = type === "success";

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2500); // auto hide after 2.5s
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.3 }}
        className={`fixed bottom-4 right-4 z-[9999] px-4 py-3 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2
          ${isSuccess ? "bg-[#00f2fe]/80" : "bg-red-500/80"} text-white`}
      >
        {isSuccess ? (
          <FaCheckCircle className="text-white text-lg" />
        ) : (
          <IoIosAlert className="text-white text-xl" />
        )}
        <span>{message}</span>
      </motion.div>
    </AnimatePresence>
  );
}

export default function InterInfo({
  random = false,
  idd,
  refer,
  infoData,
  homeData,
}) {
  const { data: session } = useSession();
  const [selectL, setSelectL] = useState("EN");
  const language = selectL;
  const id = random ? null : idd;
  const [isFull, setIsFull] = useState(false);
  const animeInfo = infoData?.data;
  const seasons = infoData?.seasons;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const homeInfo = homeData;
  const lang = (lang) => {
    setSelectL(lang);
  };

  const router = useRouter();
  useEffect(() => {
    if (id === "404-not-found-page") {
      console.log("404 got!");
      return null;
    }
  }, [id, random]);
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     if (animeInfo && location.pathname === `/${animeInfo.id}`) {
  //       document.title = `Watch ${animeInfo.title} English Sub/Dub online Free on ${website_name}`;
  //     }
  //     return () => {
  //       document.title = `${website_name} | Free anime streaming platform`;
  //     };
  //   }
  // }, [animeInfo]);

  if (loading) return <Loader type="animeInfo" />;
  if (error) {
    return <Error />;
  }
  if (!animeInfo) {
    router.push(
      `/404-not-found-page${refer ? `?refer=${refer}` : `?refer=weebsSecret`}`
    );
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

  let lastWatchedEpId = "";
  if (typeof window !== "undefined") {
    lastWatchedEpId = localStorage.getItem(id + "-last")
      ? localStorage.getItem(id + "-last")
      : "";
  }

  const [showSignInModal, setShowSignInModal] = useState(false);

  const statusOptions = [
    "Watching",
    "On-Hold",
    "Plan to Watch",
    "Dropped",
    "Completed",
  ];

  const [dropdownOpen, setDropdownOpen] = useState(false);
  // ✅ Notification state
  const [notification, setNotification] = useState(null);
  const dropdownRef = useRef(null);

  const [logIsOpen, setLogIsOpen] = useState(false);
  const sign = (sign) => {
    setLogIsOpen(sign);
  };

  const handleSelect = async (status) => {
    if (!session) {
      setLogIsOpen(true);
      return;
    }

    setDropdownOpen(false);

    try {
      const res = await fetch("/api/user-anime-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          animeId: animeInfo.id,
          title: animeInfo.title || animeInfo.japanese_title,
          poster: animeInfo.poster || "",
          status,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setNotification({
          message: data.message || "Failed to save.",
          type: "error",
        });
      } else {
        setNotification({ message: `Added to "${status}"`, type: "success" });
      }
    } catch (error) {
      setNotification({ message: "Something went wrong.", type: "error" });
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <Navbar lang={lang} selectL={selectL} refer={refer} />
      {logIsOpen ? (
        <div>
          <SignInSignUpModal
            logIsOpen={logIsOpen}
            setLogIsOpen={setLogIsOpen}
            sign={sign}
            refer={refer}
          />
        </div>
      ) : (
        ""
      )}

      {/* ✅ Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="infoContainer">
        <img
          src={poster}
          alt={`${title} Poster`}
          className="backgroundPoster"
        />

        <div className="animeInfoBox">
          <div className="relative w-[180px] h-[270px] max-[575px]:w-[140px] max-[575px]:h-[200px] flex-shrink-0">
            <img
              src={poster}
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
                    href={`/${link}${
                      refer ? `?refer=${refer}` : `?refer=weebsSecret`
                    }`}
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
            <div className="flex gap-x-4 mt-5">
              {animeInfo?.animeInfo?.Status?.toLowerCase() !==
              "not-yet-aired" ? (
                <Link
                  href={
                    lastWatchedEpId
                      ? `/watch/${animeInfo.id + "?ep=" + lastWatchedEpId}${
                          refer ? `&refer=${refer}` : `&refer=weebsSecret`
                        }`
                      : `/watch/${animeInfo.id}${
                          refer ? `?refer=${refer}` : `?refer=weebsSecret`
                        }`
                  }
                  className="flex gap-x-2 px-6 max-[429px]:px-3 py-2 bg-[#00f2fe] w-fit text-black items-center rounded-3xl"
                >
                  <FontAwesomeIcon
                    icon={faPlay}
                    className="text-[14px] mt-[1px]"
                  />
                  <p className="text-lg max-[429px]:text-[15px] font-medium">
                    Watch Now
                  </p>
                </Link>
              ) : (
                <Link
                  href={`/${animeInfo.id}${
                    refer ? `?refer=${refer}` : `?refer=weebsSecret`
                  }`}
                  className="flex gap-x-2 px-6 max-[429px]:px-3 py-2 bg-[#00f2fe] w-fit text-black items-center rounded-3xl"
                >
                  <p className="text-lg max-[429px]:text-[15px] font-medium">
                    Not released
                  </p>
                </Link>
              )}

              {animeInfo?.animeInfo?.Status?.toLowerCase() ===
              "not-yet-aired" ? (
                <Link
                  href={`/${animeInfo.id}${
                    refer ? `?refer=${refer}` : `?refer=weebsSecret`
                  }`}
                  className="flex gap-x-2 px-6 max-[429px]:px-3 py-2 bg-[#00f2fe] w-fit text-black items-center rounded-3xl"
                >
                  <p className="text-lg max-[429px]:text-[15px] font-medium">
                    Notify Me
                  </p>
                </Link>
              ) : (
                <div className="relative w-fit" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className="flex gap-x-2 px-6 max-[429px]:px-3 py-2 bg-[#fff] text-black items-center rounded-3xl"
                  >
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="text-[14px] mt-[1px]"
                    />
                    <p className="text-lg max-[429px]:text-[15px] font-medium">
                      Add to List
                    </p>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute top-full mt-2 w-full bg-white shadow-lg rounded-lg z-50 overflow-hidden border border-gray-200">
                      {statusOptions.map((status) => (
                        <button
                          key={status}
                          onClick={() => handleSelect(status)}
                          className="block w-full px-4 py-2 text-left text-black hover:bg-[#00f2fe]/20 hover:text-black transition duration-150 ease-in-out"
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

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
            <Share
              ShareUrl={`https://shoko.fun/${animeInfo.id}${
                refer ? `?refer=${refer}` : `?refer=weebsSecret`
              }`}
              arise="this Anime"
            />
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
                refer={refer}
              />
            ))}
            {info?.Genres && (
              <div className="flex gap-x-2 py-2 custom-xl:border-t custom-xl:border-b custom-xl:border-white/20 max-[1200px]:border-none">
                <p>Genres:</p>
                <div className="flex flex-wrap gap-2">
                  {info.Genres.map((genre, index) => (
                    <Link
                      href={`/genre/${genre.split(" ").join("-")}${
                        refer ? `?refer=${refer}` : `?refer=weebsSecret`
                      }`}
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
              <InfoItem key={index} label={label} value={value} refer={refer} />
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
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "70px",
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
      <div className="mainLayoutGrid">
        <div>
          {seasons?.length > 0 && (
            <>
              <div className="flex flex-col gap-y-7 mt-8">
                <h1 className="w-fit text-2xl text-[#00f2fe] max-[478px]:text-[18px] font-bold">
                  More Seasons
                </h1>
                <div className="flex flex-wrap gap-4 max-[575px]:grid max-[575px]:grid-cols-3 max-[575px]:gap-3 max-[480px]:grid-cols-2">
                  {seasons.map((season, index) => (
                    <Link
                      href={`/${season.id.replace("/", "")}${
                        refer ? `?refer=${refer}` : `?refer=weebsSecret`
                      }`}
                      key={index}
                      className={`relative w-[20%] h-[60px] rounded-lg overflow-hidden cursor-pointer group ${
                        id === season.id.replace("/", "")
                          ? "border border-[#00f2fe]"
                          : ""
                      } max-[1200px]:w-[140px] max-[575px]:w-full`}
                    >
                      <p
                        className={`text-[13px] text-center font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-2 z-30 line-clamp-2 group-hover:text-[#00f2fe] ${
                          id === season.id.replace("/", "")
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
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "70px",
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
            </>
          )}

          {animeInfo?.charactersVoiceActors.length > 0 && (
            <>
              <Voiceactor animeInfo={animeInfo} />
            </>
          )}

          {animeInfo.recommended_data.length > 0 && (
            <>
              <CategoryCard
                label="Recommended for you"
                data={animeInfo.recommended_data}
                limit={animeInfo.recommended_data.length}
                showViewMore={false}
                className={"mt-8"}
                selectL={selectL}
                refer={refer}
                home={"1"}
              />
            </>
          )}
        </div>
        <div>
          {animeInfo.related_data.length > 0 && (
            <Sidecard
              label="Related Anime"
              data={animeInfo.related_data}
              className="mt-8"
              selectL={selectL}
              refer={refer}
            />
          )}
          {homeInfo && homeInfo.most_popular && (
            <Sidecard
              label="Most Popular"
              data={homeInfo.most_popular.slice(0, 10)}
              className="mt-[40px]"
              limit={10}
              selectL={selectL}
              refer={refer}
            />
          )}
        </div>
      </div>
      <Footer refer={refer} />
    </>
  );
}
