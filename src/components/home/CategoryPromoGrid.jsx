
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const CategoryPromoGrid = ({ title, bgImage, buttonText = "Shop Now", products = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col lg:flex-row border border-gray-200 rounded-lg overflow-hidden bg-white mx-3 xl:mx-0">
      <div
        className="hidden lg:flex lg:w-[27%] shrink-0 flex-col justify-between p-5 bg-cover bg-center min-h-[220px]"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="p-4  mt-4">
          <h3 className="text-3xl mb-6 font-semibold text-gray-900">{title}</h3>
          <Link
            to="/products"
            className="self-start bg-white text-sm font-medium px-4 py-2  rounded shadow cursor-pointer hover:bg-gray-50 transition-colors"
          >
            {buttonText}
          </Link>
        </div>
      </div>

      <div className="w-full lg:w-[73%] flex flex-col">
        <h3 className="lg:hidden text-base font-semibold text-gray-900 px-4 pt-4 pb-3">
          {title}
        </h3>

        <div className="flex overflow-x-auto lg:overflow-visible lg:grid lg:grid-cols-4 divide-x lg:divide-y divide-gray-100 flex-1 no-scrollbar">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="bg-white p-4 flex flex-col items-center text-center hover:bg-gray-50 transition-colors cursor-pointer shrink-0 min-w-[150px] sm:min-w-[180px] lg:min-w-0"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-44 h-27 100 object-contain mb-2"
              />
              <p className="text-sm text-gray-800 line-clamp-1 w-full">{product.name}</p>
              <p className="text-xs text-gray-400">
                From <span className="text-gray-600">USD {product.price}</span>
              </p>
            </div>
          ))}
        </div>

        <div className="lg:hidden px-4 py-3 border-t border-gray-100">
          <Link
            to="/products"
            className="flex items-center gap-1.5 text-sm font-medium text-primary cursor-pointer hover:text-primary-dark transition-colors"
          >
            {buttonText}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryPromoGrid;