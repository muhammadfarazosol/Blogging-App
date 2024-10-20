import React from "react";
import HomeGSAP from "../components/HomeGSAP";
import Modal from "../components/Modal";
import RecentPosts from "../components/RecentPosts";
import FeaturedPosts from "../components/FeaturedPosts";

const Home = () => {
  return (
    <>
      <HomeGSAP />
      <hr />
      <h1 className="flex items-center justify-center text-3xl font-bold text-white my-8">
        Recent Posts
      </h1>
      <div>
        <RecentPosts />
      </div>
      <hr className="mt-6" />
      <h1 className="flex items-center justify-center text-3xl font-bold text-white my-8">
        Featured Posts
      </h1>
      <div>
        <FeaturedPosts />
      </div>
      <hr className="mt-6" />
      <div>
        <Modal />
      </div>
    </>
  );
};

export default Home;
