"use client";
import React, { useState } from "react";
import { FaChevronLeft, FaComments } from "react-icons/fa";
import Link from "next/link";
import "./nav-sidebar.css";
import Actions from "../Navbar/Action";
export default function NavSidebar(props) {
  return (
    <div
      className="navigation-sidebar f-poppins"
      style={{ zIndex: props.sidebarIsOpen ? 100 : -1 }}
      onClick={() => props.setSidebarIsOpen(false)}
    >
      <div
        className="navigation-list d-flex"
        style={{
          transform: props.sidebarIsOpen
            ? "translateX(280px)"
            : "translateX(-280px)",
        }}
      >
        <div className="button-group d-flex-fd-column">
          <div
            className="d-flex a-center j-center close-menu"
            style={{ width: "60%" }}
            onClick={() => props.setSidebarIsOpen()}
          >
            <FaChevronLeft size={12} />
            Close Menu
          </div>
          <div className="action-grop">
            <Actions isInSidebar={true} data={props.data} lang={props.lang} refer={props.refer} selectL={props.selectL}/>
          </div>

          <a href="/" className="d-flex a-center j-center">
            <FaComments size={14} />
            Community
          </a>
        </div>

        <div className="navigation-link-list">
          <ul>
            <li>
              <Link href={`/${props.refer ? `?refer=${props.refer}` : ''}`}>Home</Link>
            </li>
            <li>
              <Link href={`/most-popular${props.refer ? `?refer=${props.refer}` : ''}`}>
                Most Popular
              </Link>
            </li>
            <li>
              <Link href={`/movie${props.refer ? `?refer=${props.refer}` : ''}`}>Movies</Link>
            </li>
            <li>
              <Link href={`/tv${props.refer ? `?refer=${props.refer}` : ''}`}>TV Series</Link>
            </li>
            <li>
              <Link href={`/ova${props.refer ? `?refer=${props.refer}` : ''}`}>OVAs</Link>
            </li>
            <li>
              <Link href={`/ona${props.refer ? `?refer=${props.refer}` : ''}`}>ONAs</Link>
            </li>
            <li>
              <Link href={`/special${props.refer ? `?refer=${props.refer}` : ''}`}>Specials</Link>
              <Link href={`/completed${props.refer ? `?refer=${props.refer}` : ''}`}>
                Completed
              </Link>
              <Link href={`/dubbed-anime${props.refer ? `?refer=${props.refer}` : ''}`}>
                Dubbed Anime
              </Link>
              <Link href={`/subbed-anime${props.refer ? `?refer=${props.refer}` : ''}`}>
                Subbed Anime
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
