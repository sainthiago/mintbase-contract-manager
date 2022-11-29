export const BUTTON_CLASS = (condition: boolean) => {
  return `block w-fit py-2 px-4 text-sm rounded-full text-white ${
    condition
      ? "cursor-not-allowed bg-gray-400"
      : "bg-light-green cursor-pointer transform transition duration-500 hover:scale-105 hover:-translate-y-0.5 hover:bg-light-black"
  }`;
};

