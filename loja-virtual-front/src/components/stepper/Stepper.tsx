import { FaCheck, FaShoppingBag, FaUser, FaCreditCard } from "react-icons/fa";
import { motion } from "framer-motion";

type StepperProps = {
  currentStep: number;
};

export default function Stepper({ currentStep }: StepperProps) {
  const steps = [
    { label: "Sacola", icon: FaShoppingBag },
    { label: "Identificação", icon: FaUser },
    { label: "Pagamento", icon: FaCreditCard },
  ];

  return (
    <div className="w-full py-6">
      <div className="relative flex items-center justify-between">
        <div className="absolute top-1/2 left-0 h-1 w-full -translate-y-1/2 rounded-full bg-gray-200" />

        <motion.div
          className="absolute top-1/2 left-0 h-1 -translate-y-1/2 rounded-full bg-green-500"
          initial={{ width: "0%" }}
          animate={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const Icon = step.icon;

          return (
            <div
              key={step.label}
              className="relative z-10 flex flex-col items-center"
            >
              <motion.div
                initial={false}
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                  backgroundColor:
                    isCompleted || isCurrent ? "#22c55e" : "#e5e7eb", // green-500 ou gray-200
                  color: isCompleted || isCurrent ? "#ffffff" : "#6b7280",
                }}
                className={`flex h-10 w-10 items-center justify-center rounded-full border-4 text-sm font-bold transition-colors duration-300 ${
                  isCurrent
                    ? "border-green-100 ring-2 ring-green-500 ring-offset-2"
                    : "border-white"
                }`}
              >
                {isCompleted ? <FaCheck size={14} /> : <Icon size={16} />}
              </motion.div>

              <span
                className={`mt-2 text-xs font-semibold transition-colors duration-300 lg:text-sm ${
                  isCompleted || isCurrent ? "text-green-600" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
