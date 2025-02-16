import React from "react";

const SectionTitle = ({ subTitle, heading }) => {
  return (
    <div className="w-3/4 mx-auto my-10 mt-20">
      <p className="text-4xl text-center my-2">{subTitle}</p>
      <h3 className="text-xl text-center my-2 p-2 border-y-4">{heading}</h3>
    </div>
  );
};

export default SectionTitle;
