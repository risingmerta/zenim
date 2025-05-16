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
        {/* <div
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
        </div> */}
        <div className="w-full mt-[100px] flex flex-col gap-y-4 max-md:mt-[50px]">
          {/* <div
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
          </div> */}
          <div className="page-container">
            <CategoryCardLoader className={"mt-[0px]"} />
            <SidecardLoader />
          </div>
          {/* <div
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
          </div> */}
        </div>
        <Footer />
      </SessionProvider>
    </>
  );
}

export default ProducerLoader;
