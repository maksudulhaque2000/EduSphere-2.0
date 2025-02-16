import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-20">
      <progress className="progress w-full bg-green-400 p-5"></progress>
      <h3 className="text-xl font-bold my-5">Loading...</h3>
    </div>
  );
};

export default Loading;
