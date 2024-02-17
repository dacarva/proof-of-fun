import { Step } from "@/types";
import StepElement from "@/components/landing/StepElement";

export function HowItWorks({ steps }: { steps: Step[] }): JSX.Element {
  return (
    <section className="py-20" id="how-it-works">
      <header className="text-center font-bold my-5">
        <h1 className="text-4xl text-primary font-extrabold accent">
          How it works
        </h1>
      </header>
      <div className="grid max-w-[900px] mx-auto">
        {steps.map((step, index) => (
          <StepElement
            key={index}
            step={step}
            index={index}
            isLast={index === steps.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
