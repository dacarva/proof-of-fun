import Github from "@/components/icons/Github";
import Logo from "@/components/ui/Logo";

export default function Footer(): JSX.Element {
  return (
    <footer className="w-full max-w-[1250px] mx-auto py-16 mt-20 relative">
      <div className="flex flex-col justify-center items-center gap-3">
        <Logo className="size-16" />
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
