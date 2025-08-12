"use client";
import {
  faBackward,
  faForward,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import SignInSignUpModal from "../SignSignup/SignInSignUpModal";
import { useSession } from "next-auth/react";
import "./watchControl.css";
import WatchlistLinkModal from "../WatchlistLinkModal/WatchlistLinkModal";

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

function IntroModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full relative">
        <h2 className="text-lg font-bold mb-2">🎉 New Feature: Watchlist</h2>
        <p className="text-sm text-gray-700 mb-4">
          You can now <strong>save anime</strong> to your personalized watchlist!
          Just click the <strong>'+'</strong> icon to add the current anime.
        </p>
        <button
          onClick={onClose}
          className="bg-[#00f2fe] hover:bg-[#00d8e6] text-black px-4 py-2 rounded font-semibold w-full cursor-pointer"
        >
          Got it!
        </button>
      </div>
    </div>
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

  const [showWatchlistModal, setShowWatchlistModal] = useState(false);
  const [showIntroModal, setShowIntroModal] = useState(false);

  useEffect(() => {
    if (episodes?.length > 0) {
      const newIndex = episodes.findIndex(
        (episode) => episode.id.match(/ep=(\d+)/)?.[1] === episodeId
      );
      setCurrentEpisodeIndex(newIndex);
    }
  }, [episodeId, episodes]);

  useEffect(() => {
    if (!localStorage.getItem("watchControlsIntroSeen")) {
      setShowIntroModal(true);
    }
  }, []);

  const handleIntroClose = () => {
    localStorage.setItem("watchControlsIntroSeen", "true");
    setShowIntroModal(false);
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
        toast.error(data.message || "Failed to add anime to your list");
      } else {
        toast.success(`Added to "${status}"`);
        setShowWatchlistModal(true);
      }
    } catch (error) {
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
      {logIsOpen && (
        <SignInSignUpModal
          logIsOpen={logIsOpen}
          setLogIsOpen={setLogIsOpen}
          sign={setLogIsOpen}
        />
      )}
      {showWatchlistModal && (
        <WatchlistLinkModal
          isOpen={showWatchlistModal}
          setIsOpen={setShowWatchlistModal}
        />
      )}
      {showIntroModal && <IntroModal onClose={handleIntroClose} />}

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
