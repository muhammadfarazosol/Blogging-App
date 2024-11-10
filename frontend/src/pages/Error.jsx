import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="bg-[#c9dcf3] min-h-screen flex items-center">
      <section className="flex items-center w-full p-16 text-black">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="max-w-md text-center">
            <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-400">
              <span className="sr-only">Error</span>404
            </h2>
            <p className="text-2xl font-semibold md:text-3xl">
              Sorry, we couldn't find this page.
            </p>
            <p className="mt-4 mb-8 text-black">
              But don't worry, you can find plenty of other things on our
              homepage.
            </p>
            <Link
              to={"/"}
              className="px-8 py-3 font-semibold rounded bg-[#3e95fb] text-white hover:bg-blue-800"
            >
              Back to homepage
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Error;
