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
  buttonGroup: ["mt-5", "sm:mt-4", "sm:flex", "sm:flex-row-reverse"],
  buttonSignIn: [
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
  ],
  buttonSignUp: [
    "mt-3",
    "w-full",
    "inline-flex",
    "justify-center",
    "rounded-md",
    "border",
    "border-emerald-600",
    "shadow-sm",
    "px-4",
    "py-2",
    "bg-white",
    "text-base",
    "font-medium",
    "text-emerald-700",
    "hover:bg-emerald-700",
    "hover:text-white",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
    "focus:ring-emerald-600",
    "sm:mt-0",
    "sm:w-auto",
    "sm:text-sm",
  ],
};

export default classes;
