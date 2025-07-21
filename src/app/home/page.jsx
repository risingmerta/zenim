import Advertize from "@/component/Advertize/Advertize";
import Home from "@/component/Home/Home";
import React from "react";

export default function Page({ searchParams }) {
  const refer = searchParams?.refer || "";

  return (
    <div>
      <Home refer={refer} />
      <Advertize refer="" />
      {/* <BottomLeftAd /> */}
    </div>
  );
}
