import React, { useEffect, useState } from "react";
import Plx from "react-plx";
import { motion } from "framer-motion";
import BackgroundPic from "../assests/assets/images/background.jpg";
import BgPic from "../assests/assets/images/bg.png";
import { Link } from "react-router-dom";

function BlogParallaxSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const runningText = "Unleash your words and share with others";

  return (
    <section className="relative h-[100vh] overflow-hidden">
      <Plx
        parallaxData={[
          {
            start: 0,
            end: 400,
            properties: [
              {
                startValue: 1,
                endValue: 1.1,
                property: "scale",
              },
            ],
          },
        ]}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      >
        <img
          src={BackgroundPic}
          alt="Blog background"
          className="w-full h-full object-cover"
        />
      </Plx>

      <Plx
        parallaxData={[
          {
            start: 0,
            end: 400,
            easing: "ease-in",
            properties: [
              {
                startValue: 1,
                endValue: 1.2,
                property: "scale",
              },
            ],
          },
        ]}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          zIndex: 2,
        }}
      >
        <img
          src={BgPic}
          alt="Blog foreground"
          className="w-full h-full object-cover"
        />
      </Plx>

      <Plx
        parallaxData={[
          {
            start: 0,
            end: 200,
            properties: [
              {
                startValue: 1,
                endValue: 0,
                property: "opacity",
              },
            ],
          },
        ]}
        style={{
          position: "absolute",
          left: "50%",
          top: "40%",
          transform: "translate(-50%, -50%)",
          zIndex: 3,
          width: "100%",
          maxWidth: "800px",
        }}
      >
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl font-bold text-[#FBFFFF] text-center mb-4">
              Welcome to NeuroNest
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <p className="text-2xl text-[#FBFFFF] font-semibold text-center mb-8">
              {runningText.split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {char}
                </motion.span>
              ))}
            </p>
          </motion.div>

          <Link to={"/blogs"}>
            <motion.button
              className="px-6 py-3 bg-[#3e95fb] text-white rounded-full border-2 border-white text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              Get Started
            </motion.button>
          </Link>
        </div>
      </Plx>
    </section>
  );
}

export default BlogParallaxSection;
