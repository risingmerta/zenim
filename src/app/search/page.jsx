import Advertize from "@/component/Advertize/Advertize";
import Search from "@/component/search/Search";
import Script from "next/script";
import React from "react";

export default async function page({ searchParams }) {
  const searchParam = await searchParams;
  const refer = searchParam?.refer;
  return (
    <div>
      <Search
        type={searchParam.type || ""}
        status={searchParam.status || ""}
        rated={searchParam.rated || ""}
        score={searchParam.score || ""}
        season={searchParam.season || ""}
        language={searchParam.language || ""}
        sy={searchParam.sy || ""}
        sm={searchParam.sm || ""}
        sd={searchParam.sd || ""}
        ey={searchParam.ey || ""}
        em={searchParam.em || ""}
        ed={searchParam.ed || ""}
        sort={searchParam.sort || ""}
        genres={searchParam.genres || ""}
        page={searchParam.page}
        onSear={"yes"}
        keyword={searchParam.keyword || ""}
        collectionName={`Search results for`}
        refer={searchParam.refer}
      />
      <Advertize refer={""} />
      {/* <Script
        src="//abackdamstubborn.com/b7/2f/b2/b72fb2e5a32c00a413ee2bb7ea85b317.js"
        strategy="afterInteractive"
        // "afterInteractive" means load script after page hydration
      /> */}
    </div>
  );
}
