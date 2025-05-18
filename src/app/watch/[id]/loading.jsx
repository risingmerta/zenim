import SidecardLoader from "@/component/Loader/SidecardLoader";
import BouncingLoader from "@/component/ui/bouncingloader/Bouncingloader";
import { Skeleton } from "@/component/ui/Skeleton/Skeleton";
import React from "react";
import "./loading.css";
import CategoryCardLoader from "@/component/Loader/CategoryCardLoader";
import Navbar from "@/component/Navbar/Navbar";
import Footer from "@/component/Footer/Footer";
import { SessionProvider } from "next-auth/react";

const loading = () => {
  return (
    <div>
      <SessionProvider>
        <Navbar />
        <div className="w-full h-fit flex flex-col justify-center items-center relative">
          <div className="w-full relative max-[1400px]:px-[30px] max-[1200px]:px-[80px] max-[1024px]:px-0">
            <img src={""} alt={`Poster`} className="backgroundImage" />
            <div className="backgroundOverlay"></div>
            <div className="layoutWrapper">
              <div className="flex w-full min-h-fit max-[1200px]:flex-col-reverse">
                <div className="episodes w-[35%] bg-[#191826] flex justify-center items-center max-[1400px]:w-[380px] max-[1200px]:w-full max-[1200px]:h-full max-[1200px]:min-h-[100px]">
                  <BouncingLoader />
                </div>
                <div className="player w-full h-fit bg-black flex flex-col">
                  <div className="w-full relative h-[480px] max-[1400px]:h-[40vw] max-[1200px]:h-[48vw] max-[1024px]:h-[58vw] max-[600px]:h-[65vw]">
                    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                      <BouncingLoader />
                    </div>
                  </div>
                  <div className="relative bg-[#11101A] p-4 w-full min-h-[100px] flex justify-center items-center max-[1200px]:bg-[#14151A]">
                    <div className="w-full h-full rounded-lg flex justify-center items-center max-[600px]:rounded-none">
                      <BouncingLoader />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-y-4 items-start ml-8 max-[1400px]:ml-0 max-[1400px]:mt-10 max-[1400px]:flex-row max-[1400px]:gap-x-6 max-[1024px]:px-[30px] max-[1024px]:mt-8 max-[500px]:mt-4 max-[500px]:px-4">
                <Skeleton className="w-[100px] h-[150px] rounded-none" />

                <div className="flex flex-col gap-y-4 justify-start">
                  <Skeleton className="w-[170px] h-[20px] rounded-xl" />
                  <div className="flex flex-wrap w-fit gap-x-[2px] gap-y-[3px]">
                    <Skeleton className="w-[70px] h-[20px] rounded-xl" />
                  </div>

                  <div className="flex flex-col gap-y-2">
                    <Skeleton className="w-[200px] h-[10px] rounded-xl" />
                    <Skeleton className="w-[160px] h-[10px] rounded-xl" />
                    <Skeleton className="w-[100px] h-[10px] rounded-xl" />
                    <Skeleton className="w-[80px] h-[10px] rounded-xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex gap-x-4 items-center bg-[#191826] p-5 max-[575px]:px-3 max-[320px]:hidden">
            <img
              src="https://i.postimg.cc/d34WWyNQ/share-icon.gif"
              alt="Share Anime"
              className="w-[60px] h-auto rounded-full max-[1024px]:w-[40px] max-[575px]:hidden"
            />
            <div className="flex flex-col w-fit">
              <p className="text-[15px] font-bold text-[#FFBADE]">
                Share Anime
              </p>
              <p className="text-[16px] text-white">to your friends</p>
            </div>
          </div>
          <div className="contentWrapper">
            <div className="mt-[15px] flex flex-col gap-y-7">
              <CategoryCardLoader className={"mt-[15px]"} />
            </div>
            <div>
              <SidecardLoader className={"mt-[25px]"} />
              <SidecardLoader className={"mt-[25px]"} />
            </div>
          </div>
        </div>
        <Footer />
      </SessionProvider>
    </div>
  );
};

export default loading;
