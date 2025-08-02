import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClosedCaptioning,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
// import { useLanguage } from "@/context/LanguageContext";
// import { Link, useNavigate } from "react-router-dom";
import useToolTipPosition from "@/hooks/useToolTipPosition";
import Qtip from "../qtip/Qtip";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Topten({ data, className, selectL, refer }) {
  const language = selectL;
  const [activePeriod, setActivePeriod] = useState("today");
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [isTooltipHovered, setIsTooltipHovered] = useState(false); // ✅ Added
  const router = useRouter();

  const handlePeriodChange = (period) => {
    setActivePeriod(period);
  };

  const handleNavigate = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const currentData =
    activePeriod === "today"
      ? data?.today
      : activePeriod === "week"
      ? data?.week
      : data?.month;

  const { tooltipPosition, tooltipHorizontalPosition, cardRefs } =
    useToolTipPosition(hoveredItem, currentData);

  const handleMouseEnter = (item, index) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setHoveredItem(item.id + index);
  };

  const handleMouseLeave = () => {
    setHoverTimeout(
      setTimeout(() => {
        if (!isTooltipHovered) { // ✅ Prevent hiding if tooltip is hovered
          setHoveredItem(null);
        }
      }, 300) // Small delay to prevent flickering
    );
  };

  const handleNavigation = (id) => {
    let lastWatchedEpId = "";
    if (typeof window !== "undefined") {
      lastWatchedEpId = localStorage.getItem(id + "-last")
        ? localStorage.getItem(id + "-last")
        : "";
    }
    router.push(
      lastWatchedEpId
        ? `/watch/${id + "?ep=" + lastWatchedEpId}${`&refer=weebsSecret`}`
        : `/watch/${id}${`?refer=weebsSecret`}`
    );
  };

  return (
    <div className={`flex flex-col space-y-6 ${className}`}>
      <div className="flex justify-between items-center max-[350px]:flex-col max-[350px]:gap-y-2 max-[350px]:items-start">
        <h1 className="font-bold text-2xl text-[#00f2fe]">Top 10</h1>
        <ul className="flex justify-between w-fit bg-[#373646] rounded-[4px] text-sm font-bold">
          {["today", "week", "month"].map((period) => (
            <li
              key={period}
              className={`cursor-pointer p-2 px-3 ${
                activePeriod === period
                  ? "bg-[#00f2fe] text-[#555462]"
                  : "text-white hover:text-[#00f2fe]"
              } ${period === "today" ? "rounded-l-[4px]" : ""} ${
                period === "month" ? "rounded-r-[4px]" : ""
              }`}
              onClick={() => handlePeriodChange(period)}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col space-y-4 bg-[#2B2A3C] p-4 pt-8">
        {currentData &&
          currentData.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-x-4"
              ref={(el) => (cardRefs.current[index] = el)}
            >
              <h1
                className={`font-bold text-2xl ${
                  index < 3
                    ? "pb-1 text-white border-b-[3px] border-[#00f2fe]"
                    : "text-[#777682]"
                } max-[350px]:hidden`}
              >
                {`${index + 1 < 10 ? "0" : ""}${index + 1}`}
              </h1>
              <div
                style={{
                  borderBottom:
                    index + 1 < 10
                      ? "1px solid rgba(255, 255, 255, .075)"
                      : "none",
                }}
                className="flex pb-4 relative container items-center"
              >
                {/* Image with tooltip behavior */}
                <img
                  src={item.poster}
                  alt={item.title}
                  className="w-[60px] h-[75px] rounded-md object-cover flex-shrink-0 cursor-pointer"
                  onClick={() => handleNavigation(item.id)}
                  onMouseEnter={() => handleMouseEnter(item, index)}
                  onMouseLeave={handleMouseLeave}
                />

                {/* Tooltip positioned near image */}
                {typeof window !== "undefined" &&
                  hoveredItem === item.id + index &&
                  window.innerWidth > 1024 && (
                    <div
                      className={`absolute ${tooltipPosition} ${tooltipHorizontalPosition} 
                      ${
                        tooltipPosition === "top-1/2"
                          ? "translate-y-[50px]"
                          : "translate-y-[-50px]"
                      } 
                      z-[100000] transform transition-all duration-300 ease-in-out 
                      ${
                        hoveredItem === item.id + index
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-2"
                      }`}
                      onMouseEnter={() => {
                        if (hoverTimeout) clearTimeout(hoverTimeout);
                        setIsTooltipHovered(true); // ✅ Keep tooltip visible
                      }}
                      onMouseLeave={() => {
                        setIsTooltipHovered(false); // ✅ Allow hiding when leaving tooltip
                        handleMouseLeave();
                      }}
                    >
                      <Qtip id={item.id} refer={refer} />
                    </div>
                  )}

                <div className="flex flex-col ml-4 space-y-2">
                  <Link
                    href={`/${item.id}${
                      refer ? `?refer=${refer}` : `?refer=weebsSecret`
                    }`}
                    className="text-[1em] font-[500] hover:cursor-pointer hover:text-[#00f2fe] transform transition-all ease-out line-clamp-1 max-[478px]:line-clamp-2 max-[478px]:text-[14px]"
                    onClick={() => handleNavigate(item.id)}
                  >
                    {language === "EN" ? item.title : item.japanese_title}
                  </Link>
                  <div className="flex flex-wrap items-center w-fit space-x-1 max-[350px]:gap-y-[3px]">
                    {item.tvInfo?.sub && (
                      <div className="flex space-x-1 justify-center items-center bg-[#B0E3AF] rounded-[4px] px-[4px] text-black py-[2px]">
                        <FontAwesomeIcon
                          icon={faClosedCaptioning}
                          className="text-[12px]"
                        />
                        <p className="text-[12px] font-bold">
                          {item.tvInfo.sub}
                        </p>
                      </div>
                    )}
                    {item.tvInfo?.dub && (
                      <div className="flex space-x-1 justify-center items-center bg-[#B9E7FF] rounded-[4px] px-[8px] text-black py-[2px]">
                        <FontAwesomeIcon
                          icon={faMicrophone}
                          className="text-[12px]"
                        />
                        <p className="text-[12px] font-bold">
                          {item.tvInfo.dub}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default React.memo(Topten);
