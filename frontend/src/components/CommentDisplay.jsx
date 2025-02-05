import React, { useState, useEffect, useRef } from "react";
import DoubleQuoteL from "../assests/svgs/DoubleQuoteL.svg";
import LoaderGif from "../components/Loader";

const CommentDisplay = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const marqueeRef = useRef(null);
  const requestRef = useRef(null);
  const speed = 1;

  const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    if (!isPaused) {
      requestRef.current = requestAnimationFrame(scrollMarquee);
    } else {
      cancelAnimationFrame(requestRef.current);
    }

    return () => cancelAnimationFrame(requestRef.current);
  }, [isPaused]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/comments/all`);
      const data = await response.json();
      setComments(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setLoading(false);
    }
  };

  const scrollMarquee = () => {
    if (marqueeRef.current) {
      marqueeRef.current.scrollLeft += speed;

      if (
        marqueeRef.current.scrollLeft >=
        marqueeRef.current.scrollWidth - marqueeRef.current.clientWidth
      ) {
        marqueeRef.current.scrollLeft = 0;
      }
    }
    requestRef.current = requestAnimationFrame(scrollMarquee);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  if (loading) {
    return (
      <div>
        <LoaderGif />
      </div>
    );
  }

  return (
    <section className="py-12 bg-[#c9dcf3] overflow-hidden">
      <div className="container mx-auto flex flex-col items-center pb-6 mb-4 md:p-10 md:px-12">
        <h1 className="text-4xl font-semibold leading-none text-center">
          Applause for the Authors: Reader Testimonials
        </h1>
      </div>
      <div
        className="relative w-full overflow-hidden"
        ref={marqueeRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ whiteSpace: "normal", display: "flex" }}
      >
        {comments.map((comment, index) => (
          <div
            key={`${comment._id}-${index}`}
            className="inline-block min-w-[500px] px-4"
            style={{ width: "fit-content" }}
          >
            <div className="bg-white rounded-lg shadow-lg p-6 h-[180px] flex flex-col relative">
              <div className="text-left flex-grow relative">
                <img
                  src={DoubleQuoteL}
                  alt="Double Quotes"
                  className="absolute top-0 left-0 w-8 h-8"
                />
                <div className="relative px-10">
                  <p className="text-lg italic text-center">
                    {comment.content}
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    className="absolute -right-2 -bottom-2 w-8 h-8"
                  >
                    <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                    <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
                  </svg>
                </div>
              </div>
              <div className="mt-4 font-semibold text-center">
                <span className="w-12 h-1 my-2 rounded-lg bg-[#3e95fb] inline-block"></span>
                <p>{comment?.author?.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommentDisplay;
