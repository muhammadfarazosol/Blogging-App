import React from "react";
import LoaderGif from "../assests/Loader.gif";

const Loader = () => {
  return (
    <div className="flex justify-center items-center bg-[#c9dcf3]">
      <img src={LoaderGif} alt="Loading..." />
    </div>
  );
};

export default Loader;
