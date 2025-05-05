import { useState, useEffect } from "react";
import { Skeleton } from "../ui/Skeleton/Skeleton";

function TrendingLoader() {
  const [count, setCount] = useState(() =>
    typeof window !== "undefined" && window.innerWidth < 720
      ? 3
      : typeof window !== "undefined" && window.innerWidth < 1300
      ? 4
      : 6
  );
  useEffect(() => {
    const updateCount = () => {
      if (typeof window !== "undefined" && window.innerWidth < 720) {
        setCount(3);
      } else if (typeof window !== "undefined" && window.innerWidth < 1300) {
        setCount(4);
      } else {
        setCount(6);
      }
    };
    updateCount();
    typeof window !== "undefined" && window.addEventListener("resize", updateCount);
    return () => typeof window !== "undefined" && window.removeEventListener("resize", updateCount);
  }, []);
  return (
    <div className="flex flex-col w-full mt-10 max-[1200px]:px-4">
      <Skeleton className="w-[150px] h-[20px] max-[400px]:w-[100px]" />
      <div className="w-full h-[250px] overflow-hidden flex mt-6 justify-around max-[1300px]:h-fit">
        {[...Array(count)].map((_, index) => (
          <div key={index}>
            <Skeleton className="w-[200px] h-full rounded-none max-[1300px]:w-[22vw] max-[1300px]:h-[30vw] max-[720px]:w-[25vw] max-[720px]:h-[35vw]" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrendingLoader;
