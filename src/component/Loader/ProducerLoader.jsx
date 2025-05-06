"use client";
import { SessionProvider } from "next-auth/react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import CategoryCardLoader from "./CategoryCardLoader";
import SidecardLoader from "./SidecardLoader";

function ProducerLoader() {
  return (
    <>
      <SessionProvider>
        <Navbar />
        <div className="w-full mt-[100px] flex flex-col gap-y-4 max-md:mt-[50px]">
          <div className="page-container">
            <CategoryCardLoader className={"mt-[0px]"} />
            <SidecardLoader />
          </div>
        </div>
        <Footer />
      </SessionProvider>
    </>
  );
}

export default ProducerLoader;
