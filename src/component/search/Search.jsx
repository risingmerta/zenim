"use client";
import CategoryCard from "@/component/categorycard/CategoryCard";
import Genre from "@/component/genres/Genre";
import CategoryCardLoader from "@/component/Loader/CategoryCardLoader";
import SidecardLoader from "@/component/Loader/SidecardLoader";
import PageSlider from "@/component/pageslider/PageSlider";
import Sidecard from "@/component/sidecard/Sidecard";
import { useHomeInfo } from "@/context/HomeInfoContext";
import getSearch from "@/utils/getSearch.utils";
import { useEffect, useState } from "react";
import "./search.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Search(props) {
  const [searchParams, setSearchParams] = useState(props.page);
  const [searchParam, setSearchParam] = useState(props.keyword);
  const keyword = searchParam;
  const page = parseInt(searchParams) || 1;
  const [searchData, setSearchData] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // filter code start
  const genresString = props.genres;

  const decodedString = decodeURIComponent(genresString);
  const indexes = decodedString.split(",").map(Number);

  const genArr = [
    "Action",
    "Adventure",
    "Cars",
    "Comedy",
    "Dementia",
    "Demons",
    "Drama",
    "Ecchi",
    "Fantasy",
    "Game",
    "Harem",
    "Historical",
    "Horror",
    "Isekai",
    "Josei",
    "Kids",
    "Magic",
    "Martial Arts",
    "Mecha",
    "Military",
    "Music",
    "Mystery",
    "Parody",
    "Police",
    "Psychological",
    "Romance",
    "Samurai",
    "School",
    "Sci-Fi",
    "Seinen",
    "Shoujo",
    "Shoujo Ai",
    "Shounen",
    "Shounen Ai",
    "Slice of Life",
    "Space",
    "Sports",
    "Super Power",
    "Supernatural",
    "Thriller",
    "Vampire",
  ];
  const [filters, setFilters] = useState({
    type: props.type ? props.type : "All",
    status: props.status ? props.status : "All",
    rating: props.rating ? props.rating : "All",
    score: props.score ? props.score : "All",
    season: props.season ? props.season : "All",
    language: props.language ? props.language : "All",
    genres: props.genres ? indexes.map((index) => genArr[index - 1]) : [],
    startDateYear: props.sy ? props.sy : "",
    startDateMonth: props.sm ? props.sm : "",
    startDateDay: props.sd ? props.sd : "",
    endDateYear: props.ey ? props.ey : "",
    endDateMonth: props.em ? props.em : "",
    endDateDay: props.ed ? props.ed : "",
    sort: props.sort ? props.sort : "default",
  });

  const filtersList = [
    {
      label: "Type",
      name: "type",
      values: ["All", "Movie", "TV", "OVA", "ONA", "Special", "Music"],
    },
    {
      label: "Status",
      name: "status",
      values: ["All", "Finished Airing", "Currently Airing", "Not yet aired"],
    },
    {
      label: "Rating",
      name: "rating",
      values: ["All", "G", "PG", "PG-13", "R", "R+", "Rx"],
    },
    {
      label: "Score",
      name: "score",
      values: [
        "All",
        "(1) Appalling",
        "(2) Horrible",
        "(3) Very Bad",
        "(4) Bad",
        "(5) Average",
        "(6) Fine",
        "(7) Good",
        "(8) Very Good",
        "(9) Great",
        "(10) Masterpiece",
      ],
    },
    {
      label: "Season",
      name: "season",
      values: ["All", "Spring", "Summer", "Fall", "Winter"],
    },
    {
      label: "Language",
      name: "language",
      values: ["All", "SUB", "DUB", "SUB & DUB"],
    },
  ];

  const handleGenreClick = (genre) => {
    setFilters((prevState) => {
      const updatedGenres = prevState.genres.includes(genre)
        ? prevState.genres.filter((g) => g !== genre)
        : [...prevState.genres, genre];

      return { ...prevState, genres: updatedGenres };
    });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle separate date inputs
  const handleStartYearChange = (e) => {
    setFilters((prevState) => ({
      ...prevState,
      startDateYear: e.target.value,
    }));
  };

  const handleStartMonthChange = (e) => {
    setFilters((prevState) => ({
      ...prevState,
      startDateMonth: e.target.value,
    }));
  };

  const handleStartDayChange = (e) => {
    setFilters((prevState) => ({ ...prevState, startDateDay: e.target.value }));
  };

  const handleEndYearChange = (e) => {
    setFilters((prevState) => ({ ...prevState, endDateYear: e.target.value }));
  };

  const handleEndMonthChange = (e) => {
    setFilters((prevState) => ({ ...prevState, endDateMonth: e.target.value }));
  };

  const handleEndDayChange = (e) => {
    setFilters((prevState) => ({ ...prevState, endDateDay: e.target.value }));
  };

  const router = useRouter();

  const filteredData = props.filteredAnimes;

  const applyFilters = async () => {
    const queryParams = new URLSearchParams();

    // Type filter
    if (filters.type !== "All") queryParams.append("type", filters.type);

    // Status filter
    if (filters.status !== "All") queryParams.append("status", filters.status);

    // Rating filter
    if (filters.rating !== "All") queryParams.append("rating", filters.rating);

    // Score filter
    if (filters.score !== "All") queryParams.append("score", filters.score);

    // Season filter
    if (filters.season !== "All") queryParams.append("season", filters.season);

    // Language filter
    if (filters.language !== "All")
      queryParams.append("language", filters.language);

    // Genre filters
    if (filters.genres.length > 0) {
      const genresWithIndex = filters.genres.map(
        (genre) => genArr.indexOf(genre) + 1
      );
      queryParams.append("genres", genresWithIndex.join(","));
    }

    // Start date filter
    if (filters.startDateYear) queryParams.append("sy", filters.startDateYear);
    if (filters.startDateMonth)
      queryParams.append("sm", filters.startDateMonth);
    if (filters.startDateDay) queryParams.append("sd", filters.startDateDay);

    // End date filter
    if (filters.endDateYear) queryParams.append("ey", filters.endDateYear);
    if (filters.endDateMonth) queryParams.append("em", filters.endDateMonth);
    if (filters.endDateDay) queryParams.append("ed", filters.endDateDay);

    // Sort filter
    if (filters.sort !== "Default") queryParams.append("sort", filters.sort);

    // keyword
    if (props.keyword) queryParams.append("keyword", props.keyword);

    // Navigate to /filter with query parameters
    router.push(
      props.onSear === "yes"
        ? `/search?${queryParams.toString()}`
        : `/filter?${queryParams.toString()}`
    );
    // const response = await fetch(`/api/filter?${queryParams.toString()}`);
    // const filteredAnimes = await response.json();
    // console.log(filteredAnimes);
    // setFilteredData(filteredAnimes);
  };

  const [selectL, setSelectL] = useState("en");
  const [profiIsOpen, setProfiIsOpen] = useState(false);
  const [logIsOpen, setLogIsOpen] = useState(false);
  const sign = (sign) => {
    setLogIsOpen(sign);
  };

  const lang = (lang) => {
    setSelectL(lang);
  };

  const [fullPath, setFullPath] = useState("");

  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const adContainer = document.getElementById("ad-container2");
      if (adContainer) {
        adContainer.innerHTML = `
              <iframe
              src="/ad2"
              style="width: fit-content; height: 100px; border: none; overflow: hidden;"
              scrolling="no"
            ></iframe>
            `;
      }
    }
  }, [pathname]);

  useEffect(() => {
    let currentPath = window.location.pathname + window.location.search;

    if (!currentPath.includes("page=")) {
      if (currentPath.includes("?")) {
        currentPath += "&page=1";
      } else {
        currentPath += "?page=1";
      }
    }

    setFullPath(currentPath);
  }, [
    props.sort,
    props.type,
    props.language,
    props.status,
    props.score,
    props.season,
    props.rating,
    props.genres,
    props.sy,
    props.sm,
    props.sd,
    props.ey,
    props.em,
    props.ed,
    props.page,
    props?.keyword,
  ]);
  // filter code end

  useEffect(() => {
    const fetchSearch = async () => {
      setLoading(true);
      try {
        const data = await getSearch(
          props.type,
          props.status,
          props.rated,
          props.score,
          props.season,
          props.language,
          props.sy,
          props.sm,
          props.sd,
          props.ey,
          props.em,
          props.ed,
          props.sort,
          props.genres,
          props.page,
          props.keyword,
          props.onSear
        );
        setSearchData(data.data);
        setTotalPages(data.totalPage);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching anime info:", err);
        setError(err);
        setLoading(false);
      }
    };
    fetchSearch();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [
    props.type,
    props.status,
    props.rated,
    props.score,
    props.season,
    props.language,
    props.sy,
    props.sm,
    props.sd,
    props.ey,
    props.em,
    props.ed,
    props.sort,
    props.genres,
    props.page,
    props.keyword,
    props.onSear,
  ]);

  const searchPar = useSearchParams();

  const handlePageChange = (newPage) => {
    setSearchParams(newPage);
    const params = new URLSearchParams(searchPar.toString());

    // Set or update the 'page' param
    params.set("page", newPage);
    router.push(`?${params.toString()}`);
  };
  return (
    <div className="main-layout">
      <div>
        <div className="filter-container">
          <h2>Filter</h2>

          <div className="filter-row">
            {filtersList.map((filter) => (
              <div key={filter.label} className="filter-group">
                <label>{filter.label}</label>
                <select
                  name={filter.name}
                  value={filters[filter.name]} // Default to index 3 if no value is set
                  onChange={handleFilterChange}
                  className="filter-dropdown"
                >
                  {filter.values.map((value, idx) => (
                    <option key={value} value={idx}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {/* Date Filters */}
          <div className="filter-row">
            {["startDate", "endDate"].map((dateType) => (
              <div key={dateType} className="filter-group">
                <label>
                  {dateType === "startDate" ? "Start Date" : "End Date"}
                </label>
                <div className="date-inputs">
                  <select
                    className="date-dropdown"
                    onChange={
                      dateType === "startDate"
                        ? handleStartYearChange
                        : handleEndYearChange
                    }
                  >
                    <option value="">Year</option>
                    {[...Array(50)].map((_, i) => (
                      <option key={i} value={1970 + i}>
                        {1970 + i}
                      </option>
                    ))}
                  </select>
                  <select
                    className="date-dropdown"
                    onChange={
                      dateType === "startDate"
                        ? handleStartMonthChange
                        : handleEndMonthChange
                    }
                  >
                    <option value="">Month</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                  <select
                    className="date-dropdown"
                    onChange={
                      dateType === "startDate"
                        ? handleStartDayChange
                        : handleEndDayChange
                    }
                  >
                    <option value="">Day</option>
                    {Array.from({ length: 31 }, (_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>

          {/* Sort Option */}
          <div className="filter-row">
            <div className="filter-group">
              <label>Sort</label>
              <select
                name="sort"
                value={filters.sort}
                onChange={handleFilterChange}
                className="filter-dropdown"
              >
                <option value="default">Default</option>
                <option value="recently_added">Recently Added</option>
                <option value="recently_updated">Recently Updated</option>
                <option value="score">Score</option>
                <option value="name_az">Name A-Z</option>
                <option value="released_date">Released Date</option>
                <option value="most_watched">Most Watched</option>
              </select>
            </div>
          </div>

          {/* Genre */}
          <div className="filter-row">
            <label>Genre</label>
            <div className="genres">
              {genArr.map((gen) => (
                <span
                  key={gen}
                  className={`genre-item ${
                    filters.genres.includes(gen) ? "selected" : ""
                  }`}
                  onClick={() => handleGenreClick(gen)}
                >
                  {gen}
                </span>
              ))}
            </div>
          </div>

          <button className="filter-button" onClick={applyFilters}>
            Apply Filters
          </button>
        </div>
        {loading ? (
          <CategoryCardLoader className={"max-[478px]:mt-2"} />
        ) : page > totalPages ? (
          <p className="font-bold text-2xl text-[#00f2fe] max-[478px]:text-[18px] max-[300px]:leading-6">
            You came a long way, go back <br className="max-[300px]:hidden" />
            nothing is here
          </p>
        ) : //filter div code start
        // filter div code end
        searchData && searchData.length > 0 ? (
          <div>
            <CategoryCard
              label={
                props.onSear
                  ? `Search results for: ${keyword}`
                  : `Filtered results`
              }
              data={searchData}
              showViewMore={false}
              className={"mt-0"}
            />
            <PageSlider
              page={parseInt(searchParams || "1", 10)}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </div>
        ) : error ? (
          <p className="font-bold text-2xl text-[#00f2fe] max-[478px]:text-[18px]">
            Couldn&apos;t get search result please try again
          </p>
        ) : (
          <h1 className="font-bold text-2xl text-[#00f2fe] max-[478px]:text-[18px]">{`Search results for: ${keyword}`}</h1>
        )}
      </div>
      <div className="w-full flex flex-col gap-y-10">
        {homeInfoLoading ? (
          <SidecardLoader />
        ) : (
          <>
            {homeInfo?.most_popular && (
              <Sidecard
                data={homeInfo.most_popular}
                className="mt-0"
                label="Most Popular"
              />
            )}
            {homeInfo?.genres && <Genre data={homeInfo.genres} />}
          </>
        )}
      </div>
    </div>
  );
}
