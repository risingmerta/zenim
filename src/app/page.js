import Advertize from "@/component/Advertize/Advertize";
import SplashScreen from "@/component/splashscreen/SplashScreen";
import Script from "next/script";
import React from "react";

const page = () => {
  return (
    <div>
      <SplashScreen />
      <Advertize/>
    </div>
  );
};

export default page;
