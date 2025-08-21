"use client";
import React, { useEffect, useState } from "react";
import { FaComments, FaRandom } from "react-icons/fa";
import { PiBroadcastFill } from "react-icons/pi";
import Link from "next/link";
import "./NavCss/action.css";

const Action = (props) => {
  const selectedLang = props.selectL || "EN";
  const [randomId, setRandomId] = useState(null);

  const toggle = () => {
    if (selectedLang === "EN") {
      props.lang("JP");
    } else if (selectedLang === "JP") {
      props.lang("EN");
    }
  };

  // fetch random id on mount
  useEffect(() => {
    const fetchRandom = async () => {
      try {
        const res = await fetch("/api/random-anime");
        const data = await res.json();
        if (data?.id) {
          setRandomId(data.id);
        }
      } catch (err) {
        console.error("Error fetching random anime:", err);
      }
    };
    fetchRandom();
  }, []);

  return (
    <div className={`action-comb ${props.isInSidebar ? "action-new-c" : ""}`}>
      <Link
        href={`/watch2gether${
          props.refer ? `?refer=${props.refer}` : `?refer=weebsSecret`
        }`}
        className={`action-bloc ${props.isInSidebar ? "action-bS" : ""}`}
      >
        <div className={`action-ico ${props.isInSidebar ? "action-iS" : ""}`}>
          <PiBroadcastFill />
        </div>
        <div>Watch2gether</div>
      </Link>

      {/* Random Link */}
      <Link
        href={randomId ? `/${randomId}` : "#"}
        className={`action-bloc ${props.isInSidebar ? "action-bS" : ""}`}
      >
        <div className={`action-ico ${props.isInSidebar ? "action-iS" : ""}`}>
          <FaRandom />
        </div>
        <div>Random</div>
      </Link>

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
