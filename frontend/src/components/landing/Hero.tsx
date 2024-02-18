import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";

export default function Hero(): JSX.Element {
  return (
    <section className="pb-10">
      <Navbar />
      <div className="max-w-[1250px] h-full mx-auto flex px-3 py-10 lg:py-20 md:flex-row flex-col-reverse items-center">
        <div className="lg:max-w-lg lg:w-full w-5/6 mb-10 md:mb-0">
          <img
            className="object-cover object-center rounded"
            alt="hero"
            src="/images/eth.webp"
          />
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 mb-10 md:mb-0 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 className="text-3xl lg:text-5xl mb-4 font-extrabold accent">
            Unlocking Financial Freedom
          </h1>
          <p className="mb-8 leading-relaxed">
            Discover a new era in lending with{" "}
            <span className="accent">Unknown Finance</span>. Our platform
            utilizes <span className="accent">zk-proof technology</span> to
            swiftly <span className="accent">approve loans</span>, ensuring
            privacy and security. Experience financial freedom like never
            before.
          </p>
          <div className="flex justify-center gap-3">
            <Link to={"/app"} className="btn btn-primary">
              Get Started
            </Link>
            <a href="#how-it-works" className="btn btn-secondary">
              See more
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
