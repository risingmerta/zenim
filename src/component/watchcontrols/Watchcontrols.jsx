"use client";
import {
  faBackward,
  faForward,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import SignInSignUpModal from "../SignSignup/SignInSignUpModal";
import { useSession } from "next-auth/react";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosAlert } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import "./watchControl.css";

const ToggleButton = ({ label, isActive, onClick }) => (
  <button className="flex gap-x-2" onClick={onClick}>
    <h1 className="capitalize text-[13px]">{label}</h1>
    <span
      className={`capitalize text-[13px] ${
        isActive ? "text-[#00f2fe]" : "text-red-500"
      }`}
    >
      {isActive ? "on" : "off"}
    </span>
  </button>
);

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

function WatchControlsContent({
  autoPlay,
  setAutoPlay,
  autoSkipIntro,
  setAutoSkipIntro,
  autoNext,
  setAutoNext,
  episodeId,
  animeInfo,
  episodes = [],
  onButtonClick,
}) {
  const { data: session } = useSession();
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(
    episodes?.findIndex(
      (episode) => episode.id.match(/ep=(\d+)/)?.[1] === episodeId
    )
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [logIsOpen, setLogIsOpen] = useState(false);

  const statusOptions = [
    "Watching",
    "On-Hold",
    "Plan to Watch",
    "Dropped",
    "Completed",
  ];

  // ✅ Notification state
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (episodes?.length > 0) {
      const newIndex = episodes.findIndex(
        (episode) => episode.id.match(/ep=(\d+)/)?.[1] === episodeId
      );
      setCurrentEpisodeIndex(newIndex);
    }
  }, [episodeId, episodes]);

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
      {logIsOpen && (
        <SignInSignUpModal
          logIsOpen={logIsOpen}
          setLogIsOpen={setLogIsOpen}
          sign={setLogIsOpen}
        />
      )}

      {/* ✅ Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="bg-[#11101A] w-full flex justify-between flex-wrap px-4 pt-4 max-[1200px]:bg-[#14151A] max-[375px]:flex-col max-[375px]:gap-y-2">
        <div className="flex gap-x-4 flex-wrap">
          <ToggleButton
            label="auto play"
            isActive={autoPlay}
            onClick={() => setAutoPlay((prev) => !prev)}
          />
          <ToggleButton
            label="auto skip intro"
            isActive={autoSkipIntro}
            onClick={() => setAutoSkipIntro((prev) => !prev)}
          />
          <ToggleButton
            label="auto next"
            isActive={autoNext}
            onClick={() => setAutoNext((prev) => !prev)}
          />
        </div>

        <div className="flex gap-x-6 max-[575px]:gap-x-4 max-[375px]:justify-end">
          <button
            onClick={() => {
              if (currentEpisodeIndex > 0) {
                onButtonClick(
                  episodes[currentEpisodeIndex - 1].id.match(/ep=(\d+)/)?.[1]
                );
              }
            }}
            disabled={currentEpisodeIndex <= 0}
          >
            <FontAwesomeIcon
              icon={faBackward}
              className="text-[20px] max-[575px]:text-[16px] text-white"
            />
          </button>

          <button
            onClick={() => {
              if (currentEpisodeIndex < episodes?.length - 1) {
                onButtonClick(
                  episodes[currentEpisodeIndex + 1].id.match(/ep=(\d+)/)?.[1]
                );
              }
            }}
            disabled={currentEpisodeIndex >= episodes?.length - 1}
          >
            <FontAwesomeIcon
              icon={faForward}
              className="text-[20px] max-[575px]:text-[16px] text-white"
            />
          </button>

          <div className="relative w-fit" ref={dropdownRef}>
            <button
              className="plus-button"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              <FontAwesomeIcon
                icon={faPlus}
                className="text-[20px] max-[575px]:text-[16px] text-white"
              />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-max max-w-[calc(100vw-16px)] bg-white shadow-lg rounded-lg z-50 border border-gray-200 overflow-x-auto">
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
    </>
  );
}

export default function WatchControls(props) {
  return <WatchControlsContent {...props} />;
}
