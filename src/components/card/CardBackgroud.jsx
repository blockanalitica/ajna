import { joinClassNames } from "@/utils/helperFunc";

const CardBackground = ({ children, styling="px-3 py-4" }) => {
  return (
    <div className={joinClassNames(
        "flex flex-col items-center justify-center bg-[#1c1c1c] bg-opacity-30 border-gray-20 border shadow-md rounded-3xl",
        styling
        )}
    >
      {children}
    </div>
  );
}

export default CardBackground;