"use client";
import React from "react";
import InterInfo from "./InterInfo";
import { SessionProvider } from "next-auth/react";

const AnimeInfo = ({ random = false, idd, refer, infoData, homeData }) => {
  return (
    <div>
      <SessionProvider>
        <InterInfo
          idd={idd}
          refer={refer}
          infoData={infoData}
          homeData={homeData}
        />
      </SessionProvider>
    </div>
  );
};

export default AnimeInfo;
