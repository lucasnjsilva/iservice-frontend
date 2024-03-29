const classes = {
  dialog: ["fixed", "z-50", "inset-0", "overflow-y-auto"],
  container: ["flex", "items-center", "justify-center", "min-h-screen"],
  dialogOverlay: ["fixed", "inset-0", "bg-black", "opacity-75"],
  dialogBody: [
    "bg-white",
    "rounded-lg",
    "px-4",
    "pt-5",
    "pb-4",
    "text-left",
    "overflow-hidden",
    "shadow-xl",
    "transform",
    "transition-all",
    "sm:max-w-lg",
    "sm:w-full",
    "sm:p-6",
  ],
  dialogTitle: ["text-lg", "leading-6", "font-medium", "text-gray-900"],
  label: ["mb-2", "inline-block", "text-sm", "text-gray-800", "sm:text-base"],
  input: [
    "w-full",
    "rounded",
    "border",
    "bg-gray-50",
    "px-3",
    "py-2",
    "text-gray-800",
    "outline-none",
    "ring-indigo-300",
    "transition",
    "duration-100",
    "focus:ring",
  ],
  buttonGroup: ["mt-5", "sm:mt-4", "sm:flex", "sm:flex-row-reverse"],
  buttonEvaluate: [
    "w-full",
    "inline-flex",
    "justify-center",
    "rounded-md",
    "border",
    "border-transparent",
    "shadow-sm",
    "px-4",
    "py-2",
    "bg-emerald-600",
    "text-base",
    "font-medium",
    "text-white",
    "hover:bg-emerald-700",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
    "focus:ring-emerald-500",
    "sm:ml-3",
    "sm:w-auto",
    "sm:text-sm",
    "disabled:bg-gray-300",
  ],
  buttonCancel: [
    "mt-3",
    "w-full",
    "inline-flex",
    "justify-center",
    "rounded-md",
    "border",
    "border-gray-300",
    "shadow-sm",
    "px-4",
    "py-2",
    "bg-white",
    "text-base",
    "font-medium",
    "text-gray-700",
    "hover:bg-gray-50",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
    "focus:ring-indigo-500",
    "sm:mt-0",
    "sm:w-auto",
    "sm:text-sm",
  ],
};

export default classes;
