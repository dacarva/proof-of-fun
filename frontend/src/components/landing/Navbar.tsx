import Logo from "@/components/ui/Logo";
import { Link } from "react-router-dom";

export default function Navbar(): JSX.Element {
  return (
    <nav className="max-w-[1250px] mx-auto flex justify-between items-center px-3 py-5 gap-4">
      <Logo className="text-yellow-500 size-14" />
      <Link to={"/app"} className="btn btn-primary">
        Launch App
      </Link>
    </nav>
  );
}
