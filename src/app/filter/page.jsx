import Search from "@/component/search/Search";
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
        onSear=""
        keyword={searchParam.keyword || ""}
        collectionName={`Search results for`}
        refer={searchParam.refer}
      />
      {refer && <Advertize refer={refer} />}
    </div>
  );
}
