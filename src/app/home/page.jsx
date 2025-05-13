import Advertize from "@/component/Advertize/Advertize";
import Home from "@/component/Home/Home";
import React from "react";

export default async function page({ searchParams }) {
  const seacrhParam = await searchParams;
  const refer = seacrhParam?.refer;
  return (
    <div>
      <Home refer={refer} />
      {refer && <Advertize refer={refer} />}
    </div>
  );
}
