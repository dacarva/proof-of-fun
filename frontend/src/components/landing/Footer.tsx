import Github from "../icons/Github";
import Logo from "../ui/Logo";

export default function Footer(): JSX.Element {
  return (
    <footer className="w-full max-w-[1250px] bg-yellow-500 mx-auto py-20 mt-20 relative">
      <svg
        className="absolute top-0 w-full h-6 -mt-5 sm:-mt-10 sm:h-16 text-primary text-yellow-500"
        preserveAspectRatio="none"
        viewBox="0 0 1440 54"
      >
        <path
          fill="currentColor"
          d="M0 22L120 16.7C240 11 480 1.00001 720 0.700012C960 1.00001 1200 11 1320 16.7L1440 22V54H1320C1200 54 960 54 720 54C480 54 240 54 120 54H0V22Z"
        />
      </svg>
      <div className="flex flex-col justify-center items-center gap-3">
        <Logo className="mx-auto size-16" />
        <h4>With ❤️ from Colombia</h4>
        <a
          href="https://github.com/dacarva/proof-of-fun"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Github className="size-8" />
        </a>
      </div>
    </footer>
  );
}
