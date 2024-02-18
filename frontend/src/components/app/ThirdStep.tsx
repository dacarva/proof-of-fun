import { useState } from "react";
import EmlFileForm from "./EmlFileForm";

type Props = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

export default function ThirdStep(props: Props): JSX.Element {
  const { setCurrentStep } = props;
  const [scoreProved, setScoreProved] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="flex gap-8 flex-col items-center text-center">
        <h1 className="accent">Get Credit Score</h1>
        <EmlFileForm setScoreProved={setScoreProved} />
      </div>
      <button
        onClick={() => setCurrentStep((prev) => prev + 1)}
        className="btn btn-primary mt-16 self-end"
        disabled={!scoreProved}
      >
        Next
      </button>
    </div>
  );
}
