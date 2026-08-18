// src/components/home/HeroBanner.jsx
import React, { useState, useEffect } from "react";
import image1 from "../../assets/images/banner.png";
import image2 from "../../assets/images/hero1.png";
import image3 from "../../assets/images/hbanner.png";
import image4 from "../../assets/images/h1banner.png";
import { Link } from "react-router-dom";

const defaultSlides = [
  {
    image: image1,
    title: "Latest trending",
    highlight: "Electronic items",
    description: "Explore top-rated gadgets and smart devices at unbeatable prices.",
    buttonText: "Buy Now",
  },
  {
    image: image2,
    title: "New Arrivals",
    highlight: "Just for you",
    description: "Fresh styles and trending picks, chosen specially for you.",
    buttonText: "Shop Now",
  },
  {
    image: image3,
    title: "online",
    highlight: "Grocery Store",
    description: "Farm-fresh groceries and daily essentials delivered to your door.",
    buttonText: "Get Offer",
  },
  {
    image: image4,
    title: "Beauty can be Affordable",
    highlight: "Cosmetics Sale",
    description: "Premium makeup and skincare at prices you'll simply love.",
    buttonText: "Buy Now",
  },
];

const HeroBanner = ({ slides = defaultSlides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length, isHovered]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  if (slides.length === 0) return null;

  return (
    <div
      className="relative w-full aspect-[16/10] sm:aspect-[16/8] lg:aspect-auto lg:h-[460px] rounded-lg overflow-hidden group  bg-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="min-w-full h-full flex-shrink-0 bg-cover bg-center bg-no-repeat relative flex items-start"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="relative w-60 sm:w-80 z-10 p-2 my-16 mx-10 max-[350px]:mx-1 max-[350px]:my-3 max-[520px]:mx-4 max-[520px]:my-7 sm:my-16 sm:mx-16 lg:mx-10 lg:my-16">
              <div className="p-4 rounded-lg max-w-sm">
                <p className="text-sm sm:text-lg xl:text-xl text-gray-800">{slide.title}</p>
                <h2 className="max-[350px]:text-sm max-[640px]:text-2xl sm:text-4xl xl:text-4xl font-bold text-gray-900 mt-1 sm:mb-4 mb-2">
                  {slide.highlight}
                </h2>
                {slide.description && (
                  <p className={`max-w-[220px] hidden sm:flex sm:max-w-xs lg:max-w-sm text-xs sm:text-sm xl:text-base leading-relaxed line-clamp-2 mt-1 mb-4 ${slide.lightText ? "text-white/80" : "text-gray-600"}`}>
                    {slide.description}
                  </p>
                )}
                <Link
                  to="/products"
                  className="inline-block bg-black text-white max-[350px]:py-1 max-[520px]:text-sm text-sm sm:text-base font-medium px-3 py-2 sm:px-4 sm:py-2 rounded shadow cursor-pointer border border-primary hover:bg-white hover:text-primary transition-colors"
                >
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={goToPrevious}
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer z-20"
        aria-label="Previous Slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer z-20"
        aria-label="Next Slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-10" />

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentIndex
                ? "bg-white w-8 shadow-md"
                : "bg-white/50 hover:bg-white/80 w-2.5"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;