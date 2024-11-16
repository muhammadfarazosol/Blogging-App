import React from "react";
import HomeGSAP from "../components/HomeGSAP";
import Modal from "../components/Modal";
import RecentPosts from "../components/RecentPosts";
import FeaturedPosts from "../components/FeaturedPosts";
import BlogParallaxLanding from "../components/ParallexEffect";
import CommentDisplay from "../components/commentDisplay";

const Home = () => {
  return (
    <>
      <BlogParallaxLanding />
      {/* <HomeGSAP /> */}
      <hr />
      <div>
        <RecentPosts />
      </div>
      {/* <hr className="mt-6" />
      <h1 className="flex items-center justify-center text-3xl font-bold text-white my-8">
        Featured Posts
      </h1>
      <div>
        <FeaturedPosts />
      </div> */}
      <div>
        <Modal />
      </div>
      <div>
        <CommentDisplay />
      </div>
    </>
  );
};

export default Home;
