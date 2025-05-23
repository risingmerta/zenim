import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import Advertize from "../Advertize/Advertize";

export default function Error({ error }) {
  let title = "Error";
  let message = "Oops! Something went wrong.";

  if (error === "404") {
    title = "404 Error";
    message = "Oops! We couldn't find this page.";
  } else if (error === "dmca") {
    title = "Content Removed";
    message = "This content has been removed due to a takedown request.";
  }

  return (
    <>
      {" "}
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
      <div className="bg-[#201F31] w-full h-screen flex justify-center items-center">
        <div className="flex flex-col w-fit h-fit items-center justify-center text-center px-4">
          <img
            src="https://s1.gifyu.com/images/SBlOe.png"
            alt="Error illustration"
            className="w-[300px] h-[300px] max-[500px]:w-[200px] max-[500px]:h-[200px]"
          />
          <h1 className="text-white text-[35px] leading-5 mt-7">{title}</h1>
          <p className="mt-5 text-white max-w-[400px]">{message}</p>

          <Link
            href="/"
            className="mt-7 inline-flex items-center gap-2 bg-[#00f2fe] text-black text-[18px] py-2 px-5 rounded-3xl font-medium transition hover:scale-105"
          >
            <FaChevronLeft className="text-[#00f2fe] w-[20px] h-[20px] rounded-full p-1 bg-black" />
            Back to Homepage
          </Link>
        </div>
      </div>
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
    </>
  );
}
