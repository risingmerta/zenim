"use client";
import { SessionProvider } from "next-auth/react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import CategoryCardLoader from "./CategoryCardLoader";
import SidecardLoader from "./SidecardLoader";
import "./producerLoader.css";

function ProducerLoader() {
  return (
    <>
      <SessionProvider>
        <Navbar />
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            margin: "10px 0",
          }}
        >
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
        <div className="w-full mt-[100px] flex flex-col gap-y-4 max-md:mt-[50px]">
          <div className="page-container">
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                margin: "10px 0",
              }}
            >
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
            <CategoryCardLoader className={"mt-[0px]"} />
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
            <SidecardLoader />
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                margin: "10px 0",
              }}
            >
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
          </div>
        </div>
        <Footer />
      </SessionProvider>
    </>
  );
}

export default ProducerLoader;
