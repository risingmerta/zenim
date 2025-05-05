import AnimeInfoLoader from "./AnimeInfoLoader";
import HomeLoader from "./HomeLoader";
import CategoryLoader from "./CategoryLoader";
import AtoZLoader from "./AtoZLoader";
import ProducerLoader from "./ProducerLoader";

const Loader = ({ type }) => {
  switch (type) {
    case "home":
      return <HomeLoader />;
    case "animeInfo":
      return <AnimeInfoLoader />;
    case "category":
      return <CategoryLoader />;
    case "producer":
      return <ProducerLoader />;
    case "AtoZ":
      return <AtoZLoader />;
    default:
      return <div className="loading-skeleton default-skeleton"></div>;
  }
};

export default Loader;
