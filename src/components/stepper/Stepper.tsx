import React from "react";

type StepperProps = {
  currentStep: number;
  steps?: string[];
};

export default function Stepper({
  currentStep,
  steps = ["Sacola", "Identificação", "Pagamento"],
}: StepperProps) {
  return (
    <div className="hidden w-full items-center gap-4 lg:flex">
      {steps.map((label, index) => {
        const step = index + 1;
        const isCompleted = step < currentStep;
        const isCurrent = step === currentStep;

        return (
          <div key={label} className="flex w-full items-center">
            {/* Circle + Label */}
            <div className="flex min-w-max items-center gap-3">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-sm ${
                  isCompleted
                    ? "bg-green-500 text-white"
                    : isCurrent
                      ? "border-2 border-green-500 bg-white text-green-600"
                      : "bg-gray-200 text-gray-500"
                }`}
              >
                {isCompleted ? "✓" : step}
              </div>

              <span
                className={`font-medium ${
                  isCompleted
                    ? "text-green-600"
                    : isCurrent
                      ? "text-gray-700"
                      : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </div>

            {/* Connector (não aparece após o último step) */}
            {index < steps.length - 1 && (
              <div
                className={`ml-4 h-[3px] flex-1 rounded-full ${step < currentStep ? "bg-green-500" : "bg-gray-300"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
