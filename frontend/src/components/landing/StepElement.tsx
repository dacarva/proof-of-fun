import { Step } from "@/types";

export default function StepElement({
  step,
  index,
  isLast,
}: {
  step: Step;
  index: number;
  isLast?: boolean;
}): JSX.Element {
  return (
    <div className="flex ">
      <div className="flex flex-col items-center mr-6">
        {index === 0 && <div className="w-px h-10 opacity-0 sm:h-full" />}
        {index > 0 && !isLast && (
          <div className="w-px h-[30px] sm:h-1/2 bg-gray-300" />
        )}
        {isLast && <div className="w-px h-[30px] sm:h-1/3 bg-gray-300" />}
        <div>
          <div className="flex items-center justify-center size-8 text-xs font-medium border rounded-full">
            {index + 1}
          </div>
        </div>
        {index === 0 ? (
          <div className="w-px h-full bg-gray-300" />
        ) : (
          !isLast && <div className="w-px h-4/5 sm:h-1/2 bg-gray-300" />
        )}
      </div>
      <div className="flex flex-col pb-6 sm:items-center sm:flex-row sm:pb-0 show">
        <div className="sm:mr-5">
          <div className="flex items-center justify-center w-16 h-16 my-3 rounded-full bg-yellow-500 sm:w-24 sm:h-24">
            {step.icon}
          </div>
        </div>
        <div>
          <h1 className="text-xl accent sm:text-base text-primary font-bold">
            {step.title}
          </h1>
          <p className="text-sm text-gray-200 pr-2">{step.description}</p>
        </div>
      </div>
    </div>
  );
}
