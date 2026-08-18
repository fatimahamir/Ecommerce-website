// src/components/home/RecommendedItems.jsx
import React from "react";
import { Link } from "react-router-dom";

const RecommendedItems = ({
  title = "Recommended items",
  products = [],
  link = "/products",
}) => {
  return (
    <div id="recommended" className="rounded-lg bg-transparent mx-3 xl:mx-0">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>

        <Link
          to={link}
          className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
        >
          Browse more
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-md p-3 flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 sm:h-50 object-contain mb-3"
            />
            <p className="text-sm font-bold text-gray-900">${product.price.toFixed(2)}</p>
            <p className="text-xs text-gray-400 line-clamp-2 mt-1">{product.name}</p>
          </div>
        ))}
      </div>

      <div className="md:hidden mt-4 flex justify-center">
        <Link
          to={link}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
        >
          Browse more
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default RecommendedItems;