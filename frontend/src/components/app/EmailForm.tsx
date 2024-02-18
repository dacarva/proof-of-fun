import { useState } from "react";
import Loader from "@/components/ui/Loader";
import { toast } from "react-toastify";

type Props = {
  setEmailSent: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EmailForm(props: Props): JSX.Element {
  const { setEmailSent } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !name) {
      toast.error("Please enter both name and email");
      return;
    }

    setIsLoading(true);

    try {
      const userInfo = {
        name,
        email,
      };

      const headersList: Record<string, string> = {
        Accept: "*/*",
        "Content-Type": "application/json",
      };

      const response = await fetch(
        "https://octopus-summary-perfectly.ngrok-free.app/request-credit-score",
        {
          method: "POST",
          headers: headersList,
          body: JSON.stringify(userInfo),
        }
      );

      if (response.ok) {
        toast.success("File uploaded successfully!");
        setEmailSent(true);
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <form onSubmit={handleEmailSubmit} className="flex text-left flex-col">
      <p>
        Enter your name and the email address you'd like to verify your credit
        score with:
      </p>
      <div className="flex flex-col justify-center gap-3">
        <input
          type="text"
          className="mt-3 grow"
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
        />
        <input
          type="email"
          className="mb-3 grow"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="test@unknown.com"
        />
        <button
          type="submit"
          className="btn btn-primary whitespace-nowrap min-w-[120px] flex self-center justify-center w-fit"
          disabled={!isValidEmail || !name || isLoading}
        >
          {isLoading ? <Loader /> : "Send Email"}
        </button>
      </div>
    </form>
  );
}
