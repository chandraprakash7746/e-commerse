import React, { useState, useRef, useEffect } from "react";
import image1 from "../Assest/image1.webp";
import image2 from "../Assest/image2.webp";
import image3 from "../Assest/image3.webp";
import image4 from "../Assest/image4.webp";
import ChevronDown from "../Icons/ChevronDown";
import ChevronUp from "../Icons/ChevronUp";
import { useNavigate } from "react-router-dom";

const images = [
  { image: image1, url: "beauty" },
  { image: image2, url: "fragrances" },
  { image: image3, url: "furniture" },
  { image: image4, url: "groceries" },
];
const Crowser = () => {
  const naviagtion = useNavigate();
  const [activeIndex, setActiveIndex] = useState(1);

  function handleLeft(e) {
    e.stopPropagation();
    setActiveIndex((activeIndex - 1 + images.length) % images.length);
  }

  function handleRight(e) {
    e.stopPropagation();
    setActiveIndex((activeIndex + 1) % images.length);
  }

  const timerRef = useRef(null);

  function clearTimer() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }

  function addTimer() {
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        return (prev + 1) % images.length;
      });
    }, 3000);
  }

  useEffect(() => {
    clearTimer();
    addTimer();
    return clearTimer;
  }, []);

  function handleMouseEnter() {
    clearTimer();
  }

  function handleMouseLeave() {
    clearTimer();
    addTimer();
  }

  function handleClick() {
    naviagtion(`/category/${images[activeIndex].url}`);
  }

  return (
    <div
      className="relative  h-[45vh] w-full pt-3"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        onClick={handleLeft}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md backdrop-blur-sm flex justify-center items-center cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95"
      >
        <span className=" flex items-center justify-center">
          <ChevronDown />
        </span>
      </button>
      <button
        type="button"
        onClick={handleRight}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md backdrop-blur-sm flex justify-center items-center cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95"
      >
        <span className="flex items-center justify-center">
          <ChevronUp />
        </span>
      </button>
      <div className="h-full w-full">
        <img className="h-full w-full" src={images[activeIndex].image} alt="" />
      </div>
    </div>
  );
};

export default Crowser;
