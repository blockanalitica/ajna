const CardBackground = ({ children }) => {
  return (
    <div className="px-3 py-4 flex flex-col items-center justify-center bg-[#1c1c1c] bg-opacity-30 border-gray-20 border shadow-md rounded-3xl">
      {children}
    </div>
  );
}

export default CardBackground;