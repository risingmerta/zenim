"use client";
import React, { useState } from "react";
import { FaComments, FaRandom } from "react-icons/fa";
import { PiBroadcastFill } from "react-icons/pi";
import { BsBroadcast } from "react-icons/bs";
import "./NavCss/action.css";
import Link from "next/link";
// import { useLanguage } from "@/context/LanguageContext";

const Action = (props) => {
  // const { language, toggleLanguage } = useLanguage();
  const selectedLang = props.selectL || "EN";

  const toggle = () => {
    if (selectedLang === "EN") {
      // setSelectedLang("JP");
      // toggleLanguage("JP");
      props.lang("JP");
    }
    if (selectedLang === "JP") {
      // setSelectedLang("EN");
      // toggleLanguage("EN");
      props.lang("EN");
    }
  };
  return (
    <div className={`action-comb ${props.isInSidebar ? "action-new-c" : ""}`}>
      <Link
        href={`/watch2gether${props.refer ? `?refer=${props.refer}` : `?refer=weebhideout`}`}
        className={`action-bloc ${props.isInSidebar ? "action-bS" : ""}`}
      >
        <div className={`action-ico ${props.isInSidebar ? "action-iS" : ""}`}>
          <PiBroadcastFill />
        </div>
        <div>Watch2gether</div>
      </Link>

      <div className={`action-bloc ${props.isInSidebar ? "action-bS" : ""}`}>
        <div className={`action-ico ${props.isInSidebar ? "action-iS" : ""}`}>
          <FaRandom />
        </div>
        <div>Random</div>
      </div>

      <div
        className={`action-bloc ${
          props.isInSidebar ? "action-bS" : ""
        } special-C`}
      >
        <div className={`action-ico ${props.isInSidebar ? "action-iS" : ""}`}>
          <button
            className={`engJ ${selectedLang === "EN" ? "selEJ" : ""}`}
            onClick={() => toggle()}
          >
            EN
          </button>
          <button
            className={`JpE ${selectedLang === "JP" ? "selEJ" : ""}`}
            onClick={() => toggle()}
          >
            JP
          </button>
        </div>
        <div>Anime Name</div>
      </div>

      {!props.isInSidebar && (
        <div className="action-bloc">
          <div className="action-ico">
            <FaComments />
          </div>
          <div>Community</div>
        </div>
      )}
    </div>
  );
};

export default Action;
