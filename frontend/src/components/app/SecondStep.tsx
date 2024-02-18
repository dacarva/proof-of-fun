import EmailForm from "@/components/app/EmailForm";
import { useState } from "react";

type Props = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};
export default function SecondStep(props: Props): JSX.Element {
  const [emailSent, setEmailSent] = useState(false);
  const { setCurrentStep } = props;

  return (
    <div className="flex flex-col">
      <div className="flex gap-8 flex-col items-center text-center">
        <h1 className="accent">Get Credit Score</h1>
        <EmailForm setEmailSent={setEmailSent} />
      </div>
      <button
        onClick={() => setCurrentStep((prev) => prev + 1)}
        className="btn btn-primary mt-16 self-end"
        disabled={!emailSent}
      >
        Next
      </button>
    </div>
  );
}
