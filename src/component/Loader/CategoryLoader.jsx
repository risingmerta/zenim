"use client";
import { SessionProvider } from "next-auth/react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { Skeleton } from "../ui/Skeleton/Skeleton";
import CategoryCardLoader from "./CategoryCardLoader";
import SidecardLoader from "./SidecardLoader";
import "./categoryLoader.css";

function CategoryLoader() {
  return (
    <>
      <SessionProvider>
        <Navbar />
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "70px",
          }}
        >
          <iframe
            src="/ad6"
            style={{
              width: "fit-content",
              height: "100px",
              border: "none",
              overflow: "hidden",
            }}
            scrolling="no"
          ></iframe>
          <div className="adClusterMain">
            <iframe
              src="/ad"
              style={{
                width: "fit-content",
                height: "100px",
                border: "none",
                overflow: "hidden",
              }}
              scrolling="no"
            ></iframe>
          </div>
          <div className="adCluster">
            <iframe
              src="/ad2"
              style={{
                width: "fit-content",
                height: "100px",
                border: "none",
                overflow: "hidden",
              }}
              scrolling="no"
            ></iframe>
          </div>
        </div>
        <div className="w-full flex flex-col gap-y-4 mt-[64px] max-md:mt-[50px]">
          <div className="flex gap-x-4 items-center p-5 mt-4">
            <Skeleton className="w-[60px] h-[60px] rounded-full bg-gray-500 max-[575px]:hidden" />
            <div className="flex flex-col w-fit gap-y-2">
              <Skeleton className="w-[150px] h-[10px] rounded-xl " />
              <Skeleton className="w-[150px] h-[10px] rounded-xl " />
            </div>
          </div>
          <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "70px",
          }}
        >
          <iframe
            src="/ad6"
            style={{
              width: "fit-content",
              height: "100px",
              border: "none",
              overflow: "hidden",
            }}
            scrolling="no"
          ></iframe>
          <div className="adClusterMain">
            <iframe
              src="/ad"
              style={{
                width: "fit-content",
                height: "100px",
                border: "none",
                overflow: "hidden",
              }}
              scrolling="no"
            ></iframe>
          </div>
          <div className="adCluster">
            <iframe
              src="/ad2"
              style={{
                width: "fit-content",
                height: "100px",
                border: "none",
                overflow: "hidden",
              }}
              scrolling="no"
            ></iframe>
          </div>
        </div>
          <div className="categorylayout">
            <CategoryCardLoader className={"mt-[0px]"} />
            <SidecardLoader />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              margin: "10px 0",
            }}
          >
            <iframe
              src="/ad3"
              style={{
                width: "fit-content",
                height: "100px",
                border: "none",
                overflow: "hidden",
              }}
              scrolling="no"
            ></iframe>
          </div>
        </div>
        <Footer />
      </SessionProvider>
    </>
  );
}

export default CategoryLoader;
