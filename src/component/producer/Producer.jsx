"use client";
// import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Error from "../error/Error";
import Topten from "../topten/Topten";
import Genre from "../genres/Genre";
import SidecardLoader from "../Loader/SidecardLoader";
import PageSlider from "../pageslider/PageSlider";
import CategoryCard from "../categorycard/CategoryCard";
import { useEffect, useState } from "react";
// import { useHomeInfo } from "@/context/HomeInfoContext";
import getProducer from "@/utils/getProducer.utils";
import Loader from "../Loader/Loader";
import { useRouter } from "next/navigation";
import "./producer.css";
import { SessionProvider } from "next-auth/react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Script from "next/script";
import Share from "../Share/Share";

export default function Producer(props) {
  const [selectL, setSelectL] = useState("EN");
  const lang = (lang) => {
    setSelectL(lang);
  };
  const id = props.id;
  const [searchParams, setSearchParams] = useState(props.page);
  const [producerInfo, setProducerInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const page = searchParams || 1;
  const [homeInfo, setHomeInfo] = useState(null);
  const [homeInfoLoading, setHomeInfoLoading] = useState(true);

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
  const router = useRouter();
  useEffect(() => {
    const fetchProducerInfo = async () => {
      setLoading(true);
      try {
        const data = await getProducer(id, page);
        setProducerInfo(data.data);
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (err) {
        setError(err);
        console.error("Error fetching category info:", err);
      }
    };
    fetchProducerInfo();
    typeof window !== "undefined" && window.scrollTo(0, 0);
  }, [id, page]);
  if (loading) return <Loader type="producer" />;
  if (error) {
    router.push("/error-page");
    return <Error />;
  }
  if (!producerInfo) {
    router.push("/404-not-found-page");
    return null;
  }
  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  return (
    <>
      <SessionProvider>
        <Navbar lang={lang} selectL={selectL} refer={props.refer} />
        {/* <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "65px",
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
        </div> */}
        <div className="w-full mt-[70px]">
          <Share
            ShareUrl={`https://shoko.fun/producer/${id}${props.refer ? `?refer=${props.refer}` : `?refer=weebhideout`
              }`}
            arise={
              (id.charAt(0).toUpperCase() + id.slice(1)).split("-").join(" ") +
              " Anime"
            }
          />
        </div>
        <div className="w-full flex flex-col gap-y-4 mt-[70px] max-md:mt-[70px]">
          {producerInfo ? (
            <div className="category-layout">
              {page > totalPages ? (
                <p className="font-bold text-2xl text-[#1efe00] max-[478px]:text-[18px] max-[300px]:leading-6">
                  You came a long way, go back{" "}
                  <br className="max-[300px]:hidden" />
                  nothing is here
                </p>
              ) : (
                <div>
                  {producerInfo && (
                    <CategoryCard
                      label={
                        (id.charAt(0).toUpperCase() + id.slice(1))
                          .split("-")
                          .join(" ") + " Anime"
                      }
                      data={producerInfo}
                      showViewMore={false}
                      className={"mt-0"}
                      categoryPage={true}
                      selectL={selectL}
                      refer={props.refer}
                    />
                  )}

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "10px 0",
                      backgroundColor: "#201f31",
                    }}
                  >
                    <iframe
                      src="/ad"
                      title="Sponsored Ad"
                      scrolling="no"

                      referrerPolicy="no-referrer-when-downgrade"
                      style={{
                        width: "100%",
                        maxWidth: "728px",
                        height: "90px",
                        border: "none",
                        borderRadius: "10px",
                        overflow: "hidden",
                        backgroundColor: "#201f31",
                      }}
                    />
                  </div>
                  <PageSlider
                    page={page}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                    refer={props.refer}
                  />

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "10px 0",
                      backgroundColor: "#201f31",
                    }}
                  >
                    <iframe
                      src="/ad"
                      title="Sponsored Ad"
                      scrolling="no"

                      referrerPolicy="no-referrer-when-downgrade"
                      style={{
                        width: "100%",
                        maxWidth: "728px",
                        height: "90px",
                        border: "none",
                        borderRadius: "10px",
                        overflow: "hidden",
                        backgroundColor: "#201f31",
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="w-full flex flex-col gap-y-10">
                {homeInfoLoading ? (
                  <SidecardLoader />
                ) : (
                  <>
                    {homeInfo && homeInfo.topten && (
                      <Topten
                        data={homeInfo.topten}
                        className="mt-0"
                        selectL={selectL}
                        refer={props.refer}
                      />
                    )}
                    {homeInfo?.genres && (
                      <Genre data={homeInfo.genres} refer={props.refer} />
                    )}
                  </>
                )}
              </div>
            </div>
          ) : (
            <Error />
          )}
        </div>

        <Footer refer={props.refer} />
      </SessionProvider>
    </>
  );
}
