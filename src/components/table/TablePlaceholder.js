"use client";

import CardBackground from "@/components/card/CardBackground";

const TablePlaceholder = () => {
  return (
    <CardBackground>
      <div className="animate-pulse">
        <div className="bg-gray-21 rounded-2xl h-11"></div>
        <div className="mx-3">
          <div className="border-b border-gray-20 h-14"></div>
          <div className="border-b border-gray-20 h-14"></div>
          <div className="border-b border-gray-20 h-14"></div>
          <div className="h-14"></div>
        </div>
      </div>
    </CardBackground>
  );
};

export default TablePlaceholder;
