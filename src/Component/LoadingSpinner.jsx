import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center gap-2 py-1 items-center">
      <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
      <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
      <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
    </div>
  );
};

export default LoadingSpinner;
