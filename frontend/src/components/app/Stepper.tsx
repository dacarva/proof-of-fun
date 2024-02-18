import { useState } from "react";
import FirstStep from "@/components/app/FirstStep";
import SecondStep from "@/components/app/SecondStep";
import ThirdStep from "@/components/app/ThirdStep";

export default function Stepper(): JSX.Element {
  const [currentStep, setCurrentStep] = useState(0);
  const stepsCount = [0, 1, 2, 3];

  const stepContent: JSX.Element[] = [
    <FirstStep setCurrentStep={setCurrentStep} />,
    <SecondStep setCurrentStep={setCurrentStep} />,
    <ThirdStep setCurrentStep={setCurrentStep} />,
    <></>,
  ];

  return (
    <>
      <div className="w-[80%] mx-auto px-4 sm:px-0 mt-4">
        <ul aria-label="Steps" className="flex items-center">
          {stepsCount.map((_, index) => (
            <li
              key={index}
              aria-current={currentStep === index ? "step" : false}
              className="flex-1 last:flex-none flex items-center"
            >
              <div className="flex flex-col items-center">
                <div
                  className={`size-8 rounded-full border-2 flex-none flex items-center justify-center ${
                    currentStep > index
                      ? "bg-yellow-500 border-yellow-500"
                      : "" || currentStep === index
                      ? "border-yellow-500"
                      : ""
                  }`}
                >
                  <span className={"text-white font-bold"}>{index + 1}</span>
                </div>
              </div>
              <hr
                className={`w-[90%] mx-auto border ${
                  index === stepsCount.length - 1
                    ? "hidden"
                    : "" || currentStep > index
                    ? "border-yellow-500"
                    : ""
                }`}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="my-10 h-[80%] w-[80%] mx-auto">
        {stepContent[currentStep]}
      </div>
    </>
  );
}
