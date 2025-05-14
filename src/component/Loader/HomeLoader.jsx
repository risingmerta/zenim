"use client";
import { SessionProvider } from "next-auth/react";
import CartLoader from "./CartLoader";
import CategoryCardLoader from "./CategoryCardLoader";
import SidecardLoader from "./SidecardLoader";
import SpotlightLoader from "./SpotlightLoader";
import Trendingloader from "./TrendingLoader";
import "./homeLoader.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
function HomeLoader() {
  return (
    <>
      <SessionProvider>
        <Navbar />
        <div className="px-4 w-full h-full  max-[1200px]:px-0 bg-[#3a395100]">
          <SpotlightLoader />
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
          <Trendingloader />
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
          <div className="mt-16 flex gap-6 max-[1200px]:px-4 max-[1200px]:grid max-[1200px]:grid-cols-2 max-[1200px]:mt-12 max-[1200px]:gap-y-10 max-[680px]:grid-cols-1">
            <CartLoader />
            <CartLoader />
            <CartLoader />
            <CartLoader />
          </div>
          <div className="page-layout">
            <div>
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
              <CategoryCardLoader className="mt-[60px]" />
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
              <CategoryCardLoader className="mt-[60px]" />
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  margin: "10px 0",
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
              </div>
              <CategoryCardLoader className="mt-[60px]" />
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  margin: "10px 0",
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
              </div>
            </div>
            <div className="w-full mt-[60px]">
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
          </div>
        </div>
        <Footer />
      </SessionProvider>
    </>
  );
}

export default HomeLoader;
