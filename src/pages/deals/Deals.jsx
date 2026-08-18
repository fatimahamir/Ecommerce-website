// src/pages/deals/Deals.jsx
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProductGridCard from "../../components/product-listing/ProductGridCard";
import Pagination from "../../components/product-listing/Pagination";
import dealsBanner from "../../assets/images/dealbanner.jpg";
import dealsBanner2 from "../../assets/images/dealbanner1.jpg";
import dealsBanner3 from "../../assets/images/deal1.png";
import dealsBanner4 from "../../assets/images/deal2.png";
import dealsBanner5 from "../../assets/images/deal3.png";

const defaultSlides = [
  dealsBanner,
  dealsBanner2,
    dealsBanner5,
  dealsBanner3,
  dealsBanner4,
 
];

const getVisible = () => {
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
};

const Deals = ({ slides = defaultSlides }) => {
  const { items: products } = useSelector((state) => state.products);
  const [page, setPage] = useState(1);
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(getVisible);
  const [isHovered, setIsHovered] = useState(false);
  const perPage = 12;

  const maxIndex = Math.max(0, slides.length - visible);

  useEffect(() => {
    const onResize = () => setVisible(getVisible());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (current > maxIndex) setCurrent(maxIndex);
  }, [maxIndex, current]);

  useEffect(() => {
    if (isHovered || maxIndex === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovered, maxIndex]);

  const deals = [...products]
    .filter((p) => p.discountPercentage > 0)
    .sort((a, b) => b.discountPercentage - a.discountPercentage);

  const totalPages = Math.ceil(deals.length / perPage);
  const paginated = deals.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="max-w-[1340px] mx-auto px-4 mt-4 flex flex-col gap-4">
      <div>
        <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Deals & Offers</h2>
        <p className="text-sm mt-1 text-gray-500">
          {deals.length} products par zabardast discounts — stock khatam hone se pehle order karein!
        </p>
      </div>

      <div
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="overflow-hidden rounded-lg">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * (100 / visible)}%)` }}
          >
            {slides.map((img, i) => (
              <div key={i} className="min-w-full sm:min-w-[50%] lg:min-w-[33.333%] shrink-0 px-1.5">
                <div
                  className="h-[160px] sm:h-[200px] lg:h-[250px] rounded-lg bg-cover bg-center shadow-sm"
                  style={{ backgroundImage: `url(${img})` }}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-r-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer z-20"
          aria-label="Previous slides"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setCurrent((c) => Math.min(maxIndex, c + 1))}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-l-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer z-20"
          aria-label="Next slides"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="flex justify-center space-x-2 -mt-1">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              i === current ? "bg-primary w-6" : "bg-gray-300 hover:bg-gray-400 w-2"
            }`}
            aria-label={`Go to position ${i + 1}`}
          />
        ))}
      </div>

      {paginated.length === 0 ? (
        <p className="bg-white border border-gray-200 rounded-lg p-6 text-center text-sm text-gray-500">
          No deal found.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {paginated.map((p) => (
            <ProductGridCard key={p.id} product={p} />
          ))}
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default Deals;