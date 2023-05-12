const classes = {
  aside: ["fixed", "h-screen", "w-52", "bg-gray-100", "p-8", "max-sm:hidden"],
  asideMobile: ["fixed", "h-screen", "w-52", "bg-gray-100", "p-8", "w-screen"],
  brand: ["font-bold", "text-1xl", "leading-6", "text-gray-800"],
  menu: ["flex", "flex-col", "space-y-2", "mt-8"],
  menuLink: ["text-base", "hover:font-bold", "text-gray-600"],
  toggleMenu: [
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
    "focus:ring-gray-800",
    "justify-center",
    "items-center",
    "sm:hidden",
    "cursor-pointer",
    "ml-auto",
    "-mt-4",
    "-mr-4",
  ],
  mobileButtonGroup: ["max-sm:block", "sm:hidden", "absolute", "mt-8", "ml-8"],
};

export default classes;
