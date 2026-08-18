// src/components/product-details/ProductGallery.jsx
import React, { useState } from "react";

const ProductGallery = ({ images = [], discount = 0 }) => {
  const [active, setActive] = useState(0);
  if (!images.length) return null;

  return (
    <div>
      <div className="relative bg-white border border-gray-100 rounded-lg overflow-hidden">
        {discount > 0 && (
          <span className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{Math.round(discount)}%
          </span>
        )}

        <img src={images[active]} alt="Product" className="w-full h-72 sm:h-96 object-contain bg-gray-50" />

        <button
          onClick={() => setActive((active - 1 + images.length) % images.length)}
          className="lg:hidden absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1.5 shadow cursor-pointer"
          aria-label="Previous image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setActive((active + 1) % images.length)}
          className="lg:hidden absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1.5 shadow cursor-pointer"
          aria-label="Next image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-14 h-14 shrink-0 border rounded-lg overflow-hidden bg-white cursor-pointer ${
              i === active ? "border-primary ring-1 ring-primary" : "border-gray-300"
            }`}
          >
            <img src={img} alt="" className="w-full h-full object-contain bg-gray-200" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;