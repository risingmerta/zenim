import CategoryCardLoader from "./CategoryCardLoader";
import SidecardLoader from "./SidecardLoader";

function ProducerLoader() {
  return (
    <div className="w-full mt-[100px] flex flex-col gap-y-4 max-md:mt-[50px]">
      <div className="page-container">
        <CategoryCardLoader className={"mt-[0px]"} />
        <SidecardLoader />
      </div>
    </div>
  );
}

export default ProducerLoader;
