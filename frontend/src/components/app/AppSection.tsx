import MainCard from "@/components/app/MainCard";
import { Link } from "react-router-dom";
import LeftArrow from "../icons/LeftArrow";

export default function AppSection(): JSX.Element {
  return (
    <main className="relative min-h-dvh w-full grid place-items-center overflow-hidden">
      <img
        src="/images/blob1.png"
        alt="blob1"
        className="absolute w-[350px] md:w-[500px] top-[-10px] left-[-100px] md:top-[-40px] md:left-[10%]"
      />
      <img
        src="/images/blob2.png"
        alt="blob1"
        className="absolute w-[500px] md:w-[700px] right-[-100px] bottom-[-10px] md:bottom-[-50px] md:right-[10px]"
      />
      <div className="w-full max-w-[1250px] mx-auto flex flex-col justify-center items-center z-30 gap-3 px-2">
        <Link to={"/"} className="self-start btn btn-secondary ml-4">
          <LeftArrow className="inline-block mr-2" /> Back Home
        </Link>
        <MainCard />
      </div>
    </main>
  );
}
