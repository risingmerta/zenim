"use client";
import { useEffect, useState } from "react";
import getCategoryInfo from "@/utils/getCategoryInfo.utils";
import CategoryCard from "@/component/categorycard/CategoryCard";
import Genre from "@/component/genres/Genre";
import Topten from "@/component/topten/Topten";
import Loader from "@/component/Loader/Loader";
// import Error from "@/component/error/Error";
import PageSlider from "@/component/pageslider/PageSlider";
import SidecardLoader from "@/component/Loader/SidecardLoader";
import { useRouter } from "next/navigation";
import "./category.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { SessionProvider } from "next-auth/react";

export default function Category({ path, label, pagel }) {
  const [selectL, setSelectL] = useState("EN");
  const lang = (lang) => {
    setSelectL(lang);
  };
  const [searchParams, setSearchParams] = useState(pagel);
  const [categoryInfo, setCategoryInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const page = parseInt(searchParams) || 1;

  const [homeInfo, setHomeInfo] = useState(null);
  const [homeInfoLoading, setHomeInfoLoading] = useState(true);
  const router = useRouter();

  // Fetch Home Info
  useEffect(() => {
    const fetchHomeInfo = async () => {
      try {
        const res = await fetch("/api/home");
        const data = await res.json();
        setHomeInfo(data);
      } catch (err) {
        console.error("Error fetching home info:", err);
        setError(err);
      } finally {
        setHomeInfoLoading(false);
      }
    };
    fetchHomeInfo();
  }, []);

  // Fetch Category Info
  useEffect(() => {
    const fetchCategoryInfo = async () => {
      setLoading(true);
      try {
        const data = await getCategoryInfo(path, page);
        setCategoryInfo(data.data);
        setTotalPages(data.totalPages);
        setLoading(false);
        typeof window !== "undefined" && window.scrollTo(0, 0);
      } catch (err) {
        console.error("Error fetching category info:", err);
        setError(err);
        setLoading(false);
      }
    };
    fetchCategoryInfo();
  }, [path, page]);

  // Error handling redirects
  if (loading) return <Loader type="category" />;
  if (error) {
    router.push("/error-page");
    return null;
  }
  if (!categoryInfo) {
    router.push("/404-not-found-page");
    return null;
  }

  // Handle page change
  const handlePageChange = (newPage) => {
    setSearchParams(String(newPage));
  };

  return (
    <>
      <SessionProvider>
        <Navbar lang={lang} selectL={selectL} />
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
        <div className="w-full flex flex-col gap-y-4 mt-[10px] max-md:mt-[10px]">
          {/* Share Anime Banner */}
          <div className="w-full flex gap-x-4 items-center bg-[#191826] p-5 max-[575px]:px-3 max-[320px]:hidden">
            <img
              src="https://i.postimg.cc/d34WWyNQ/share-icon.gif"
              alt="Share Anime"
              className="w-[60px] h-auto rounded-full max-[1024px]:w-[40px] max-[575px]:hidden"
            />
            <div className="flex flex-col w-fit">
              <p className="text-[15px] font-bold text-[#00f2fe]">
                Share Anime
              </p>
              <p className="text-[16px] text-white">to your friends</p>
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

          {/* Main Content */}
          <div className="category-layout">
            {/* Category Info */}
            <div>
              {page > totalPages ? (
                <p className="font-bold text-2xl text-[#00f2fe] max-[478px]:text-[18px] max-[300px]:leading-6">
                  You came a long way, go back{" "}
                  <br className="max-[300px]:hidden" />
                  nothing is here
                </p>
              ) : (
                <>
                  {categoryInfo?.length > 0 && (
                    <CategoryCard
                      label={label?.split?.("/")?.pop() || ""}
                      data={categoryInfo}
                      showViewMore={false}
                      className="mt-0"
                      categoryPage={true}
                      path={path}
                      selectL={selectL}
                    />
                  )}
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "10px",
                      marginBottom: "-40px",
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
                  <PageSlider
                    page={page}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                  />
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
                </>
              )}
            </div>
            {/* Sidebar */}
            <div className="w-full flex flex-col gap-y-10">
              {homeInfoLoading ? (
                <SidecardLoader />
              ) : (
                <>
                  {homeInfo?.topten && (
                    <Topten
                      data={homeInfo.topten}
                      className="mt-0"
                      selectL={selectL}
                    />
                  )}
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
                  {homeInfo?.genres && <Genre data={homeInfo.genres} />}
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
                </>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </SessionProvider>
    </>
  );
}
 