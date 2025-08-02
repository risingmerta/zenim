import { Skeleton } from "../ui/Skeleton/Skeleton";
import "./SidecardLoader.css"; // ✅ Import CSS

function SidecardLoader({ className }) {
  return (
    <div className={`sidecard-loader ${className || ""}`}>
      <Skeleton className="sidecard-title" />
      <div className="sidecard-content">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="sidecard-item">
            <div className="sidecard-inner">
              <Skeleton className="sidecard-image" />
              <div className="sidecard-info">
                <Skeleton className="sidecard-text" />
                <div className="sidecard-tags">
                  <Skeleton className="sidecard-tag" />
                  <Skeleton className="sidecard-tag" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SidecardLoader;
