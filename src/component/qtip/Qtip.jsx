import BouncingLoader from "../ui/bouncingloader/Bouncingloader";
// import getQtip from "@/utils/getQtip.utils";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faStar,
  faClosedCaptioning,
  faMicrophone,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import SignInSignUpModal from "../SignSignup/SignInSignUpModal";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
// import { Link } from "react-router-dom";

function Qtip({ id, refer }) {
  const { data: session } = useSession();
  const [qtip, setQtip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQtipInfo = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/qtip/${id}`);
        const data = await res.json();
        setQtip(data);
      } catch (err) {
        console.error("Error fetching anime info:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQtipInfo();
  }, [id]);

  const getWatchHref = (watchLink, refer) => {
    let lastWatchedEpId = "";

    if (typeof window !== "undefined") {
      const id = watchLink?.split("/watch/")[1];
      if (id) {
        lastWatchedEpId = localStorage.getItem(`${id}-last`) || "";
      }
    }

    let href = watchLink;

    if (lastWatchedEpId) {
      href += `?ep=${lastWatchedEpId}${`&refer=weebsSecret`}`;
      // if (refer) href += `&refer=${refer}`;
    } else if (refer) {
      href += `?refer=${refer}`;
    } else if (!refer) {
      href += `?refer=weebsSecret`;
    }

    return href;
  };

  const statusOptions = [
    "Watching",
    "On-Hold",
    "Plan to Watch",
    "Dropped",
    "Completed",
  ];

  const [dropdownOpen, setDropdownOpen] = useState(false);
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

    const animeId = qtip?.watchLink?.split("/watch/")[1];

    try {
      const res = await fetch("/api/user-anime-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          animeId, // extracted part from qtip.watchLink
          title: qtip.title,
          poster: "",
          status,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Error:", data.message);
        toast.error(data.message || "Failed to add anime to your list");
      } else {
        toast.success(`Added to "${status}"`);
      }
    } catch (error) {
      console.error("Failed to save:", error);
      toast.error("Something went wrong while saving.");
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
      {" "}
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
      <div className="w-[320px] h-fit rounded-xl p-4 flex justify-center items-center bg-[#3e3c50] bg-opacity-70 backdrop-blur-[10px] z-50">
        {loading || error || !qtip ? (
          <BouncingLoader />
        ) : (
          <div className="w-full flex flex-col justify-start gap-y-2">
            <h1 className="text-xl font-semibold text-white text-[13px] leading-6">
              {qtip.title}
            </h1>
            <div className="w-full flex items-center relative mt-2">
              {qtip?.rating && (
                <div className="flex gap-x-2 items-center">
                  <FontAwesomeIcon icon={faStar} className="text-[#ffc107]" />
                  <p className="text-[#b7b7b8]">{qtip.rating}</p>
                </div>
              )}
              <div className="flex ml-4 gap-x-[1px] overflow-hidden rounded-md items-center h-fit">
                {qtip?.quality && (
                  <div className="bg-[#00f2fe] px-[7px] w-fit flex justify-center items-center py-[1px] text-black">
                    <p className="text-[12px] font-semibold">{qtip.quality}</p>
                  </div>
                )}
                <div className="flex gap-x-[1px] w-fit items-center py-[1px]">
                  {qtip?.subCount && (
                    <div className="flex gap-x-1 justify-center items-center bg-[#B0E3AF] px-[7px] text-black">
                      <FontAwesomeIcon
                        icon={faClosedCaptioning}
                        className="text-[13px]"
                      />
                      <p className="text-[13px] font-semibold">
                        {qtip.subCount}
                      </p>
                    </div>
                  )}
                  {qtip?.dubCount && (
                    <div className="flex gap-x-1 justify-center items-center bg-[#B9E7FF] px-[7px] text-black">
                      <FontAwesomeIcon
                        icon={faMicrophone}
                        className="text-[13px]"
                      />
                      <p className="text-[13px] font-semibold">
                        {qtip.dubCount}
                      </p>
                    </div>
                  )}
                  {qtip?.episodeCount && (
                    <div className="flex gap-x-1 justify-center items-center bg-[#a199a3] px-[7px] text-black">
                      <p className="text-[13px] font-semibold">
                        {qtip.episodeCount}
                      </p>
                    </div>
                  )}
                </div>
                {qtip?.type && (
                  <div className="absolute right-0 top-0 justify-center items-center rounded-sm bg-[#00f2fe] px-[6px] text-black">
                    <p className="font-semibold text-[13px]">{qtip.type}</p>
                  </div>
                )}
              </div>
            </div>
            {qtip?.description && (
              <p className="text-[#d7d7d8] text-[13px] leading-4 font-light line-clamp-3 mt-1">
                {qtip.description}
              </p>
            )}
            <div className="flex flex-col mt-1">
              {qtip?.japaneseTitle && (
                <div className="leading-4">
                  <span className="text-[#b7b7b8] text-[13px]">
                    Japanese:&nbsp;
                  </span>
                  <span className="text-[13px]">{qtip.japaneseTitle}</span>
                </div>
              )}
              {qtip?.Synonyms && (
                <div className="leading-4">
                  <span className="text-[#b7b7b8] text-[13px]">
                    Synonyms:&nbsp;
                  </span>
                  <span className="text-[13px]">{qtip.Synonyms}</span>
                </div>
              )}
              {qtip?.airedDate && (
                <div className="leading-4">
                  <span className="text-[#b7b7b8] text-[13px]">
                    Aired:&nbsp;
                  </span>
                  <span className="text-[13px]">{qtip.airedDate}</span>
                </div>
              )}
              {qtip?.status && (
                <div className="leading-4">
                  <span className="text-[#b7b7b8] text-[13px]">
                    Status:&nbsp;
                  </span>
                  <span className="text-[13px]">{qtip.status}</span>
                </div>
              )}
              {qtip?.genres && (
                <div className="leading-4 flex flex-wrap text-wrap">
                  <span className="text-[#b7b7b8] text-[13px]">
                    Genres:&nbsp;
                  </span>
                  {qtip.genres.map((genre, index) => (
                    <Link
                      href={`/genre/${genre}${
                        refer ? `?refer=${refer}` : `?refer=weebsSecret`
                      }`}
                      key={index}
                      className="text-[13px] hover:text-[#00f2fe]"
                    >
                      <span>
                        {genre}
                        {index === qtip.genres.length - 1 ? "" : ","}&nbsp;
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-[10px] mt-4">
              <Link
                href={getWatchHref(qtip?.watchLink, refer)}
                className="w-[80%] flex justify-center items-center gap-x-2 bg-[#00f2fe] py-[9px] rounded-3xl"
              >
                <FontAwesomeIcon
                  icon={faPlay}
                  className="text-[14px] text-black"
                />
                <p className="text-[14px] font-semibold text-black">
                  Watch Now
                </p>
              </Link>

              <div className="relative w-fit" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center justify-center bg-white text-black rounded-full p-[9px]"
                >
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="text-[20px] max-[575px]:text-[16px]"
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute bottom-full right-0 mb-2 w-max max-w-[calc(100vw-16px)] bg-white shadow-lg rounded-lg z-50 border border-gray-200 overflow-x-auto">
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
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Qtip;
