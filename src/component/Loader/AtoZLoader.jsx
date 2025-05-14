"use client";
import { SessionProvider } from "next-auth/react";
import { Skeleton } from "../ui/Skeleton/Skeleton";
import CategoryCardLoader from "./CategoryCardLoader";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./atozInfoLoader.css";

const SkeletonItems = ({ count, className }) =>
  [...Array(count)].map((_, index) => (
    <Skeleton key={index} className={className} />
  ));

function AtoZLoader() {
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
        <div className="max-w-[1260px] mx-auto px-[15px] flex flex-col mt-[10px] max-md:mt-[10px]">
          <ul className="flex gap-x-4 mt-[50px] items-center w-fit max-[1200px]:hidden">
            <Skeleton className="w-[50px] h-[15px]" />
            <Skeleton className="w-[70px] h-[15px]" />
          </ul>
          <div className="flex flex-col gap-y-5 mt-6">
            <Skeleton className="w-[200px] h-[15px]" />
            <div className="flex gap-x-[7px] flex-wrap justify-start gap-y-2 max-md:justify-start">
              <SkeletonItems
                count={20}
                className="w-[40px] h-[20px] rounded-sm"
              />
            </div>
          </div>
          <CategoryCardLoader showLabelSkeleton={false} />
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "70px",
            }}
          >
            <iframe
              src="/ad5"
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
                src="/ad4"
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
        </div>
        <Footer />
      </SessionProvider>
    </>
  );
}

export default AtoZLoader;
