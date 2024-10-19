import React from "react";
import HomeGSAP from "../components/HomeGSAP";
import Modal from "../components/Modal";

const Home = () => {
  return (
    <>
      <HomeGSAP />
      <div>
        <h1>Recent Posts</h1>
      </div>
      <div>
        <h1>Featured Posts</h1>
      </div>
      <div>
        <Modal />
      </div>
    </>
  );
};

export default Home;
