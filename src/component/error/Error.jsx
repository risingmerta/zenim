import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa"

function Error({ error }) {
    return (
        <div className="bg-[#201F31] w-full h-screen flex justify-center items-center">
            <div className="flex flex-col w-fit h-fit items-center justify-center">
                <img src="https://s1.gifyu.com/images/SBlOe.png" alt="" className="w-[300px] h-[300px] max-[500px]:w-[200px] max-[500px]:h-[200px]" />
                <h1 className="text-white text-[35px] leading-5 mt-7">{error === "404" ? "404 Error" : "Error"}</h1>
                <p className="mt-5">Oops! We couldn&apos;t find this page.</p>
                <button className="bg-[#00f2fe] py-2 px-4 w-fit rounded-3xl text-black text-light flex items-center gap-x-2 mt-7">
                    <FaChevronLeft className="text-[#00f2fe] w-[20px] h-[20px] rounded-full p-1 bg-black" />
                    <Link href={'/'} className="text-[18px]">Back to homepage</Link>
                </button>
            </div>
        </div>
    )
}

export default Error