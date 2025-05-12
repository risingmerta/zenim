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
        <Navbar lang={lang} selectL={selectL} />
        <div className="w-full flex flex-col gap-y-4 mt-[100px] max-md:mt-[50px]">
          {producerInfo ? (
            <div className="category-layout">
              {page > totalPages ? (
                <p className="font-bold text-2xl text-[#00f2fe] max-[478px]:text-[18px] max-[300px]:leading-6">
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
                    />
                  )}
                  <PageSlider
                    page={page}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                  />
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
                      />
                    )}
                    {homeInfo?.genres && <Genre data={homeInfo.genres} />}
                  </>
                )}
              </div>
            </div>
          ) : (
            <Error />
          )}
        </div>
        <Footer />
      </SessionProvider>
    </>
  );
}
